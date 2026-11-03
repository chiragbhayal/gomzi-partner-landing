import React from "react";
import { COMPARISON } from "../constants/content";

export default function Comparison() {
  return (
    <section>
      <div className="gz-wrap gz-section">
        <div style={{ maxWidth: 720 }}>
          <div className="gz-eyebrow">The opportunity</div>
          <h2 className="gz-h2">Same margin. None of the risk.</h2>
          <p className="gz-lead">
            You already guide your clients on nutrition. Now earn on every recommendation — with the
            economics of a brand owner and none of the capital, stock or logistics.
          </p>
        </div>
        <div className="gz-table-box">
          <table className="gz-table">
            <thead>
              <tr>
                <th scope="col">
                  <span className="sr-only" style={{ position: "absolute", left: -9999 }}>
                    Feature
                  </span>
                </th>
                <th scope="col">Traditional brand owner</th>
                <th scope="col" className="gz-us">
                  RAG Pro Partner
                </th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON.map(([label, them, us]) => (
                <tr key={label}>
                  <th scope="row">{label}</th>
                  <td className="gz-them">{them}</td>
                  <td className="gz-us">{us}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

