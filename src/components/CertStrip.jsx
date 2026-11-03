import React from "react";
import certs from "../assets/Seven Certification Logos Row.png";

export default function CertStrip() {
  return (
    <section className="gz-bg-beige">
      <div className="gz-wrap gz-certs">
        <p>Manufactured to certified standards — 100% licensed and lab-tested.</p>
        <img
          src={certs}
          alt="Certifications: ISO, GMP, FSSAI, FDA, Kosher, HACCP, Halal"
          loading="lazy"
        />
      </div>
    </section>
  );
}
