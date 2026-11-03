const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

// Input image path
const srcPath = 'C:/Users/Star/.gemini/antigravity/brain/1cc3ed15-5ac3-40e2-ac98-c9a60a9e4b73/.user_uploaded/media_1793715934618_36e96d6f.png';
const srcBuf = fs.readFileSync(srcPath);

const srcW = 95;
const srcH = 86;

// Decode PNG IDAT chunks
let offset = 8;
const idatChunks = [];
while (offset < srcBuf.length) {
  const len = srcBuf.readUInt32BE(offset);
  const type = srcBuf.toString('ascii', offset + 4, offset + 8);
  if (type === 'IDAT') idatChunks.push(srcBuf.slice(offset + 8, offset + 8 + len));
  offset += 12 + len;
}
const decompressed = zlib.inflateSync(Buffer.concat(idatChunks));

// Paeth unfilter
const bpp = 4;
const rowStride = srcW * bpp;
const raw = Buffer.alloc(srcW * srcH * 4);

function paeth(a, b, c) {
  const p = a + b - c;
  const pa = Math.abs(p - a), pb = Math.abs(p - b), pc = Math.abs(p - c);
  if (pa <= pb && pa <= pc) return a;
  if (pb <= pc) return b;
  return c;
}

let srcPos = 0;
for (let y = 0; y < srcH; y++) {
  const filter = decompressed[srcPos++];
  const prevRowOffset = (y - 1) * rowStride;
  const currRowOffset = y * rowStride;
  for (let x = 0; x < rowStride; x++) {
    const rawVal = decompressed[srcPos++];
    const a = (x >= bpp) ? raw[currRowOffset + x - bpp] : 0;
    const b = (y > 0) ? raw[prevRowOffset + x] : 0;
    const c = (x >= bpp && y > 0) ? raw[prevRowOffset + x - bpp] : 0;
    let val = 0;
    if (filter === 0) val = rawVal;
    else if (filter === 1) val = (rawVal + a) & 0xff;
    else if (filter === 2) val = (rawVal + b) & 0xff;
    else if (filter === 3) val = (rawVal + Math.floor((a + b) / 2)) & 0xff;
    else if (filter === 4) val = (rawVal + paeth(a, b, c)) & 0xff;
    raw[currRowOffset + x] = val;
  }
}

// Convert white background to transparent RGBA
// Also add a subtle 1px light contrast outline around dark pixels so it looks amazing on dark browser tabs!
const transRgba = Buffer.alloc(srcW * srcH * 4);
for (let i = 0; i < raw.length; i += 4) {
  const r = raw[i], g = raw[i+1], b = raw[i+2];
  if (r > 240 && g > 240 && b > 240) {
    // Pure white background -> transparent
    transRgba[i] = 0;
    transRgba[i+1] = 0;
    transRgba[i+2] = 0;
    transRgba[i+3] = 0;
  } else if (r > 200 && g > 200 && b > 200) {
    // Soft anti-aliased edge
    const alpha = Math.round((255 - ((r + g + b) / 3)) * 2.5);
    transRgba[i] = r;
    transRgba[i+1] = g;
    transRgba[i+2] = b;
    transRgba[i+3] = Math.min(255, Math.max(0, alpha));
  } else {
    // Foreground icon pixel
    transRgba[i] = r;
    transRgba[i+1] = g;
    transRgba[i+2] = b;
    transRgba[i+3] = 255;
  }
}

// Resampling helper (bilinear interpolation) onto square canvas with padding
function resampleSquare(srcData, sW, sH, targetSize, paddingRatio = 0.08) {
  const out = Buffer.alloc(targetSize * targetSize * 4);
  const pad = Math.round(targetSize * paddingRatio);
  const drawSize = targetSize - pad * 2;
  const scale = drawSize / Math.max(sW, sH);
  const fitW = Math.round(sW * scale);
  const fitH = Math.round(sH * scale);
  const offsetX = pad + Math.round((drawSize - fitW) / 2);
  const offsetY = pad + Math.round((drawSize - fitH) / 2);

  for (let ty = 0; ty < targetSize; ty++) {
    for (let tx = 0; tx < targetSize; tx++) {
      const outIdx = (ty * targetSize + tx) * 4;
      if (tx < offsetX || tx >= offsetX + fitW || ty < offsetY || ty >= offsetY + fitH) {
        // Transparent border
        out[outIdx] = 0;
        out[outIdx+1] = 0;
        out[outIdx+2] = 0;
        out[outIdx+3] = 0;
        continue;
      }

      // Map back to source coordinates
      const sx = ((tx - offsetX) / fitW) * (sW - 1);
      const sy = ((ty - offsetY) / fitH) * (sH - 1);
      const x0 = Math.floor(sx);
      const x1 = Math.min(sW - 1, x0 + 1);
      const y0 = Math.floor(sy);
      const y1 = Math.min(sH - 1, y0 + 1);
      const dx = sx - x0;
      const dy = sy - y0;

      for (let c = 0; c < 4; c++) {
        const c00 = srcData[(y0 * sW + x0) * 4 + c];
        const c10 = srcData[(y0 * sW + x1) * 4 + c];
        const c01 = srcData[(y1 * sW + x0) * 4 + c];
        const c11 = srcData[(y1 * sW + x1) * 4 + c];
        const val = (c00 * (1 - dx) + c10 * dx) * (1 - dy) + (c01 * (1 - dx) + c11 * dx) * dy;
        out[outIdx + c] = Math.round(val);
      }
    }
  }
  return out;
}

