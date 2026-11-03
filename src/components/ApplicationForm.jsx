import React, { useState, useCallback, useRef } from "react";
import { submitApplication } from "../services/api";
import { CONTACT } from "../constants/content";
import { ArrowIcon, CheckIcon } from "./common/Icons";

/**
 * Reusable Form Field Wrapper
 */
export function Field({ label, required, children, file }) {
  return (
    <label className={`gz-field${file ? " gz-field-file" : ""}`}>
      <span className="gz-field-label">
        {label}
        {required && <span className="gz-required"> *</span>}
      </span>
      {children}
    </label>
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
    <section id="apply" className="gz-bg-cream">
      <div className="gz-form-wrap gz-section">
        <div className="gz-center">
          <div className="gz-eyebrow">Apply now</div>
          <h2 className="gz-h2">Become a RAG Pro Partner</h2>
          <p className="gz-lead">
            Takes about 5 minutes. We review every profile within 24 hours and you’ll hear back by
            message and a call from our team.
          </p>
        </div>

        {status === "done" ? (
          <div className="gz-card gz-success" role="status">
            <div className="gz-success-icon">
              <CheckIcon size={34} stroke="#fff" />
            </div>
            <h3>Application received</h3>
            <p>
              Thank you! Our team will review your profile within 24 hours. You’ll get a message
              with the result, followed by a call to walk you through the next steps.
            </p>
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
          <form
            ref={formRef}
            className="gz-card gz-form"
            onSubmit={handleSubmit}
            encType="multipart/form-data"
          >
            {/* Step Wizard Progress Indicator with Smooth Line Animation */}
            <div
              className="gz-wizard-progress"
              role="progressbar"
              aria-valuenow={currentStep}
              aria-valuemin="1"
              aria-valuemax="3"
            >
              {/* Background connecting track */}
              <div className="gz-wizard-track">
                <div
                  className="gz-wizard-bar"
                  style={{
                    width: currentStep === 1 ? "0%" : currentStep === 2 ? "50%" : "100%",
                  }}
                />
              </div>

              {/* Step 1 Circle */}
              <div
                className={`gz-wizard-step${currentStep >= 1 ? " is-active" : ""}${
                  currentStep > 1 ? " is-done" : ""
                }`}
                onClick={() => {
                  if (currentStep > 1) setCurrentStep(1);
                }}
                style={{ cursor: currentStep > 1 ? "pointer" : "default" }}
              >
                <div className="gz-wizard-step-circle">{currentStep > 1 ? "✓" : "1"}</div>
                <div className="gz-wizard-step-label">Personal</div>
              </div>

              {/* Step 2 Circle */}
              <div
                className={`gz-wizard-step${currentStep >= 2 ? " is-active" : ""}${
                  currentStep > 2 ? " is-done" : ""
                }`}
                onClick={() => {
                  if (currentStep > 2) setCurrentStep(2);
                }}
                style={{ cursor: currentStep > 2 ? "pointer" : "default" }}
              >
                <div className="gz-wizard-step-circle">{currentStep > 2 ? "✓" : "2"}</div>
                <div className="gz-wizard-step-label">Credentials</div>
              </div>

              {/* Step 3 Circle */}
              <div
                className={`gz-wizard-step${currentStep >= 3 ? " is-active" : ""}`}
                style={{ cursor: "default" }}
              >
                <div className="gz-wizard-step-circle">3</div>
                <div className="gz-wizard-step-label">Practice</div>
              </div>
            </div>

            {/* STEP 1: Personal Details */}
            <div
              id="gz-step-1"
              className="gz-wizard-pane"
              style={{ display: currentStep === 1 ? "block" : "none" }}
            >
              <fieldset>
                <legend>1. Personal details</legend>

                {/* Line 1: Full name and Age */}
                <div className="gz-grid-2">
                  <Field label="Full name" required>
                    <input
                      name="fullName"
                      type="text"
                      required
                      autoComplete="name"
                      placeholder="As on your government ID"
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
                    />
                  </Field>
                </div>

                {/* Line 2: Email address and Mobile / WhatsApp */}
                <div className="gz-grid-2 gz-mt">
                  <Field label="Email address" required>
                    <input
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      placeholder="you@example.com"
                    />
                  </Field>
                  <Field label="Mobile / WhatsApp" required>
                    <input
                      name="phone"
                      type="tel"
                      required
                      autoComplete="tel"
                      placeholder="+91 98765 43210"
                      pattern="[0-9+\s-]{10,15}"
                    />
                  </Field>
                </div>

                {/* Line 3: Full address */}
                <div className="gz-mt">
                  <Field label="Full address" required>
                    <textarea
                      name="address"
                      required
                      rows={2}
                      autoComplete="street-address"
                      placeholder="House / flat number, street, locality"
                    />
                  </Field>
                </div>

                {/* Line 4: City, State, PIN code */}
                <div className="gz-grid-3 gz-mt">
                  <Field label="City" required>
                    <input
                      name="city"
                      type="text"
                      required
                      autoComplete="address-level2"
                    />
                  </Field>
                  <Field label="State" required>
                    <input
                      name="state"
                      type="text"
                      required
                      autoComplete="address-level1"
                    />
                  </Field>
                  <Field label="PIN code" required>
                    <input
                      name="pincode"
                      type="text"
                      required
                      inputMode="numeric"
                      pattern="[0-9]{6}"
                      autoComplete="postal-code"
                      placeholder="6 digits"
                    />
                  </Field>
                </div>
              </fieldset>

              <div className="gz-wizard-nav">
                <span />
                <button
                  type="button"
                  className="gz-btn gz-btn-primary"
                  onClick={handleNext}
                >
                  Continue to Credentials <ArrowIcon />
                </button>
              </div>
            </div>

            {/* STEP 2: Certification & Documents */}
            <div
              id="gz-step-2"
              className="gz-wizard-pane"
              style={{ display: currentStep === 2 ? "block" : "none" }}
            >
              <fieldset>
                <legend>2. Certification &amp; documents</legend>

                {/* Line 1: Certification name and Certifying institute */}
                <div className="gz-grid-2">
                  <Field label="Certification name" required>
                    <input
                      name="certificationName"
                      type="text"
                      required
                      placeholder="e.g. Certified Personal Trainer (CPT)"
                    />
                  </Field>
                  <Field label="Certifying institute" required>
                    <input
                      name="certifyingInstitute"
                      type="text"
                      required
                      placeholder="e.g. K11, ACSM, ISSA, ACE"
                    />
                  </Field>
                </div>

                {/* Line 2: Year of certification and Years of experience */}
                <div className="gz-grid-2 gz-mt">
                  <Field label="Year of certification" required>
                    <input
                      name="certificationYear"
                      type="number"
                      required
                      min="1980"
                      max="2030"
                      placeholder="e.g. 2022"
                    />
                  </Field>
                  <Field label="Years of training experience" required>
                    <input
                      name="experienceYears"
                      type="number"
                      required
                      min="0"
                      max="50"
                      placeholder="e.g. 4"
                    />
                  </Field>
                </div>

                {/* Line 3: 3 Upload documents (Certificate, Photo, ID proof) */}
                <div className="gz-grid-3 gz-mt">
                  <Field label="Certificate (PDF or image)" required file>
                    <input
                      name="certificate"
                      type="file"
                      required
                      accept=".pdf,image/*"
                      onChange={handleFileChange}
                    />
                    {selectedFiles.certificate && (
                      <div className="gz-file-badge">✓ {selectedFiles.certificate}</div>
                    )}
                  </Field>
                  <Field label="Passport-size photo" required file>
                    <input
                      name="photo"
                      type="file"
                      required
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                    {selectedFiles.photo && (
                      <div className="gz-file-badge">✓ {selectedFiles.photo}</div>
                    )}
                  </Field>
                  <Field label="Upload ID proof (PDF or image)" required file>
                    <input
                      name="idProof"
                      type="file"
                      required
                      accept=".pdf,image/*"
                      onChange={handleFileChange}
                    />
                    {selectedFiles.idProof && (
                      <div className="gz-file-badge">✓ {selectedFiles.idProof}</div>
                    )}
                  </Field>
                </div>

                {/* Line 4: Full width Dropdown (ID proof type) */}
                <div className="gz-mt">
                  <Field label="ID proof type" required>
                    <select name="idType" required defaultValue="">
                      <option value="" disabled>
                        Select government ID type
                      </option>
                      <option>Aadhaar card</option>
                      <option>PAN card</option>
                      <option>Driving licence</option>
                      <option>Passport</option>
                      <option>Voter ID</option>
                    </select>
                  </Field>
                </div>
              </fieldset>

              <div className="gz-wizard-nav">
                <button
                  type="button"
                  className="gz-btn gz-btn-outline"
                  onClick={handlePrev}
                >
                  ← Back
                </button>
                <button
                  type="button"
                  className="gz-btn gz-btn-primary"
                  onClick={handleNext}
                >
                  Continue to Practice Details <ArrowIcon />
                </button>
              </div>
            </div>

            {/* STEP 3: Clients & Social Presence */}
            <div
              id="gz-step-3"
              className="gz-wizard-pane"
              style={{ display: currentStep === 3 ? "block" : "none" }}
            >
              <fieldset>
                <legend>3. Clients &amp; social presence</legend>

                {/* Line 1: Active client base and Fee per client */}
                <div className="gz-grid-2">
                  <Field label="Active client base" required>
                    <select name="activeClients" required defaultValue="">
                      <option value="" disabled>
                        Select active client range
                      </option>
                      <option>1–10</option>
                      <option>11–25</option>
                      <option>26–50</option>
                      <option>51–100</option>
                      <option>100+</option>
                    </select>
                  </Field>
                  <Field label="Average monthly fee per client (₹)" required>
                    <input
                      name="feePerClient"
                      type="text"
                      required
                      inputMode="numeric"
                      placeholder="e.g. 3000–5000"
                    />
                  </Field>
                </div>

                {/* Line 2: Instagram link and Facebook/YouTube link */}
                <div className="gz-grid-2 gz-mt">
                  <Field label="Instagram profile link" required>
                    <input
                      name="instagram"
                      type="url"
                      required
                      placeholder="https://instagram.com/yourhandle"
                    />
                  </Field>
                  <Field label="Facebook or YouTube link (optional)">
                    <input
                      name="facebookOrYoutube"
                      type="url"
                      placeholder="https://youtube.com/@yourchannel"
                    />
                  </Field>
                </div>

                {/* Line 3: Full width Primary training mode */}
                <div className="gz-mt">
                  <Field label="Primary training mode">
                    <select name="trainingMode" defaultValue="Gym / in-person">
                      <option>Gym / in-person</option>
                      <option>Online coaching</option>
                      <option>Both</option>
                    </select>
                  </Field>
                </div>
              </fieldset>

              <label className="gz-consent">
                <input name="consent" type="checkbox" required value="yes" />
                <span>
                  I confirm these details are true. I understand that partner pricing is shared only
                  after approval and a signed confidentiality agreement, and must not be disclosed to anyone.
                </span>
              </label>

              {status === "error" && (
                <div className="gz-error" role="alert">
                  {errorMessage ||
                    `We couldn’t send your application. Check your internet connection and try again, or call us on ${CONTACT.phone}.`}
                </div>
              )}

              <div className="gz-wizard-nav">
                <button
                  type="button"
                  className="gz-btn gz-btn-outline"
                  onClick={handlePrev}
                  disabled={status === "sending"}
                >
                  ← Back
                </button>
                <button
                  type="submit"
                  className="gz-btn gz-btn-primary gz-submit"
                  disabled={status === "sending"}
                >
                  {status === "sending" ? "Submitting application…" : <>Submit application <ArrowIcon /></>}
                </button>
              </div>

              <p className="gz-note">Your documents are securely encrypted and used only for trainer verification.</p>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
