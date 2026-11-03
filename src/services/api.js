/**
 * Partner application API service.
 * Connects directly to the RAG backend API (gomzi-nutrition-rag-api)
 * and feeds incoming trainer applications into the RAG Admin Panel (gomzi-nutrition-rag-admin).
 */

const DEFAULT_TIMEOUT_MS = 45000; // 45s for file uploads over mobile connections

// Loaded exclusively from environment variable (.env)
const API_BASE_URL = import.meta.env?.VITE_API_URL || import.meta.env?.VITE_API_BASE_URL || "";

/**
 * Uploads a single document (certificate, ID, or photo) to the backend S3 endpoint.
 * Gracefully degrades if file upload service is offline.
 */
async function uploadSingleFile(apiBase, file, remark) {
  if (!file || !(file instanceof File) || file.size === 0) return null;
  const uploadData = new FormData();
  uploadData.append("files", file);

  try {
    const res = await fetch(`${apiBase}/public/v1/file-upload`, {
      method: "POST",
      body: uploadData,
    });
    if (res.ok) {
      const json = await res.json();
      const key = json?.data?.fileURLs?.[0];
      if (key) {
        const url = key.startsWith("http") ? key : `https://files.fggroup.in/${key}`;
        return { url, remark, key };
      }
    }
  } catch (err) {
    console.warn(`[File Upload Warning] Could not upload ${remark}:`, err);
  }
  return null;
}

/**
 * Submits partner application form data to the backend endpoint.
 * Compatible with RAG Admin Pro Partner inquiry schema.
 *
 * @param {FormData} formData - Multipart form data including text fields and binary files.
 * @param {Object} [options] - Optional configurations.
 * @param {string} [options.apiBaseUrl] - Custom API base URL.
 * @param {number} [options.timeoutMs] - Timeout in milliseconds.
 * @returns {Promise<Object>} Resolves with JSON response on success.
 */
export async function submitApplication(formData, options = {}) {
  const apiBase = options.apiBaseUrl || API_BASE_URL;
  const timeoutMs = options.timeoutMs || DEFAULT_TIMEOUT_MS;

  // Extract fields from formData
  const fullName = formData.get("fullName")?.toString().trim() || "";
  const email = formData.get("email")?.toString().trim() || "";
  const phone = formData.get("phone")?.toString().trim() || "";
  const age = formData.get("age")?.toString().trim() || "";
  const address = formData.get("address")?.toString().trim() || "";
  const city = formData.get("city")?.toString().trim() || "";
  const state = formData.get("state")?.toString().trim() || "";
  const pincode = formData.get("pincode")?.toString().trim() || "";

  const certificationName = formData.get("certificationName")?.toString().trim() || "";
  const certifyingInstitute = formData.get("certifyingInstitute")?.toString().trim() || "";
  const certificationYear = formData.get("certificationYear")?.toString().trim() || "";
  const experienceYears = formData.get("experienceYears")?.toString().trim() || "";
  const idType = formData.get("idType")?.toString().trim() || "";

  const activeClients = formData.get("activeClients")?.toString().trim() || "";
  const feePerClient = formData.get("feePerClient")?.toString().trim() || "";
  const instagram = formData.get("instagram")?.toString().trim() || "";
  const facebookOrYoutube = formData.get("facebookOrYoutube")?.toString().trim() || "";
  const trainingMode = formData.get("trainingMode")?.toString().trim() || "Certified Personal Trainer";

  // Handle document uploads in parallel
  const certificateFile = formData.get("certificate");
  const photoFile = formData.get("photo");
  const idProofFile = formData.get("idProof");

  const [certUpload, photoUpload, idUpload] = await Promise.all([
    uploadSingleFile(apiBase, certificateFile, "Certification Document"),
    uploadSingleFile(apiBase, photoFile, "Trainer Photo"),
    uploadSingleFile(apiBase, idProofFile, "Govt ID Proof"),
  ]);

  const files = [];
  if (certUpload) files.push({ url: certUpload.url, remark: certUpload.remark });
  if (photoUpload) files.push({ url: photoUpload.url, remark: photoUpload.remark });
  if (idUpload) files.push({ url: idUpload.url, remark: idUpload.remark });

  // Format sales potential badge string for Admin Panel Table
  const salesPotential = feePerClient && activeClients
    ? `${activeClients} Clients @ ₹${feePerClient}/mo`
    : activeClients ? `${activeClients} Active Clients` : "High Potential Trainer";

  // Construct standard RAG Pro Partner Inquiry payload
  const payload = {
    name: fullName,
    email: email,
    mobile: phone,
    message: `RAG Pro Partner Application - ${fullName} (${trainingMode}, ${experienceYears || 0} yrs exp, ${activeClients || 0} clients)`,
    subject: "RAG Pro Partner Application",
    source: "ragnutrition",
    details: {
      inquiryType: "partner",
      full_name: fullName,
      age: age,
      email: email,
      mobile: phone,
      whatsapp: phone,
      address: address,
      city: city,
      state: state,
      pincode: pincode,
      employment_type: trainingMode,
      experience_years: String(experienceYears || 0),
      active_clients: String(activeClients || ""),
      higher_education: certificationName,
      certifying_institute: certifyingInstitute,
      certification_year: String(certificationYear || ""),
      fee_per_client: String(feePerClient || ""),
      id_type: idType,
      recommend_supplements: true,
      sales_potential: salesPotential,
      instagram: instagram,
      social_link: facebookOrYoutube,
      certification_url: certUpload?.url || "",
      photo_url: photoUpload?.url || "",
      id_proof_url: idUpload?.url || "",
      consent: formData.get("consent") === "yes",
    },
    files: files.length > 0 ? files : undefined,
  };

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(`${apiBase}/public/v1/contact-inquiry`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      let errorPayload = null;
      try {
        errorPayload = await res.json();
      } catch {
        errorPayload = null;
      }
      const message = errorPayload?.message || `Application submission failed (HTTP ${res.status})`;
      const error = new Error(message);
      error.status = res.status;
      error.payload = errorPayload;
      throw error;
    }

    return await res.json().catch(() => ({ success: true }));
  } catch (err) {
    clearTimeout(timeoutId);

    if (err.name === "AbortError") {
      throw new Error(`Request timed out after ${timeoutMs / 1000} seconds. Please check your network connection and retry.`);
    }

    // Telemetry / logging hook
    if (typeof window !== "undefined" && window.reportError) {
      window.reportError(err);
    }

    throw err;
  }
}
