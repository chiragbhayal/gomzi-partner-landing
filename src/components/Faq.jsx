import React, { useState } from "react";
import { FAQS } from "../constants/content";

export default function Faq() {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq">
      <div className="gz-faq-wrap gz-section">
        <div className="gz-center">
          <div className="gz-eyebrow">FAQ</div>
          <h2 className="gz-h2">Questions trainers ask us</h2>
        </div>
        <div className="gz-faq">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            const id = `gz-faq-${i}`;
            return (
              <div className={`gz-faq-item${isOpen ? " is-open" : ""}`} key={f.q}>
                <button
                  type="button"
                  className="gz-faq-q"
                  aria-expanded={isOpen}
                  aria-controls={id}
                  onClick={() => setOpen(isOpen ? -1 : i)}
                >
                  {f.q}
                  <span className="gz-faq-sign" aria-hidden="true">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>
                {isOpen && (
                  <p className="gz-faq-a" id={id}>
                    {f.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

