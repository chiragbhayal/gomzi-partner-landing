import React from "react";
import { BENEFITS } from "../constants/content";
import { CheckIcon } from "./common/Icons";

export default function Benefits() {
  return (
    <section id="benefits">
      <div className="gz-wrap gz-section gz-split">
        <div>
          <div className="gz-eyebrow">Why partner with GOMZI</div>
          <h2 className="gz-h2">Everything a brand owner gets. Built for trainers.</h2>
          <div className="gz-benefits">
            {BENEFITS.map((b) => (
              <div className="gz-benefit" key={b.title}>
                <div className="gz-check">
                  <CheckIcon />
                </div>
                <div>
                  <h3>{b.title}</h3>
                  <p>{b.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          {/* Illustrative preview of the partner portal – values intentionally blank */}
          <div className="gz-portal" aria-label="Partner portal preview">
            <div className="gz-portal-top">
              Your Partner Portal <span>Coupon: YOURCODE</span>
            </div>
            <div className="gz-portal-grid">
              {["Total clients", "New this month", "Orders via your code", "Your earnings"].map((l) => (
                <div className="gz-portal-stat" key={l}>
                  <small>{l}</small>
                  <div>—</div>
                </div>
              ))}
            </div>
            <div className="gz-portal-link">Your link: ragnutrition.in/p/your-name</div>
            <p>Track every client, every order and every rupee earned — in real time, in one place.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

