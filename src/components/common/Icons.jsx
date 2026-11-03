import React from "react";

/**
 * Universal SVG Icon wrapper.
 * Pure vector representation, Zero DOM thrashing, zero external icon font dependencies.
 */
export const Icon = React.memo(function Icon({
  d,
  size = 20,
  stroke = "currentColor",
  width = 2.4,
  children,
  className = "",
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={stroke}
      strokeWidth={width}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {d ? <path d={d} /> : children}
    </svg>
  );
});

export const ArrowIcon = React.memo(function ArrowIcon({ size = 18 }) {
  return <Icon size={size} d="M5 12h14M13 6l6 6-6 6" />;
});

export const CheckIcon = React.memo(function CheckIcon({ size = 18, stroke = "#5B2C1E" }) {
  return <Icon size={size} stroke={stroke} width={2.6} d="M5 12l5 5L20 7" />;
});

/**
 * 6 Step SVG Icons for "From Application to Earning" Section
 */
export const StepApplyIcon = React.memo(function StepApplyIcon({ size = 22, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  );
});

export const StepReviewIcon = React.memo(function StepReviewIcon({ size = 22, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
      <path d="M4.93 4.93l2.83-2.83M19.07 4.93l-2.83-2.83" />
    </svg>
  );
});

export const StepAgreementIcon = React.memo(function StepAgreementIcon({ size = 22, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
      <path d="M15 5l3 3" />
    </svg>
  );
});

export const StepPricingIcon = React.memo(function StepPricingIcon({ size = 22, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
      <circle cx="7" cy="7" r="1.5" />
      <path d="M11 15l4-4" />
    </svg>
  );
});

export const StepShareIcon = React.memo(function StepShareIcon({ size = 22, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </svg>
  );
});

export const StepEarnIcon = React.memo(function StepEarnIcon({ size = 22, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
      <path d="M2 20h20" />
      <path d="M16 6l5-1-1 5" />
      <path d="M21 5l-7 7-4-4-6 6" />
    </svg>
  );
});
