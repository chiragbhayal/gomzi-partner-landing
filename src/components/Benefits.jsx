import React, { useState } from "react";
import { BENEFITS } from "../constants/content";

/**
 * 100% Pure Vector SVGs for the 6 Core Partner Privileges.
 * Zero emojis, zero external font icons, pixel-perfect render across all devices.
 */
function BenefitVectorIcon({ index, size = 22 }) {
  const icons = [
    // 0: Brand-owner margins (Upward trending margin chart)
    <svg key="0" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>,
    // 1: Zero investment (Security vault / capital shield)
    <svg key="1" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      <circle cx="12" cy="16" r="1.5" />
    </svg>,
    // 2: Your own link & coupon (Voucher / discount tag)
    <svg key="2" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
      <circle cx="7" cy="7" r="1.5" />
      <path d="M11 15l4-4" />
    </svg>,
    // 3: Partner portal (Live analytics monitor)
    <svg key="3" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
      <polyline points="7 10 10 13 13 9 17 12" />
    </svg>,
    // 4: Licensed & lab-tested (Certified lab flask)
    <svg key="4" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M10 2v7.31L4.54 18.23A2 2 0 0 0 6.27 21h11.46a2 2 0 0 0 1.73-2.77L14 9.31V2" />
      <line x1="8.5" y1="2" x2="15.5" y2="2" />
      <line x1="7" y1="14" x2="17" y2="14" />
    </svg>,
    // 5: Pan-India delivery (Express logistics courier truck)
    <svg key="5" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="1" y="3" width="15" height="13" rx="1" />
      <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
      <circle cx="5.5" cy="18.5" r="2.5" />
      <circle cx="18.5" cy="18.5" r="2.5" />
    </svg>,
  ];

  return icons[index % icons.length];
}

const BENEFIT_TAGS = [
  "40–55% Margins",
  "Zero Locked Capital",
  "Custom Code",
  "Real-Time Portal",
  "FSSAI & GMP Lab",
  "Doorstep Delivery",
];

