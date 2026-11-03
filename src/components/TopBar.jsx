import React from "react";

export default function TopBar() {
  return (
    <aside className="gz-topbar" aria-label="Announcement and special offers">
      <div className="gz-wrap gz-topbar-inner">
        {/* Item 1: Authentic Lab Direct */}
        <div className="gz-topbar-item gz-topbar-hide-mobile">
          <svg
            className="gz-topbar-icon"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            <polyline points="9 12 11 14 15 10" />
          </svg>
          <span>100% Authentic Direct From Lab</span>
        </div>

        {/* Item 2: Free Shipping */}
        <div className="gz-topbar-item gz-topbar-hide-tablet">
          <svg
            className="gz-topbar-icon"
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <rect x="1" y="3" width="15" height="13" />
            <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
            <circle cx="5.5" cy="18.5" r="2.5" />
            <circle cx="18.5" cy="18.5" r="2.5" />
          </svg>
          <span>Free Express Shipping on Orders &gt; ₹999</span>
        </div>

        {/* Item 3: Core Promo Offer */}
        <div className="gz-topbar-item gz-topbar-promo">
          <svg
            className="gz-topbar-icon gz-topbar-icon-gold"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
            <line x1="7" y1="7" x2="7.01" y2="7" />
          </svg>
          <span>
            Use Code <strong className="gz-topbar-code">GOMZI20</strong> for Extra 20% OFF
          </span>
          <span className="gz-topbar-divider" aria-hidden="true">|</span>
          <a href="#quality" className="gz-topbar-link">
            Verify Batch Report
          </a>
        </div>
      </div>
    </aside>
  );
}

