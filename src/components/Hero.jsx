import React, { useState, useRef } from "react";
import heroVideo from "../assets/hero-video.mp4";
import heroPoster from "../assets/hero.jpg";
import { Icon, ArrowIcon } from "./common/Icons";

export default function Hero() {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  const toggleMute = () => {
    if (videoRef.current) {
      const nextMuted = !videoRef.current.muted;
      videoRef.current.muted = nextMuted;
      setIsMuted(nextMuted);
    }
  };

  return (
    <section id="top" className="gz-hero-section">
      <div className="gz-wrap gz-hero">
        {/* Left Side: Headline & Value Proposition */}
        <div className="gz-hero-copy">
          <div className="gz-hero-pill">
            <span className="gz-hero-pill-dot" />
            <span>RAG PRO PARTNER PROGRAM · FOR CERTIFIED TRAINERS</span>
          </div>

          <h1 className="gz-h1">
            <span className="gz-text-black">Earn Brand-Owner Margins.</span>
            <br />
            Without Buying A Single Box.
          </h1>

          <p className="gz-hero-sub">
            Supplement brand owners invest lakhs in bulk stock to unlock manufacturing margins. As a GOMZI partner, you get that exact same margin at manufacturing rates — zero investment, zero inventory. Your clients order online with your coupon, and we deliver across India.
          </p>

          <div className="gz-row">
            <a href="#apply" className="gz-btn gz-btn-primary gz-hero-btn">
              <span>Apply as a Partner</span>
              <ArrowIcon />
            </a>
            <a href="#how" className="gz-btn gz-btn-outline gz-hero-btn-ghost">
              See How It Works
            </a>
          </div>

          {/* Clean Trust Ticks inspired by reference site */}
          <div className="gz-trust">
            <div className="gz-trust-item">
              <span className="gz-trust-tick">✓</span>
              <span>Profile review in 24 hours</span>
            </div>
            <div className="gz-trust-item">
              <span className="gz-trust-tick">✓</span>
              <span>Zero inventory, zero investment</span>
            </div>
            <div className="gz-trust-item">
              <span className="gz-trust-tick">✓</span>
              <span>100% Licensed &amp; lab-tested</span>
            </div>
          </div>
        </div>

        {/* Right Side: Luxury Studio Video Showcase Card (No phone chassis/notch) */}
        <div className="gz-hero-media">
          <div className="gz-hero-frame">
            {/* Ambient Radial Backlight Glow */}
            <div className="gz-hero-glow" aria-hidden="true" />

            {/* Clean Studio Video Card */}
            <div className="gz-studio-card">
              {/* Top Bar Floating Badges */}
              <div className="gz-studio-top-overlay">
                <div className="gz-studio-live-pill">
                  <span className="gz-studio-live-dot" />
                  <span>FOUNDER NOTE • GOMZI DIRECT</span>
                </div>

                {/* Sound Toggle Button */}
                <button
                  type="button"
                  className="gz-video-mute-btn"
                  onClick={toggleMute}
                  aria-label={isMuted ? "Unmute audio" : "Mute audio"}
                  title={isMuted ? "Click to unmute audio" : "Click to mute audio"}
                >
                  {isMuted ? (
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                      <line x1="23" y1="9" x2="17" y2="15" />
                      <line x1="17" y1="9" x2="23" y2="15" />
                    </svg>
                  ) : (
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                      <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
                    </svg>
                  )}
                </button>
              </div>

              {/* Video Element */}
              <div className="gz-studio-video-wrap">
                <video
                  ref={videoRef}
                  className="gz-studio-video"
                  src={heroVideo}
                  poster={heroPoster}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                >
                  Your browser does not support HTML5 video.
                </video>
              </div>

              {/* Integrated Bottom Feature Card */}
              <div className="gz-studio-bottom-badge">
                <div className="gz-studio-badge-icon">
                  <Icon size={18} stroke="#fff" width={2.4}>
                    <path d="M3 17l6-6 4 4 8-8" />
                    <path d="M15 7h6v6" />
                  </Icon>
                </div>
                <div className="gz-studio-badge-text">
                  <strong>Manufacturing-Rate Pricing</strong>
                  <span>40–55% brand-owner margins • Direct pan-India dispatch</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