export default function Benefits({ liveMetrics }) {
  const [copied, setCopied] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  // Realistic medium-scale partner performance data
  const data = liveMetrics || {
    trainerName: "Coach Rahul Sharma",
    studio: "Gold's Gym / Elite Training",
    activeClients: 28,
    clientsTrend: "+6 this mo",
    thisMonthProfit: "₹38,450",
    profitTag: "48% Avg Margin",
    ordersDispatched: 42,
    ordersSub: "Pan-India Dispatched",
    pendingPayout: "₹14,200",
    payoutSub: "Auto-transfer Tuesday",
    couponCode: "GOMZI-COACH-RAHUL",
    trackingUrl: "ragnutrition.in/p/coach-rahul",
    recentOrders: [
      {
        id: "GZ-9412",
        client: "Amit Patel",
        initials: "AP",
        product: "100% Pure Whey Isolate 1kg",
        profit: "+₹850",
        time: "12m ago",
      },
      {
        id: "GZ-9408",
        client: "Pooja Mehta",
        initials: "PM",
        product: "Gomzi Intra-Shred Duo (BCAA + Ignite)",
        profit: "+₹1,120",
        time: "1h ago",
      },
      {
        id: "GZ-9397",
        client: "Kunal Shah",
        initials: "KS",
        product: "Micronized Creatine Monohydrate 250g",
        profit: "+₹420",
        time: "4h ago",
      },
    ],
  };

  const handleCopyLink = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`https://${data.trackingUrl}?code=${data.couponCode}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    }
  };

  const handleCopyCode = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(data.couponCode);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  return (
    <section id="benefits" className="gz-benefits-section">
      <div className="gz-wrap gz-section gz-split">
        {/* Left Side: Value Propositions */}
        <div className="gz-benefits-left">
          <div className="gz-benefits-eyebrow-pill">
            <svg className="gz-pill-star" width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
            </svg>
            <span>WHY PARTNER WITH GOMZI</span>
          </div>
          <h2 className="gz-h2 gz-benefits-heading">
            Everything a brand owner gets.{" "}
            <span className="gz-title-accent">Built for trainers.</span>
          </h2>
          <p className="gz-lead" style={{ marginBottom: 24 }}>
            Stop selling supplements for a meager 5% commission. You train the clients, you build the trust — you deserve true manufacturing rates, 40–55% margins, and complete client tracking.
          </p>

          <div className="gz-benefits-grid">
            {BENEFITS.map((b, idx) => (
              <div className="gz-benefit-card" key={b.title}>
                <div className="gz-benefit-check">
                  <BenefitVectorIcon index={idx} size={20} />
                </div>
                <div className="gz-benefit-info">
                  <div className="gz-benefit-head-row">
                    <h3>{b.title}</h3>
                    {BENEFIT_TAGS[idx] && (
                      <span className="gz-benefit-micro-tag">{BENEFIT_TAGS[idx]}</span>
                    )}
                  </div>
                  <p>{b.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: High-Tech Obsidian Luxury Partner Portal Preview */}
        <div className="gz-benefits-right">
          <div className="gz-portal-widget" aria-label="Live Trainer Partner Portal Preview">
            {/* Top Bar with Live Indicator & Coach Info */}
            <div className="gz-portal-top-bar">
              <div className="gz-portal-top-left">
                <div className="gz-portal-dots" aria-hidden="true">
                  <span className="gz-pdot gz-pdot-1" />
                  <span className="gz-pdot gz-pdot-2" />
                  <span className="gz-pdot gz-pdot-3" />
                </div>
                <div className="gz-portal-badge">
                  <span className="gz-pulse-dot" />
                  <span>LIVE PARTNER PORTAL</span>
                </div>
              </div>

              <div className="gz-portal-trainer-chip">
                <span className="gz-trainer-avatar">RS</span>
                <span className="gz-trainer-name">{data.trainerName}</span>
                <span className="gz-trainer-verified" title="Verified Fitness Coach">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
              </div>
            </div>

            {/* 4 Interactive KPI Metric Tiles */}
            <div className="gz-portal-grid">
              <div className="gz-portal-stat-tile">
                <div className="gz-stat-header">
                  <span className="gz-stat-label">Active Clients</span>
                  <span className="gz-stat-trend">{data.clientsTrend}</span>
                </div>
                <div className="gz-stat-val">{data.activeClients}</div>
                <p className="gz-stat-sub">Clients ordering online</p>
              </div>

              <div className="gz-portal-stat-tile gz-stat-highlight">
                <div className="gz-stat-header">
                  <span className="gz-stat-label">This Month's Profit</span>
                  <span className="gz-stat-trend positive">{data.profitTag}</span>
                </div>
                <div className="gz-stat-val gz-stat-glow">{data.thisMonthProfit}</div>
                <p className="gz-stat-sub">Manufacturing margin share</p>
              </div>

              <div className="gz-portal-stat-tile">
                <div className="gz-stat-header">
                  <span className="gz-stat-label">Tubs Dispatched</span>
                  <span className="gz-stat-trend">Pan-India</span>
                </div>
                <div className="gz-stat-val">{data.ordersDispatched}</div>
                <p className="gz-stat-sub">Zero stock handled by you</p>
              </div>

              <div className="gz-portal-stat-tile">
                <div className="gz-stat-header">
                  <span className="gz-stat-label">Pending Payout</span>
                  <span className="gz-stat-trend">Auto NEFT</span>
                </div>
                <div className="gz-stat-val">{data.pendingPayout}</div>
                <p className="gz-stat-sub">{data.payoutSub}</p>
              </div>
            </div>

            {/* Live Client Orders Ledger */}
            <div className="gz-portal-activity">
              <div className="gz-activity-title">
                <span>Recent Client Orders • Direct Lab Dispatch</span>
                <span className="gz-activity-live-pill">● Live</span>
              </div>
              <div className="gz-activity-list">
                {data.recentOrders.map((ord) => (
                  <div className="gz-activity-item" key={ord.id}>
                    <div className="gz-activity-client-info">
                      <span className="gz-client-avatar">{ord.initials || "PT"}</span>
                      <div>
                        <strong style={{ color: "#fff" }}>{ord.client}</strong>
                        <span className="gz-client-product">({ord.product})</span>
                      </div>
                    </div>
                    <div className="gz-activity-item-meta">
                      <span className="gz-profit-tag">{ord.profit}</span>
                      <small style={{ color: "#b8a69e" }}>{ord.time}</small>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Exclusive Personal Coupon & Share Link (Frosted Luxury Voucher) */}
            <div className="gz-portal-coupon-box">
              <div className="gz-coupon-info">
                <span className="gz-coupon-label">Your Client Coupon &amp; Link</span>
                <div className="gz-coupon-row">
                  <span
                    className="gz-coupon-code"
                    onClick={handleCopyCode}
                    title="Click to copy coupon code"
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => { if (e.key === 'Enter') handleCopyCode(); }}
                  >
                    {data.couponCode}
                  </span>
                  {copiedCode && <span className="gz-code-copied-chip">Copied!</span>}
                </div>
                <small className="gz-coupon-url">
                  https://{data.trackingUrl}
                </small>
              </div>
              <button
                type="button"
                className={`gz-copy-btn ${copied ? "copied" : ""}`}
                onClick={handleCopyLink}
                title="Copy client discount and tracking link"
              >
                {copied ? (
                  <>
                    <span>Copied!</span>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </>
                ) : (
                  <>
                    <span>Copy Link</span>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                    </svg>
                  </>
                )}
              </button>
            </div>

            {/* Reassurance Footer with Pure SVG Shield */}
            <div className="gz-portal-guarantee">
              <span className="gz-guarantee-shield" aria-hidden="true">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#e27237" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="M9 12l2 2 4-4" />
                </svg>
              </span>
              <span>
                <strong>Direct Bank Payouts:</strong> Automated transfers every Tuesday &amp; Friday directly to your registered bank / UPI ID.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
