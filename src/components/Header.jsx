import React, { useState, useEffect } from "react";
import logo from "../assets/logo.jpg";
import { Icon } from "./common/Icons";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Close drawer on escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsMenuOpen(false);
      }
    };
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="gz-header">
      <div className="gz-wrap gz-nav">
        <a href="#top" aria-label="GOMZI Supplements home" onClick={closeMenu}>
          <img className="gz-nav-logo" src={logo} alt="GOMZI Supplements – The Legacy of RAG" />
        </a>

        {/* Desktop Navigation */}
        <nav className="gz-nav-links" aria-label="Desktop page sections">
          <a href="#top">Home</a>
          <a href="#how">How it works</a>
          <a href="#benefits">Benefits</a>
          <a href="#products">Products</a>
          <a href="#faq">FAQ</a>
        </nav>

        <div className="gz-nav-actions">
          <a href="#apply" className="gz-btn gz-btn-primary gz-header-cta">
            Apply now
          </a>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            className={`gz-menu-toggle${isMenuOpen ? " is-open" : ""}`}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            aria-controls="gz-mobile-nav"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="gz-menu-bar"></span>
            <span className="gz-menu-bar"></span>
            <span className="gz-menu-bar"></span>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <div
        className={`gz-drawer-backdrop${isMenuOpen ? " is-visible" : ""}`}
        onClick={closeMenu}
        aria-hidden={!isMenuOpen}
      />
      <aside
        id="gz-mobile-nav"
        className={`gz-drawer${isMenuOpen ? " is-open" : ""}`}
        aria-label="Mobile navigation"
      >
        <div className="gz-drawer-header">
          <img className="gz-drawer-logo" src={logo} alt="GOMZI Supplements" />
          <button
            type="button"
            className="gz-drawer-close"
            aria-label="Close menu"
            onClick={closeMenu}
          >
            <Icon size={22} width={2.5}>
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </Icon>
          </button>
        </div>
        <nav className="gz-drawer-links" aria-label="Mobile page sections">
          <a href="#top" onClick={closeMenu}>
            Home
          </a>
          <a href="#how" onClick={closeMenu}>
            How it works
          </a>
          <a href="#benefits" onClick={closeMenu}>
            Benefits
          </a>
          <a href="#products" onClick={closeMenu}>
            Products
          </a>
          <a href="#faq" onClick={closeMenu}>
            FAQ
          </a>
        </nav>
        <div className="gz-drawer-footer">
          <a href="#apply" className="gz-btn gz-btn-primary" onClick={closeMenu} style={{ width: "100%" }}>
            Apply as partner
          </a>
        </div>
      </aside>
    </header>
  );
}
