import React from "react";
import imgIngredients from "../assets/q1.jpg";
import imgLab from "../assets/q3.jpg";
import { QUALITY_POINTS } from "../constants/content";

export default function Quality() {
  return (
    <section>
      <div className="gz-wrap gz-section gz-split" style={{ gap: 48 }}>
        <div className="gz-quality-imgs">
          <img src={imgIngredients} alt="Premium raw ingredients" loading="lazy" />
          <img src={imgLab} alt="Quality control testing in the lab" loading="lazy" />
        </div>
        <div>
          <div className="gz-eyebrow">Quality you can trust</div>
          <h2 className="gz-h2">Recommend with confidence</h2>
          <p className="gz-lead">
            Your reputation is on every scoop you recommend. That’s why every GOMZI product is
            licensed, lab-tested and made to a consistent standard.
          </p>
          <div className="gz-quality-points">
            {QUALITY_POINTS.map((pt) => (
              <div key={pt.title}>
                <strong>{pt.title}</strong>
                <span>{pt.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

