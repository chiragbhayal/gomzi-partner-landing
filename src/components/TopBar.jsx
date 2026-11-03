import React from "react";

export default function TopBar() {
  return (
    <aside className="gz-topbar" aria-label="Partner program offers and guarantees">
      <div className="gz-topbar-inner">
        {/* Item 1: Brand-Owner Margins */}
        <div className="gz-topbar-item gz-topbar-hide-mobile">
          <svg
            className="gz-topbar-icon"
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
            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
          </svg>
          <span>Brand-Owner Margins at Manufacturing Rates</span>
        </div>

        {/* Item 2: Core Partner Offer & Fast Unlock (Center) */}
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
          <span className="gz-topbar-promo-text">
            Partner Offer: <strong className="gz-topbar-code">Personal Client Coupon</strong> + Tracking
          </span>
          <span className="gz-topbar-divider" aria-hidden="true">|</span>
          <a href="#apply" className="gz-topbar-link">
            Unlock Partner Pricing →
          </a>
        </div>

        {/* Item 3: Zero Inventory & Delivery (Right) */}
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
          <span>Zero Stock Investment · Pan-India Dispatch</span>
        </div>
      </div>
    </aside>
  );
}
