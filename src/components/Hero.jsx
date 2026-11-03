import React from "react";
import hero from "../assets/hero.jpg";
import { Icon, ArrowIcon } from "./common/Icons";

export default function Hero() {
  return (
    <section id="top" className="gz-hero-section">
      <div className="gz-wrap gz-hero">
        <div className="gz-hero-copy">
          <div className="gz-pill">RAG PRO PARTNER PROGRAM · FOR CERTIFIED TRAINERS</div>
          <h1 className="gz-h1">
            <span className="gz-text-black">Earn brand-owner margins.</span> Without buying a single box.
          </h1>
          <p className="gz-hero-sub">
            Supplement brand owners invest lakhs in bulk stock to unlock their margins. As a GOMZI
            partner, you get that same margin at manufacturing rates — zero investment, zero
            inventory. Your clients order online with your coupon, and we deliver across India.
          </p>
          <div className="gz-row">
            <a href="#apply" className="gz-btn gz-btn-primary">
              Apply as a partner <ArrowIcon />
            </a>
            <a href="#how" className="gz-btn gz-btn-outline">
              See how it works
            </a>
          </div>
          <div className="gz-trust">
            <div className="gz-trust-item">
              <Icon size={22} stroke="#5B2C1E" width={2.2}>
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7v5l3 2" />
              </Icon>
              Profile review in 24 hours
            </div>
            <div className="gz-trust-item">
              <Icon size={22} stroke="#5B2C1E" width={2.2}>
                <path d="M3 7l9-4 9 4-9 4-9-4z" />
                <path d="M3 7v10l9 4 9-4V7" />
              </Icon>
              Zero inventory, zero investment
            </div>
            <div className="gz-trust-item">
              <Icon size={22} stroke="#5B2C1E" width={2.2}>
                <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" />
                <path d="M9 12l2 2 4-4" />
              </Icon>
              Licensed &amp; lab-tested products
            </div>
          </div>
        </div>
        <div className="gz-hero-media">
          <div className="gz-hero-frame">
            <img src={hero} alt="Athlete drinking a GOMZI shake beside a GOMZI Whey Protein jar" />
            <div className="gz-float">
              <div className="gz-float-icon">
                <Icon>
                  <path d="M3 17l6-6 4 4 8-8" />
                  <path d="M15 7h6v6" />
                </Icon>
              </div>
              <div>
                <strong>Manufacturing-rate pricing</strong>
                <span>Same margin as brand owners</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
