import React, { useState, useCallback, useRef } from "react";
import { submitApplication } from "../services/api";
import { CONTACT } from "../constants/content";
import { ArrowIcon, CheckIcon } from "./common/Icons";

/**
 * Reusable Form Field Wrapper with Clean Floating/Elevated Label
 */
export function Field({ label, required, children, helper, className = "" }) {
  return (
    <div className={`gz-field-group ${className}`}>
      <label className="gz-field-label">
        <span>{label}</span>
        {required && <span className="gz-required" title="Required field"> *</span>}
      </label>
      <div className="gz-field-control">{children}</div>
      {helper && <span className="gz-field-helper">{helper}</span>}
    </div>
  );
}

export default function ApplicationForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [status, setStatus] = useState("idle"); // 'idle' | 'sending' | 'done' | 'error'
  const [errorMessage, setErrorMessage] = useState("");
  const formRef = useRef(null);

  // File tracking for instant feedback badges
  const [selectedFiles, setSelectedFiles] = useState({
    certificate: null,
    photo: null,
    idProof: null,
  });

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      const file = files[0];
      const sizeMb = (file.size / (1024 * 1024)).toFixed(1);
      setSelectedFiles((prev) => ({
        ...prev,
        [name]: `${file.name} (${sizeMb} MB)`,
      }));
    } else {
      setSelectedFiles((prev) => ({
        ...prev,
        [name]: null,
      }));
    }
  };

  /**
   * Validates required inputs in a specific step container.
   * Reports validity natively to focus the first invalid field.
   */
  const validateStep = (stepNumber) => {
    if (!formRef.current) return false;
    const stepContainer = formRef.current.querySelector(`#gz-step-${stepNumber}`);
    if (!stepContainer) return true;

    const inputs = stepContainer.querySelectorAll("input, select, textarea");
    for (const input of inputs) {
      if (!input.checkValidity()) {
        input.reportValidity();
        return false;
      }
    }
    return true;
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (validateStep(currentStep)) {
      setErrorMessage("");
      setCurrentStep((prev) => Math.min(prev + 1, 3));
      // Scroll to top of form section smoothly
      const section = document.getElementById("apply");
      if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  const handlePrev = (e) => {
    e.preventDefault();
    setErrorMessage("");
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    // Validate Step 3 fields & consent
    if (!validateStep(3)) return;

    // Client-side file size safety check (max 10MB per file)
    const fileInputs = form.querySelectorAll('input[type="file"]');
    const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB
    for (const input of fileInputs) {
      if (input.files && input.files[0] && input.files[0].size > MAX_FILE_SIZE_BYTES) {
        setStatus("error");
        setErrorMessage(
          `File "${input.files[0].name}" exceeds the 10MB limit. Please compress or select a smaller file.`
        );
        return;
      }
    }

    const data = new FormData(form);
    setStatus("sending");
    setErrorMessage("");

    try {
      await submitApplication(data);
      form.reset();
      setSelectedFiles({ certificate: null, photo: null, idProof: null });
      setStatus("done");
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err?.message ||
          `We couldn’t send your application. Check your internet connection and try again, or call us on ${CONTACT.phone}.`
      );
    }
  }, []);

  return (
    <section id="apply" className="gz-bg-cream gz-form-section">
      <div className="gz-form-wrap gz-section">
        {/* Section Heading & Trust Strip */}
        <div className="gz-center">
          <div className="gz-eyebrow">Direct Manufacturing Access</div>
          <h2 className="gz-h2">Become a RAG Pro Partner</h2>
          <p className="gz-lead">
            Takes 3 minutes. Profiles are verified within 24 hours. Unlock direct manufacturer pricing, custom client tracking coupons, and 40–55% margins.
          </p>

          {/* Luxury Trust Pills */}
          <div className="gz-form-trust-strip">
            <div className="gz-trust-pill">
              <span className="gz-trust-icon">⚡</span>
              <span><strong>24-Hour</strong> Fast Track Review</span>
            </div>
            <div className="gz-trust-pill">
              <span className="gz-trust-icon">🔒</span>
              <span><strong>Zero Stock</strong> Investment</span>
            </div>
            <div className="gz-trust-pill">
              <span className="gz-trust-icon">🏷️</span>
              <span><strong>Manufacturing Rates</strong> Direct</span>
            </div>
            <div className="gz-trust-pill">
              <span className="gz-trust-icon">🛡️</span>
              <span><strong>Encrypted &amp;</strong> Confidential</span>
            </div>
          </div>
        </div>

        {status === "done" ? (
          <div className="gz-card gz-success-card" role="status">
            <div className="gz-success-icon-wrap">
              <CheckIcon size={40} stroke="#fff" />
            </div>
            <h3>Application Successfully Submitted!</h3>
            <p>
              Thank you! Our partner onboarding team is already reviewing your credentials. You will receive an SMS and WhatsApp confirmation shortly, followed by a verification call from our partner desk.
            </p>
            <div className="gz-success-callout">
              <strong>What happens next?</strong>
              <span>Once approved, you'll receive your confidential price catalogue and custom client tracking portal link.</span>
            </div>
            <button
              type="button"
              className="gz-btn gz-btn-outline"
              onClick={() => {
                setStatus("idle");
                setCurrentStep(1);
                setErrorMessage("");
              }}
            >
              Submit another application
            </button>
          </div>
        ) : (
          <div className="gz-form-portal-card">
            {/* Executive Wizard Progress Bar Header */}
            <div className="gz-portal-stepper">
              <div
                className="gz-stepper-progress-line"
                style={{
                  width: currentStep === 1 ? "16%" : currentStep === 2 ? "50%" : "84%",
                }}
              />

              {/* Step 1 Pill */}
              <button
                type="button"
                className={`gz-stepper-tab${currentStep >= 1 ? " is-active" : ""}${currentStep > 1 ? " is-done" : ""}`}
                onClick={() => {
                  if (currentStep > 1) setCurrentStep(1);
                }}
                disabled={currentStep < 1}
              >
                <div className="gz-stepper-num">
                  {currentStep > 1 ? "✓" : "1"}
                </div>
                <div className="gz-stepper-meta">
                  <span className="gz-stepper-label">Step 01</span>
                  <span className="gz-stepper-title">Personal Details</span>
                </div>
              </button>

              {/* Step 2 Pill */}
              <button
                type="button"
                className={`gz-stepper-tab${currentStep >= 2 ? " is-active" : ""}${currentStep > 2 ? " is-done" : ""}`}
                onClick={() => {
                  if (currentStep > 2) setCurrentStep(2);
                }}
                disabled={currentStep < 2}
              >
                <div className="gz-stepper-num">
                  {currentStep > 2 ? "✓" : "2"}
                </div>
                <div className="gz-stepper-meta">
                  <span className="gz-stepper-label">Step 02</span>
                  <span className="gz-stepper-title">Credentials &amp; Docs</span>
                </div>
              </button>

              {/* Step 3 Pill */}
              <button
                type="button"
                className={`gz-stepper-tab${currentStep >= 3 ? " is-active" : ""}`}
                disabled={currentStep < 3}
              >
                <div className="gz-stepper-num">3</div>
                <div className="gz-stepper-meta">
                  <span className="gz-stepper-label">Step 03</span>
                  <span className="gz-stepper-title">Practice &amp; Social</span>
                </div>
              </button>
            </div>

            <form
              ref={formRef}
              className="gz-portal-form"
              onSubmit={handleSubmit}
              encType="multipart/form-data"
            >
              {/* STEP 1: Personal Details */}
              <div
                id="gz-step-1"
                className="gz-portal-pane"
                style={{ display: currentStep === 1 ? "block" : "none" }}
              >
                <div className="gz-step-headline">
                  <div className="gz-step-badge">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="gz-step-h3">1. Personal &amp; Contact Details</h3>
                    <p className="gz-step-desc">Enter your primary government-matched identification and dispatch details.</p>
                  </div>
                </div>

                <div className="gz-form-fields-wrap">
                  {/* Line 1: Full name and Age */}
                  <div className="gz-grid-2">
                    <Field label="Full Name" required>
                      <input
                        name="fullName"
                        type="text"
                        required
                        autoComplete="name"
                        placeholder="As on your Aadhaar / Govt ID"
                        className="gz-input"
                      />
                    </Field>
                    <Field label="Age" required>
                      <input
                        name="age"
                        type="number"
                        required
                        min="18"
                        max="80"
                        placeholder="e.g. 28"
                        className="gz-input"
                      />
                    </Field>
                  </div>

                  {/* Line 2: Email address and Mobile / WhatsApp */}
                  <div className="gz-grid-2">
                    <Field label="Email Address" required>
                      <input
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        placeholder="yourname@gmail.com"
                        className="gz-input"
                      />
                    </Field>
                    <Field label="Mobile / WhatsApp Number" required helper="We'll send your batch tracking codes & updates here">
                      <input
                        name="phone"
                        type="tel"
                        required
                        autoComplete="tel"
                        placeholder="+91 98765 43210"
                        pattern="[0-9+\s-]{10,15}"
                        className="gz-input"
                      />
                    </Field>
                  </div>

                  {/* Line 3: Full address */}
                  <div>
                    <Field label="Full Address / Studio Location" required>
                      <textarea
                        name="address"
                        required
                        rows={2}
                        autoComplete="street-address"
                        placeholder="House / flat number, building name, street, locality"
                        className="gz-textarea"
                      />
                    </Field>
                  </div>

                  {/* Line 4: City, State, PIN code */}
                  <div className="gz-grid-3">
                    <Field label="City" required>
                      <input
                        name="city"
                        type="text"
                        required
                        autoComplete="address-level2"
                        placeholder="e.g. Surat"
                        className="gz-input"
                      />
                    </Field>
                    <Field label="State" required>
                      <input
                        name="state"
                        type="text"
                        required
                        autoComplete="address-level1"
                        placeholder="e.g. Gujarat"
                        className="gz-input"
                      />
                    </Field>
                    <Field label="PIN Code" required>
                      <input
                        name="pincode"
                        type="text"
                        required
                        inputMode="numeric"
                        pattern="[0-9]{6}"
                        autoComplete="postal-code"
                        placeholder="6 digits"
                        className="gz-input"
                      />
                    </Field>
                  </div>
                </div>

                <div className="gz-wizard-footer">
                  <div className="gz-step-indicator-text">Step 1 of 3: Identity &amp; Contact</div>
                  <button
                    type="button"
                    className="gz-btn gz-btn-primary gz-step-btn"
                    onClick={handleNext}
                  >
                    <span>Continue to Credentials</span>
                    <ArrowIcon />
                  </button>
                </div>
              </div>

              {/* STEP 2: Certification & Documents */}
              <div
                id="gz-step-2"
                className="gz-portal-pane"
                style={{ display: currentStep === 2 ? "block" : "none" }}
              >
                <div className="gz-step-headline">
                  <div className="gz-step-badge">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="8" r="7" />
                      <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="gz-step-h3">2. Trainer Credentials &amp; Verification</h3>
                    <p className="gz-step-desc">Upload your certification credentials and ID for authorized partner tier assignment.</p>
                  </div>
                </div>

                <div className="gz-form-fields-wrap">
                  {/* Line 1: Certification name and Certifying institute */}
                  <div className="gz-grid-2">
                    <Field label="Certification Name" required>
                      <input
                        name="certificationName"
                        type="text"
                        required
                        placeholder="e.g. Certified Personal Trainer (CPT)"
                        className="gz-input"
                      />
                    </Field>
                    <Field label="Certifying Institute" required>
                      <input
                        name="certifyingInstitute"
                        type="text"
                        required
                        placeholder="e.g. K11, ACSM, ISSA, ACE, Gold's"
                        className="gz-input"
                      />
                    </Field>
                  </div>

                  {/* Line 2: Year of certification and Years of experience */}
                  <div className="gz-grid-2">
                    <Field label="Year of Certification" required>
                      <input
                        name="certificationYear"
                        type="number"
                        required
                        min="1980"
                        max="2030"
                        placeholder="e.g. 2022"
                        className="gz-input"
                      />
                    </Field>
                    <Field label="Total Years of Training Experience" required>
                      <input
                        name="experienceYears"
                        type="number"
                        required
                        min="0"
                        max="50"
                        placeholder="e.g. 4"
                        className="gz-input"
                      />
                    </Field>
                  </div>

                  {/* Line 3: Luxury Dropzone Upload Controls */}
                  <div className="gz-grid-3">
                    {/* Certificate Upload Zone */}
                    <div className="gz-field-group">
                      <label className="gz-field-label">
                        <span>Fitness Certificate</span>
                        <span className="gz-required"> *</span>
                      </label>
                      <div className={`gz-dropzone${selectedFiles.certificate ? " is-attached" : ""}`}>
                        <input
                          id="gz-file-cert"
                          name="certificate"
                          type="file"
                          required
                          accept=".pdf,image/*"
                          onChange={handleFileChange}
                          className="gz-dropzone-hidden"
                        />
                        <label htmlFor="gz-file-cert" className="gz-dropzone-inner">
                          <div className="gz-dropzone-icon">
                            {selectedFiles.certificate ? "✓" : "📄"}
                          </div>
                          <span className="gz-dropzone-title">
                            {selectedFiles.certificate ? "Certificate Attached" : "Upload Certificate"}
                          </span>
                          <span className="gz-dropzone-sub">
                            {selectedFiles.certificate ? selectedFiles.certificate : "PDF or JPG (Max 10MB)"}
                          </span>
                        </label>
                      </div>
                    </div>

                    {/* Photo Upload Zone */}
                    <div className="gz-field-group">
                      <label className="gz-field-label">
                        <span>Profile / Trainer Photo</span>
                        <span className="gz-required"> *</span>
                      </label>
                      <div className={`gz-dropzone${selectedFiles.photo ? " is-attached" : ""}`}>
                        <input
                          id="gz-file-photo"
                          name="photo"
                          type="file"
                          required
                          accept="image/*"
                          onChange={handleFileChange}
                          className="gz-dropzone-hidden"
                        />
                        <label htmlFor="gz-file-photo" className="gz-dropzone-inner">
                          <div className="gz-dropzone-icon">
                            {selectedFiles.photo ? "✓" : "📷"}
                          </div>
                          <span className="gz-dropzone-title">
                            {selectedFiles.photo ? "Photo Attached" : "Passport-size Photo"}
                          </span>
                          <span className="gz-dropzone-sub">
                            {selectedFiles.photo ? selectedFiles.photo : "JPEG or PNG (Max 10MB)"}
                          </span>
                        </label>
                      </div>
                    </div>

                    {/* ID Proof Upload Zone */}
                    <div className="gz-field-group">
                      <label className="gz-field-label">
                        <span>Government ID Proof</span>
                        <span className="gz-required"> *</span>
                      </label>
                      <div className={`gz-dropzone${selectedFiles.idProof ? " is-attached" : ""}`}>
                        <input
                          id="gz-file-id"
                          name="idProof"
                          type="file"
                          required
                          accept=".pdf,image/*"
                          onChange={handleFileChange}
                          className="gz-dropzone-hidden"
                        />
                        <label htmlFor="gz-file-id" className="gz-dropzone-inner">
                          <div className="gz-dropzone-icon">
                            {selectedFiles.idProof ? "✓" : "🪪"}
                          </div>
                          <span className="gz-dropzone-title">
                            {selectedFiles.idProof ? "ID Attached" : "Upload ID Document"}
                          </span>
                          <span className="gz-dropzone-sub">
                            {selectedFiles.idProof ? selectedFiles.idProof : "Aadhaar, PAN or Driving Lic"}
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Line 4: ID proof type selector */}
                  <div>
                    <Field label="Select Government ID Type" required>
                      <select name="idType" required defaultValue="" className="gz-select">
                        <option value="" disabled>
                          Select the document type you uploaded above
                        </option>
                        <option>Aadhaar card</option>
                        <option>PAN card</option>
                        <option>Driving licence</option>
                        <option>Passport</option>
                        <option>Voter ID</option>
                      </select>
                    </Field>
                  </div>
                </div>

                <div className="gz-wizard-footer">
                  <button
                    type="button"
                    className="gz-btn gz-btn-outline gz-step-back-btn"
                    onClick={handlePrev}
                  >
                    ← Back to Personal
                  </button>
                  <button
                    type="button"
                    className="gz-btn gz-btn-primary gz-step-btn"
                    onClick={handleNext}
                  >
                    <span>Continue to Practice Details</span>
                    <ArrowIcon />
                  </button>
                </div>
              </div>

              {/* STEP 3: Clients & Social Presence */}
              <div
                id="gz-step-3"
                className="gz-portal-pane"
                style={{ display: currentStep === 3 ? "block" : "none" }}
              >
                <div className="gz-step-headline">
                  <div className="gz-step-badge">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="gz-step-h3">3. Training Practice &amp; Client Reach</h3>
                    <p className="gz-step-desc">Share your coaching volume so we can calculate your monthly partner margin tier.</p>
                  </div>
                </div>

                <div className="gz-form-fields-wrap">
                  {/* Line 1: Active client base and Fee per client */}
                  <div className="gz-grid-2">
                    <Field label="Active Monthly Client Base" required helper="Number of clients you actively coach">
                      <select name="activeClients" required defaultValue="" className="gz-select">
                        <option value="" disabled>
                          Select active trainee range
                        </option>
                        <option>1–10 clients</option>
                        <option>11–25 clients</option>
                        <option>26–50 clients</option>
                        <option>51–100 clients</option>
                        <option>100+ clients (Pro Studio)</option>
                      </select>
                    </Field>
                    <Field label="Average Training Fee Per Client (₹)" required helper="Your monthly personal training fee">
                      <input
                        name="feePerClient"
                        type="text"
                        required
                        inputMode="numeric"
                        placeholder="e.g. 3000 – 6000"
                        className="gz-input"
                      />
                    </Field>
                  </div>

                  {/* Line 2: Instagram link and Facebook/YouTube link */}
                  <div className="gz-grid-2">
                    <Field label="Instagram Profile Link" required helper="Used for quick fitness profile verification">
                      <input
                        name="instagram"
                        type="url"
                        required
                        placeholder="https://instagram.com/yourhandle"
                        className="gz-input"
                      />
                    </Field>
                    <Field label="Facebook / YouTube / LinkedIn (Optional)">
                      <input
                        name="facebookOrYoutube"
                        type="url"
                        placeholder="https://youtube.com/@yourchannel"
                        className="gz-input"
                      />
                    </Field>
                  </div>

                  {/* Line 3: Primary training mode */}
                  <div>
                    <Field label="Primary Training Mode">
                      <select name="trainingMode" defaultValue="Gym / in-person" className="gz-select">
                        <option>Gym / in-person personal training</option>
                        <option>Online fitness &amp; nutrition coaching</option>
                        <option>Hybrid (Both in-person and online)</option>
                      </select>
                    </Field>
                  </div>
                </div>

                {/* Confidentiality Consent Card */}
                <div className="gz-consent-box">
                  <label className="gz-consent-label">
                    <input name="consent" type="checkbox" required value="yes" className="gz-checkbox" />
                    <span>
                      <strong>Partner Confidentiality &amp; Code of Conduct:</strong> I certify that all submitted credentials are valid. I understand that GOMZI manufacturing wholesale pricing is strictly confidential and revealed only under signed agreement.
                    </span>
                  </label>
                </div>

                {status === "error" && (
                  <div className="gz-error" role="alert">
                    {errorMessage ||
                      `We couldn’t send your application. Check your connection or call us at ${CONTACT.phone}.`}
                  </div>
                )}

                <div className="gz-wizard-footer">
                  <button
                    type="button"
                    className="gz-btn gz-btn-outline gz-step-back-btn"
                    onClick={handlePrev}
                    disabled={status === "sending"}
                  >
                    ← Back to Credentials
                  </button>
                  <button
                    type="submit"
                    className="gz-btn gz-btn-primary gz-step-submit-btn"
                    disabled={status === "sending"}
                  >
                    {status === "sending" ? (
                      <span className="gz-submitting-spin">Submitting Application…</span>
                    ) : (
                      <>
                        <span>Submit Pro Partner Application</span>
                        <ArrowIcon />
                      </>
                    )}
                  </button>
                </div>

                <div className="gz-security-note">
                  <span>🔒 256-Bit SSL Encrypted • Uploaded files are reviewed only by authorized compliance managers.</span>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </section>
  );
}
