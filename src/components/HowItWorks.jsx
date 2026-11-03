import React from "react";
import { STEPS } from "../constants/content";
import {
  StepApplyIcon,
  StepReviewIcon,
  StepAgreementIcon,
  StepPricingIcon,
  StepShareIcon,
  StepEarnIcon,
} from "./common/Icons";

const STEP_ICONS = [
  StepApplyIcon,
  StepReviewIcon,
  StepAgreementIcon,
  StepPricingIcon,
  StepShareIcon,
  StepEarnIcon,
];

export default function HowItWorks() {
  return (
    <section id="how" className="gz-bg-cream">
      <div className="gz-wrap gz-section">
        <div className="gz-center">
          <div className="gz-eyebrow">How it works</div>
          <h2 className="gz-h2">From application to earning in 6 steps</h2>
          <p className="gz-lead">
            A simple, transparent process. You focus on training — we handle stock, shipping and tracking.
          </p>
        </div>
        <ol className="gz-steps">
          {STEPS.map((s, i) => {
            const IconComp = STEP_ICONS[i] || StepApplyIcon;
            return (
              <li className="gz-step" key={s.title}>
                <div className="gz-step-top">
                  <div className="gz-step-icon">
                    <IconComp size={22} color="var(--brown)" />
                  </div>
                  <span className="gz-step-badge">0{i + 1}</span>
                </div>
                <h3 className="gz-step-title">{s.title}</h3>
                <p className="gz-step-desc">{s.text}</p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
