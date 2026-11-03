import React from "react";
import { CONTACT } from "../constants/content";

export default function WhatsAppFloat() {
  const cleanPhone = (CONTACT.phone || "+919875270200").replace(/[^0-9]/g, "");
  const message = encodeURIComponent(
    "Hi GOMZI Team, I am a certified fitness trainer and want to know more about the RAG Pro Partner Program."
  );

  return (
    <a
      className="gz-wa-float"
      href={`https://wa.me/${cleanPhone}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with GOMZI Partner Desk on WhatsApp"
      title="Chat on WhatsApp"
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#0B1210"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M3.5 20.5l1.3-4.2A8.5 8.5 0 1 1 8 19.5z" />
        <path d="M9 8.5c0 3 2.5 6 6 6.5l1-1.5-2-1-1 1c-1-.5-2-1.5-2.5-2.5l1-1-1-2z" />
      </svg>
      <span className="gz-wa-text">WhatsApp Partner Desk</span>
    </a>
  );
}

