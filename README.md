# GOMZI – RAG Pro Partner Program Landing Page (React + Vite)

A production-ready React + Vite application for the GOMZI Supplements RAG Pro Partner Program landing page.

## Project Structure

```
gomzi-partner-landing/
├── index.html                   # HTML entry point with meta tags & typography
├── package.json                 # Project dependencies & npm scripts
├── vite.config.js               # Vite configuration with React plugin
├── src/
│   ├── main.jsx                 # Application bootstrapping & DOM mount
│   ├── GomziPartnerLanding.jsx  # Main orchestrator component (re-exports modular sections)
│   ├── GomziPartnerLanding.css  # Master styling & responsive theme variables
│   ├── assets/                  # Original brand assets and product photography
│   ├── components/              # Modular section components
│   │   ├── Header.jsx           # Top navigation bar
│   │   ├── Hero.jsx             # Hero section with trust badges and floating pill
│   │   ├── CertStrip.jsx        # Accreditations & certification banner
│   │   ├── Comparison.jsx       # Economics comparison table (brand owner vs partner)
│   │   ├── HowItWorks.jsx       # 6-step roadmap
│   │   ├── Benefits.jsx         # Program benefits & interactive portal preview
│   │   ├── Products.jsx         # Product catalog with lazy-loaded imagery
│   │   ├── Quality.jsx          # Quality control & lab-testing assurances
│   │   ├── Eligibility.jsx      # Trainer criteria & verification specs
│   │   ├── ApplicationForm.jsx  # Multi-part multipart application form with validations
│   │   ├── Faq.jsx              # Accessible accordion FAQ
│   │   ├── FinalCta.jsx         # Bottom conversion CTA
│   │   ├── Footer.jsx           # Legal info, contacts & address
│   │   └── common/
│   │       └── Icons.jsx        # Memoized SVG icon primitives
│   ├── constants/
│   │   └── content.js           # Centralized copy, comparison matrix, FAQs & links
│   └── services/
│       └── api.js               # Application submission service with timeout & error handling
```

## Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Run local development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Production build
```bash
npm run build
```
Generates an optimized bundle in `dist/`.

### 4. Preview production build
```bash
npm run preview
```

## Backend Configuration

Form submission is handled by `src/services/api.js`.
- It POSTs `multipart/form-data` to `/api/partner-applications` (or custom endpoint via `VITE_API_BASE_URL` in `.env`).
- Payload fields: `fullName`, `age`, `email`, `phone`, `address`, `city`, `state`, `pincode`, `certificationName`, `certifyingInstitute`, `certificationYear`, `experienceYears`, `certificate` (file), `photo` (file), `idType`, `idProof` (file), `activeClients`, `feePerClient`, `instagram`, `facebookOrYoutube`, `trainingMode`, `consent`.
