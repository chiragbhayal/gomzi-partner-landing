/**
 * GOMZI Supplements – RAG Pro Partner Program Landing Page
 * Root Composite Component
 *
 * @usage
 * import GomziPartnerLanding from "./GomziPartnerLanding";
 * <GomziPartnerLanding />
 */

import React from "react";
import "./GomziPartnerLanding.css";

import TopBar from "./components/TopBar";
import Header from "./components/Header";
import Hero from "./components/Hero";
import CertStrip from "./components/CertStrip";
import Comparison from "./components/Comparison";
import HowItWorks from "./components/HowItWorks";
import Benefits from "./components/Benefits";
import Products from "./components/Products";
import Quality from "./components/Quality";
import Eligibility from "./components/Eligibility";
import ApplicationForm from "./components/ApplicationForm";
import Faq from "./components/Faq";
import FinalCta from "./components/FinalCta";
import Footer from "./components/Footer";

// Re-export individual components for modular reusability
export {
  TopBar,
  Header,
  Hero,
  CertStrip,
  Comparison,
  HowItWorks,
  Benefits,
  Products,
  Quality,
  Eligibility,
  ApplicationForm,
  Faq,
  FinalCta,
  Footer,
};

export default function GomziPartnerLanding() {
  return (
    <div className="gz">
      <TopBar />
      <Header />
      <main id="main-content">
        <Hero />
        <CertStrip />
        <Comparison />
        <HowItWorks />
        <Benefits />
        <Products />
        <Quality />
        <Eligibility />
        <ApplicationForm />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
