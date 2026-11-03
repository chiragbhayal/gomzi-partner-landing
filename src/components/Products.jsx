import React, { useState, useEffect, useMemo } from "react";
import { Icon } from "./common/Icons";

export default function Products() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch exclusively live products from backend API (VITE_API_URL)
  const fetchLiveProducts = async () => {
    setLoading(true);
    setError(null);

    try {
      const apiBase =
        import.meta.env?.VITE_API_URL ||
        import.meta.env?.VITE_API_BASE_URL ||
        "http://localhost:3005";

      const res = await fetch(`${apiBase}/public/v1/products?limit=500`);
      if (!res.ok) {
        throw new Error(`API responded with status: ${res.status}`);
      }

      const json = await res.json();
      const liveData = json?.data || [];

      // Strictly filter ONLY genuine in-house GOMZI products
      const gomziOnly = liveData.filter((p) => {
        if (!p || !p.name) return false;
        const company = (p.company || "").trim().toLowerCase();
        const name = (p.name || "").trim().toLowerCase();
        const brand = (p.brand || "").trim().toLowerCase();
        const website = (p.brandWebsite || "").trim().toLowerCase();

        return (
          company.includes("gomzi") ||
          brand.includes("gomzi") ||
          name.startsWith("gomzi") ||
          website.includes("gomzi")
        );
      });

      // Map raw API schema to clean card presentation schema
      const mapped = gomziOnly.map((p) => {
        const rawImg = Array.isArray(p.displayImages) ? p.displayImages[0] : p.displayImages;
        let imgUrl = "/images/products/protein-removebg.png";
        if (rawImg && typeof rawImg === "string" && rawImg.trim()) {
          const clean = rawImg.trim();
          if (clean.startsWith("http://") || clean.startsWith("https://")) {
            imgUrl = clean;
          } else if (clean.startsWith("product-category/") || clean.startsWith("/product-category/")) {
            imgUrl = `/images/products/${clean.split("/").pop()}`;
          } else if (clean.startsWith("/")) {
            imgUrl = clean;
          } else {
            imgUrl = `https://files.fggroup.in/${clean}`;
          }
        }

        // Determine category bucket
        const cats = Array.isArray(p.categories)
          ? p.categories.join(" ").toLowerCase()
          : (p.category || "").toLowerCase();
        const nameLower = (p.name || "").toLowerCase();

        let catId = "whey";
        let catLabel = "Whey Protein";

        if (cats.includes("combo") || cats.includes("stack") || nameLower.includes("stack") || nameLower.includes("duo")) {
          catId = "combos";
          catLabel = "Combos & Stacks";
        } else if (cats.includes("bcaa") || cats.includes("amino") || nameLower.includes("bcaa")) {
          catId = "bcaa";
          catLabel = "BCAA & Amino";
        } else if (cats.includes("wellness") || cats.includes("health") || nameLower.includes("ignite") || nameLower.includes("burner")) {
          catId = "wellness";
          catLabel = "Daily Wellness";
        } else if (cats.includes("creatine") || nameLower.includes("creatine")) {
          catId = "creatine";
          catLabel = "Creatine";
        } else if (cats.includes("pre-workout") || cats.includes("pre workout") || nameLower.includes("pre-workout")) {
          catId = "preworkout";
          catLabel = "Pre-Workout";
        } else if (cats.includes("gainer") || cats.includes("mass") || nameLower.includes("gainer")) {
          catId = "gainer";
          catLabel = "Mass Gainer";
        } else if (cats.includes("peanut") || cats.includes("snack") || nameLower.includes("peanut")) {
          catId = "snacks";
          catLabel = "Protein Snacks";
        } else if (cats.includes("plant") || cats.includes("vegan") || nameLower.includes("plant")) {
          catId = "plant";
          catLabel = "Plant Protein";
        }

        // Professional product title formatting
        let displayName = p.name;
        if (!displayName.toLowerCase().startsWith("gomzi")) {
          displayName = `Gomzi 100% Pure ${p.name}`;
        }

        // Weight & Flavour presentation
        const weightStr = p.weight?.amount ? ` (${p.weight.amount} ${p.weight.unit})` : "";
        const flavourStr = p.flavour ? `${p.flavour}${weightStr}` : (weightStr ? weightStr.replace(/[()]/g, "").trim() : "Authentic Batch");

        // Highlights based on category
        let highlight = p.shortDescription || p.description;
        if (!highlight || highlight.length < 5) {
          if (catId === "whey") {
            highlight = "24g Pure Protein • 5.5g BCAAs • Direct GMP Production";
          } else if (catId === "combos") {
            highlight = "Max Value Client Transformation Pack • Top Partner Margin";
          } else if (catId === "bcaa") {
            highlight = "7g Instant Amino Matrix • Electrolytes • Fast Recovery";
          } else if (catId === "wellness") {
            highlight = "Advanced Thermogenic Metabolism • Preserves Lean Mass";
          } else {
            highlight = "100% Authentic In-House Formulation • Direct From Lab";
          }
        }

        const retailPrice = p.discountPrice || p.price || 1999;
        const mrp = p.price && p.discountPrice && p.price > p.discountPrice
          ? p.price
          : Math.round(retailPrice * 1.35);

        return {
          id: p._id || p.slug || p.name,
          category: catId,
          categoryLabel: catLabel,
          name: displayName,
          flavour: flavourStr,
          badge: p.isFlashDeal ? "🔥 DEAL" : "GOMZI IN-HOUSE",
          highlight,
          retailPrice,
          mrp,
          marginTag: "40–55% Manufacturing Margin",
          image: imgUrl,
          fallbackImage: "/images/products/protein-removebg.png",
        };
      });

      setProducts(mapped);
    } catch (err) {
      console.error("[Products Fetch Error]", err);
      setError(err.message || "Could not connect to backend API");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLiveProducts();
  }, []);

  // Compute categories dynamically from ONLY currently fetched GOMZI products
  const dynamicCategories = useMemo(() => {
    const catMap = new Map();
    catMap.set("all", { id: "all", label: "All Products", count: products.length });

    products.forEach((p) => {
      if (!catMap.has(p.category)) {
        catMap.set(p.category, {
          id: p.category,
          label: p.categoryLabel || p.category,
          count: 0,
        });
      }
      catMap.get(p.category).count += 1;
    });

    return Array.from(catMap.values());
  }, [products]);

  const filteredProducts =
    activeCategory === "all"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <section id="products" className="gz-bg-cream">
      <div className="gz-wrap gz-section">
        <div className="gz-products-head">
          <div style={{ maxWidth: 640 }}>
            <div className="gz-eyebrow">LIVE GOMZI IN-HOUSE CATALOG</div>
            <h2 className="gz-h2">Direct Factory Formulations For Your Clients</h2>
            <p className="gz-lead">
              Every single product below is manufactured directly in GOMZI's own GMP & FSSAI certified lab. Zero middleman markups, fully batch verified, with 40–55% brand-owner margins.
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

        {/* Dynamic Category Filter Tabs from Live API */}
        {!loading && dynamicCategories.length > 1 && (
          <div className="gz-cat-tabs" role="tablist" aria-label="Product Categories">
            {dynamicCategories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`gz-cat-tab${isActive ? " is-active" : ""}`}
                  onClick={() => setActiveCategory(cat.id)}
                >
                  <span>{cat.label}</span>
                  <span className="gz-cat-tab-count">({cat.count})</span>
                </button>
              );
            })}
          </div>
        )}

        {/* Loading State Skeleton */}
        {loading && (
          <div className="gz-products" style={{ opacity: 0.7 }}>
            {[1, 2, 3, 4, 5, 6].map((idx) => (
              <article className="gz-product" key={idx} style={{ minHeight: 380, display: "flex", flexDirection: "column" }}>
                <div className="gz-product-img" style={{ background: "#ede7e3", animation: "pulse 1.5s infinite" }} />
                <div className="gz-product-body" style={{ gap: 12 }}>
                  <div style={{ height: 14, width: "40%", background: "#e5ded9", borderRadius: 4 }} />
                  <div style={{ height: 20, width: "80%", background: "#ded5cf", borderRadius: 4 }} />
                  <div style={{ height: 14, width: "60%", background: "#ebe4df", borderRadius: 4 }} />
                  <div style={{ height: 38, width: "100%", background: "#e5ded9", borderRadius: 8, marginTop: "auto" }} />
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div style={{ textAlign: "center", padding: "48px 24px", background: "#fff", borderRadius: 16, border: "1px solid var(--line-2)", marginTop: 24 }}>
            <h3 style={{ color: "var(--brown)", marginBottom: 8, fontSize: 18 }}>Unable to Load Live Products</h3>
            <p style={{ color: "var(--muted)", fontSize: 14, maxWidth: 480, margin: "0 auto 20px" }}>
              Could not retrieve GOMZI products from the backend API. Please make sure the API server is running on <code>http://localhost:3005</code>.
            </p>
            <button
              onClick={fetchLiveProducts}
              style={{
                background: "var(--brown)",
                color: "#fff",
                border: "none",
                padding: "10px 22px",
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              Retry Connection
            </button>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && products.length === 0 && (
          <div style={{ textAlign: "center", padding: "48px 24px", background: "#fff", borderRadius: 16, border: "1px solid var(--line-2)", marginTop: 24 }}>
            <h3 style={{ color: "var(--brown)", marginBottom: 8, fontSize: 18 }}>No Live GOMZI Products Found</h3>
            <p style={{ color: "var(--muted)", fontSize: 14, maxWidth: 480, margin: "0 auto" }}>
              Products marked under <strong>Gomzi Nutrition</strong> will automatically appear here once added in the Admin Panel.
            </p>
          </div>
        )}

        {/* Live Products Grid */}
        {!loading && !error && products.length > 0 && (
          <div className="gz-products">
            {filteredProducts.map((p) => (
              <article className="gz-product" key={p.id || p.name}>
                <div className="gz-product-img">
                  {p.badge && <span className="gz-product-badge">{p.badge}</span>}
                  {p.flavour && <span className="gz-product-flavour">{p.flavour}</span>}
                  <img
                    src={p.image}
                    alt={p.name}
                    loading="lazy"
                    onError={(e) => {
                      if (p.fallbackImage && e.currentTarget.src !== p.fallbackImage) {
                        e.currentTarget.src = p.fallbackImage;
                      }
                    }}
                  />
                </div>
                <div className="gz-product-body">
                  <span className="gz-product-cat">{p.categoryLabel}</span>
                  <h3>{p.name}</h3>
                  <p className="gz-product-highlight">{p.highlight}</p>

                  <div className="gz-product-pricing">
                    <span className="gz-product-retail">₹{p.retailPrice?.toLocaleString("en-IN")}</span>
                    {p.mrp && <span className="gz-product-mrp">₹{p.mrp?.toLocaleString("en-IN")}</span>}
                  </div>

                  <div className="gz-product-margin-pill">
                    <span>🔒 Partner Profit</span>
                    <strong>{p.marginTag || "Manufacturing Margin"}</strong>
                  </div>

                  <a href="#apply" className="gz-product-cta">
                    Unlock Partner Pricing →
                  </a>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