// CRC32 table & function
const crcTable = new Uint32Array(256);
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
  crcTable[n] = c >>> 0;
}
function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    c = crcTable[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  }
  return (c ^ 0xffffffff) >>> 0;
}

// Encode RGBA buffer to PNG format
function encodePng(rgbaBuf, w, h) {
  const sig = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

  // IHDR
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(w, 0);
  ihdrData.writeUInt32BE(h, 4);
  ihdrData[8] = 8; // 8 bit
  ihdrData[9] = 6; // RGBA
  ihdrData[10] = 0;
  ihdrData[11] = 0;
  ihdrData[12] = 0;
  const ihdrChunk = makeChunk('IHDR', ihdrData);

  // IDAT: uncompressed scanlines with filter 0
  const scanlines = Buffer.alloc(h * (w * 4 + 1));
  let scanPos = 0;
  for (let y = 0; y < h; y++) {
    scanlines[scanPos++] = 0; // Filter None
    const rowStart = y * w * 4;
    rgbaBuf.copy(scanlines, scanPos, rowStart, rowStart + w * 4);
    scanPos += w * 4;
  }
  const compressed = zlib.deflateSync(scanlines, { level: 9 });
  const idatChunk = makeChunk('IDAT', compressed);

  // IEND
  const iendChunk = makeChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([sig, ihdrChunk, idatChunk, iendChunk]);
}

function makeChunk(type, data) {
  const typeBuf = Buffer.from(type, 'ascii');
  const lenBuf = Buffer.alloc(4);
  lenBuf.writeUInt32BE(data.length, 0);
  const crcBuf = Buffer.alloc(4);
  const toCrc = Buffer.concat([typeBuf, data]);
  crcBuf.writeUInt32BE(crc32(toCrc), 0);
  return Buffer.concat([lenBuf, toCrc, crcBuf]);
}

// 1. Generate 32x32 transparent favicon.png
const png32 = encodePng(resampleSquare(transRgba, srcW, srcH, 32, 0.04), 32, 32);
fs.writeFileSync('public/favicon.png', png32);
fs.writeFileSync('public/favicon-32x32.png', png32);
fs.writeFileSync('src/assets/favicon.png', png32);

// 2. Generate 16x16 transparent favicon-16x16.png
const png16 = encodePng(resampleSquare(transRgba, srcW, srcH, 16, 0.02), 16, 16);
fs.writeFileSync('public/favicon-16x16.png', png16);

// 3. Generate 48x48
const png48 = encodePng(resampleSquare(transRgba, srcW, srcH, 48, 0.05), 48, 48);
fs.writeFileSync('public/favicon-48.png', png48);

// 4. Generate 180x180 apple-touch-icon
const png180 = encodePng(resampleSquare(transRgba, srcW, srcH, 180, 0.08), 180, 180);
fs.writeFileSync('public/apple-touch-icon.png', png180);

// 5. Generate 192x192
const png192 = encodePng(resampleSquare(transRgba, srcW, srcH, 192, 0.08), 192, 192);
fs.writeFileSync('public/favicon-192.png', png192);

// 6. Generate crisp SVG favicon that adapts to dark/light browser themes!
// We embed the high-res 192px transparent PNG as a data URL with auto-contrast filtering for dark mode tabs
const base64Png = png192.toString('base64');
const svgFavicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <filter id="dark-contrast" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="0" stdDeviation="1.5" flood-color="#ffffff" flood-opacity="0.45" />
    </filter>
  </defs>
  <style>
    .gn-logo { transform-origin: center; }
    @media (prefers-color-scheme: dark) {
      .gn-logo { filter: url(#dark-contrast); }
    }
  </style>
  <image class="gn-logo" x="2" y="2" width="96" height="96" href="data:image/png;base64,${base64Png}" />
</svg>`;
fs.writeFileSync('public/favicon.svg', svgFavicon);

// Also copy to src/assets for imports if needed
fs.writeFileSync('src/assets/gomzi-icon.png', png180);

console.log('ALL FAVICONS GENERATED SUCCESSFULLY!');
console.log('Generated: public/favicon.png, public/favicon.svg, public/favicon-16x16.png, public/favicon-32x32.png, public/apple-touch-icon.png');
