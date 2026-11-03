import React from "react";
import logo from "../assets/logo.jpg";
import { CONTACT } from "../constants/content";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="gz-footer">
      <div className="gz-wrap gz-footer-cols">
        <div>
          <img className="gz-footer-logo" src={logo} alt="GOMZI Supplements – The Legacy of RAG" />
          <p style={{ maxWidth: 300 }}>
            Nutrition. Performance. Legacy. Premium sports nutrition and supplement solutions.
          </p>
        </div>
        <div>
          <h4>Contact</h4>
          <div className="gz-footer-links">
            <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>
            <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
            <a href={CONTACT.website} target="_blank" rel="noreferrer">
              {CONTACT.websiteLabel}
            </a>
          </div>
        </div>
        <div>
          <h4>Address</h4>
          {CONTACT.address}
        </div>
      </div>
      <div className="gz-copy">
        © {currentYear} GOMZI Supplements · The Legacy of RAG. All rights reserved.
      </div>
    </footer>
  );
}

