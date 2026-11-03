import React from "react";
import lineup from "../assets/lineup.jpg";

export default function FinalCta() {
  return (
    <section className="gz-final-cta-section">
      <div className="gz-wrap">
        <div className="gz-cta">
          <div className="gz-cta-copy">
            <h2 className="gz-h2">Your clients are already buying supplements.</h2>
            <p>
              Make sure they get trusted products — and that you earn a brand owner’s margin on
              every order.
            </p>
            <a href="#apply" className="gz-btn gz-btn-light">
              Apply as a partner today
            </a>
          </div>
          <img src={lineup} alt="The GOMZI product range" loading="lazy" />
        </div>
      </div>
    </section>
  );
}
