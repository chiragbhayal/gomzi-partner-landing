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

        {/* Right Side: Executive Studio Video Showcase (100% Unobscured Speaker + Pedestal) */}
        <div className="gz-hero-media">
          <div className="gz-hero-frame">
            {/* Ambient Radial Backlight Glow */}
            <div className="gz-hero-glow" aria-hidden="true" />

            {/* Clean Studio Executive Card */}
            <div className="gz-studio-card">
              {/* Unhindered Edge-to-Edge Video Viewport */}
              <div className="gz-studio-video-wrap">
                {/* Top Studio HUD: Live Tag + Audio Pill */}
                <div className="gz-studio-top-overlay">
                  <div className="gz-studio-live-pill">
                    <span className="gz-studio-live-dot" />
                    <span>EXECUTIVE BRIEFING</span>
                  </div>

                  {/* High-Affordance Frosted Sound Button */}
                  <button
                    type="button"
                    className={`gz-studio-sound-pill ${!isMuted ? "is-unmuted" : ""}`}
                    onClick={toggleMute}
                    aria-label={isMuted ? "Unmute founder briefing" : "Mute founder briefing"}
                    title={isMuted ? "Click to hear Chirag speak" : "Click to mute audio"}
                  >
                    {isMuted ? (
                      <>
                        <svg
                          width="14"
                          height="14"
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
                        <span>Tap for sound</span>
                      </>
                    ) : (
                      <>
                        <svg
                          width="14"
                          height="14"
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
                        <span>Sound ON</span>
                      </>
                    )}
                  </button>
                </div>

                {/* 100% Full-View Video: Zero overlays covering founder's hands or desk */}
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
                  onClick={toggleMute}
                  title="Click video to toggle audio"
                >
                  Your browser does not support HTML5 video.
                </video>
              </div>

              {/* Executive Credential Pedestal (Placed Below Video, Never Blocking The Frame) */}
              <div className="gz-studio-pedestal">
                <div className="gz-pedestal-identity">
                  <div className="gz-pedestal-avatar-box">
                    <img src={heroPoster} alt="Chirag Bhayal" className="gz-pedestal-avatar" />
                    <span className="gz-pedestal-avatar-tick" title="Verified Founder">✓</span>
                  </div>
                  <div className="gz-pedestal-meta">
                    <div className="gz-pedestal-name-line">
                      <span className="gz-pedestal-name">Chirag Bhayal</span>
                      <span className="gz-pedestal-tag">Founder &amp; MD</span>
                    </div>
                    <span className="gz-pedestal-sub">GOMZI Nutrition · Direct Factory Program</span>
                  </div>
                </div>

                <div className="gz-pedestal-metrics">
                  <div className="gz-pedestal-metric-cell">
                    <strong>40–55%</strong>
                    <span>Direct Margin</span>
                  </div>
                  <div className="gz-pedestal-metric-divider" />
                  <div className="gz-pedestal-metric-cell">
                    <strong>₹0 Stock</strong>
                    <span>Zero Investment</span>
                  </div>
                  <div className="gz-pedestal-metric-divider" />
                  <div className="gz-pedestal-metric-cell">
                    <strong>Pan-India</strong>
                    <span>Factory Dispatch</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
