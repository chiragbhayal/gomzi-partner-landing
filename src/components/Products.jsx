import React from "react";
import { PRODUCTS } from "../constants/content";
import { Icon } from "./common/Icons";

export default function Products() {
  return (
    <section id="products" className="gz-bg-cream">
      <div className="gz-wrap gz-section">
        <div className="gz-products-head">
          <div style={{ maxWidth: 640 }}>
            <div className="gz-eyebrow">The GOMZI collection</div>
            <h2 className="gz-h2">A wide range your clients already need</h2>
            <p className="gz-lead">
              Proteins, performance and everyday nutrition — in multiple flavours, all under one trusted brand.
            </p>
          </div>
          <div className="gz-lock">
            <Icon size={22} stroke="#5B2C1E" width={2.2}>
              <rect x="4" y="11" width="16" height="10" rx="2" />
              <path d="M8 11V7a4 4 0 0 1 8 0v4" />
            </Icon>
            <span>
              <strong>Confidential Partner Pricing:</strong> Revealed only after profile review and signed agreement.
            </span>
          </div>
        </div>
        <div className="gz-products">
          {PRODUCTS.map((p) => (
            <article className="gz-product" key={p.name}>
              <div className="gz-product-img">
                <img src={p.img} alt={p.name} loading="lazy" />
              </div>
              <div className="gz-product-body">
                <h3>{p.name}</h3>
                <span className="gz-product-tag">{p.note}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
