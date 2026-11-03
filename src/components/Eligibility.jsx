import React from "react";
import { ELIGIBILITY } from "../constants/content";

export default function Eligibility() {
  return (
    <section className="gz-elig">
      <div className="gz-wrap gz-section gz-split" style={{ gap: 40 }}>
        <div>
          <div className="gz-eyebrow">Who can apply</div>
          <h2 className="gz-h2">We partner with serious professionals only</h2>
          <p className="gz-lead">
            Every profile is reviewed personally. If you’re a knowledgeable trainer with real
            clients, this program is built for you.
          </p>
        </div>
        <div className="gz-elig-grid">
          {ELIGIBILITY.map((e) => (
            <div className="gz-elig-card" key={e.title}>
              <strong>{e.title}</strong>
              <span>{e.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

