import React, { useState } from "react";
import { BENEFITS } from "../constants/content";
import { CheckIcon } from "./common/Icons";

export default function Benefits({ liveMetrics }) {
  const [copied, setCopied] = useState(false);

  // Realistic medium-scale partner performance data
  // When real users log in or live analytics API is plugged in, liveMetrics seamlessly takes over
  const data = liveMetrics || {
    trainerName: "Coach Rahul Sharma",
    studio: "Gold's Gym / Elite Training",
    activeClients: 28,
    clientsTrend: "+6 this month",
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
        product: "100% Pure Whey Isolate 1kg",
        profit: "+₹850",
        time: "12m ago",
      },
      {
        id: "GZ-9408",
        client: "Pooja Mehta",
        product: "Gomzi Intra-Shred Duo (BCAA + Ignite)",
        profit: "+₹1,120",
        time: "1h ago",
      },
      {
        id: "GZ-9397",
        client: "Kunal Shah",
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

  return (
    <section id="benefits" className="gz-benefits-section">
      <div className="gz-wrap gz-section gz-split">
        {/* Left Side: Value Propositions */}
        <div>
          <div className="gz-eyebrow">Why partner with GOMZI</div>
          <h2 className="gz-h2">Everything a brand owner gets. Built for trainers.</h2>
          <p className="gz-lead" style={{ marginBottom: 24 }}>
            Stop selling supplements for a meager 5% commission. You train the clients, you build the trust — you deserve true manufacturing rates and complete client tracking.
          </p>

          <div className="gz-benefits-grid">
            {BENEFITS.map((b) => (
              <div className="gz-benefit-card" key={b.title}>
                <div className="gz-benefit-check">
                  <CheckIcon size={16} stroke="#e27237" />
                </div>
                <div>
                  <h3>{b.title}</h3>
                  <p>{b.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: High-Tech Realistic Partner Portal Preview */}
        <div>
          <div className="gz-portal-widget" aria-label="Live Trainer Partner Portal Preview">
            {/* Top Bar with Live Indicator & Coach Info */}
            <div className="gz-portal-top-bar">
              <div className="gz-portal-badge">
                <span className="gz-pulse-dot" />
                <span>LIVE PARTNER PORTAL</span>
              </div>
              <div className="gz-portal-trainer-chip">
                <span className="gz-trainer-avatar">🏋️</span>
                <span>{data.trainerName}</span>
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

              <div className="gz-portal-stat-tile">
                <div className="gz-stat-header">
                  <span className="gz-stat-label">This Month's Profit</span>
                  <span className="gz-stat-trend positive">{data.profitTag}</span>
                </div>
                <div className="gz-stat-val">{data.thisMonthProfit}</div>
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
                <span style={{ color: "#4ade80" }}>Live</span>
              </div>
              <div className="gz-activity-list">
                {data.recentOrders.map((ord) => (
                  <div className="gz-activity-item" key={ord.id}>
                    <div>
                      <strong style={{ color: "#fff" }}>{ord.client}</strong>
                      <span style={{ opacity: 0.65, marginLeft: 6 }}>({ord.product})</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span className="gz-profit-tag">{ord.profit}</span>
                      <small style={{ color: "#b8a69e" }}>{ord.time}</small>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Exclusive Personal Coupon & Share Link */}
            <div className="gz-portal-coupon-box">
              <div className="gz-coupon-info">
                <span className="gz-coupon-label">Your Client Coupon &amp; Link</span>
                <span className="gz-coupon-code">{data.couponCode}</span>
                <small style={{ color: "var(--muted)", fontSize: 11.5 }}>
                  https://{data.trackingUrl}
                </small>
              </div>
              <button
                type="button"
                className="gz-copy-btn"
                onClick={handleCopyLink}
                title="Copy client discount and tracking link"
              >
                {copied ? "Copied! ✓" : "Copy Link"}
              </button>
            </div>

            {/* Reassurance Footer */}
            <div className="gz-portal-guarantee">
              <span style={{ fontSize: 14 }}>🛡️</span>
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
