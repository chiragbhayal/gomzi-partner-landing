import React from "react";
import certs from "../assets/Seven Certification Logos Row.png";

export default function CertStrip() {
  return (
    <section className="gz-certs-strip">
      <div className="gz-wrap gz-certs">
        <div className="gz-certs-label">
          <span className="gz-certs-badge">VERIFIED FACILITY</span>
          <p>Direct In-House Production • 100% Licensed &amp; Lab-Tested</p>
        </div>
        <img
          src={certs}
          alt="Certifications: ISO, GMP, FSSAI, FDA, Kosher, HACCP, Halal"
          loading="lazy"
        />
      </div>
    </section>
  );
}
