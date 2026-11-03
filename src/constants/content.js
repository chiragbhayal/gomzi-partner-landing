/**
 * Site content constants, copy text, and asset references.
 * Centralizing data keeps components pure, decoupled, and easy to maintain/localize.
 */

import logo from "../assets/logo.jpg";
import hero from "../assets/hero.jpg";
import certs from "../assets/Seven Certification Logos Row.png";
import lineup from "../assets/lineup.jpg";
import imgWhey from "../assets/whey.jpg";
import imgPlant from "../assets/plant.jpg";
import imgMass from "../assets/mass.jpg";
import imgCreatine from "../assets/creatine.jpg";
import imgPreworkout from "../assets/preworkout.jpg";
import imgBcaa from "../assets/bcaa.jpg";
import imgFatburner from "../assets/fatburner.jpg";
import imgPeanut from "../assets/peanut.jpg";
import imgMulti from "../assets/multi.jpg";
import imgIngredients from "../assets/q1.jpg";
import imgLab from "../assets/q3.jpg";

export const ASSETS = {
  logo,
  hero,
  certs,
  lineup,
  imgIngredients,
  imgLab,
};

export const CONTACT = {
  phone: "+91 98752 70200",
  phoneHref: "tel:+919875270200",
  email: "info@ragnutrition.in",
  website: "https://www.ragnutrition.in",
  websiteLabel: "www.ragnutrition.in",
  address:
    "G-23, Time Square, Gaurav Path Road, beside Gajera Global School, Adajan, Pal Gam, Surat, Gujarat 394510",
};

export const COMPARISON = [
  ["Upfront investment", "Lakhs of rupees in bulk stock", "Zero capital commitment"],
  ["Purchase pricing tier", "Bulk volume rates only", "Manufacturing rate — direct to partner"],
  ["Inventory & storage", "Yours to warehouse & manage", "None — we hold & warehouse stock"],
  ["Order fulfillment", "Your own logistics & courier costs", "Pan-India delivery handled by GOMZI"],
  ["Licensing & lab tests", "Your legal responsibility", "Done — 100% licensed & lab-tested"],
];

export const STEPS = [
  {
    title: "Apply online",
    text: "Fill the short form with your details, certification, ID proof, client base and social links.",
  },
  {
    title: "Review in 24 hours",
    text: "We review your profile within 24 hours. You get a message with the result and a call from our team.",
  },
  {
    title: "Sign the agreement",
    text: "Once approved, sign the partner agreement, including confidentiality on pricing.",
  },
  {
    title: "Get your partner pricing",
    text: "We reveal your manufacturing-rate pricing — the same margin brand owners earn.",
  },
  {
    title: "Share your link & coupon",
    text: "Get your personal link and coupon code. Clients order online and get a discount.",
  },
  {
    title: "Track & earn",
    text: "Your partner portal shows your clients, new sign-ups and orders. We ship pan-India.",
  },
];

export const BENEFITS = [
  { title: "Brand-owner margins", text: "Buy at manufacturing rates, just like the brand owner." },
  { title: "Zero investment", text: "No bulk orders, no lakhs locked in stock." },
  { title: "Your own link & coupon", text: "Clients get a discount; you get credited for every order." },
  { title: "Partner portal", text: "See your clients, new joins and orders anytime." },
  { title: "Licensed & lab-tested", text: "Every product is certified and fully compliant." },
  { title: "Pan-India delivery", text: "We pack and ship to your clients anywhere in India." },
];

export const PRODUCTS = [
  { name: "Whey Protein Blend", note: "6 flavours", img: imgWhey },
  { name: "Plant Protein", note: "Clean, plant-based protein", img: imgPlant },
  { name: "Mass Gainer", note: "4 flavours", img: imgMass },
  { name: "ATP Creatine", note: "Micronised monohydrate", img: imgCreatine },
  { name: "Pre-Workout", note: "Focus, strength, energy", img: imgPreworkout },
  { name: "BCAA", note: "Recovery support", img: imgBcaa },
  { name: "Ignite Fat Burner", note: "Metabolic support", img: imgFatburner },
  { name: "Peanut Butter", note: "High protein, 3 flavours", img: imgPeanut },
  { name: "Apex Multivitamin", note: "Daily nutritional support", img: imgMulti },
];

export const QUALITY_POINTS = [
  { title: "Premium ingredients", text: "Carefully selected raw materials" },
  { title: "Advanced formulation", text: "Science-backed formulas" },
  { title: "Quality control", text: "Rigorous testing at every step" },
  { title: "Lab-tested & licensed", text: "Reports available on request" },
];

export const ELIGIBILITY = [
  { title: "Certified fitness trainer", text: "A recognised fitness or nutrition certification" },
  { title: "Active client base", text: "Clients you currently train, online or offline" },
  { title: "Good experience & knowledge", text: "A track record of guiding clients well" },
  { title: "Valid ID & social presence", text: "Government ID plus Instagram, Facebook or YouTube" },
];

export const FAQS = [
  {
    q: "Do I need to invest any money or buy stock?",
    a: "No. There is no bulk purchase and no inventory. We hold the stock and ship directly to your clients.",
  },
  {
    q: "How much margin will I earn?",
    a: "You get manufacturing-rate pricing — the same margin a supplement brand owner earns after investing in bulk stock. Exact pricing is shared after approval and a signed confidentiality agreement.",
  },
  {
    q: "Why is pricing shared only after approval?",
    a: "Partner pricing is confidential. We reveal it only to verified, approved trainers who have signed the partner agreement.",
  },
  {
    q: "How do my clients order?",
    a: "They order online on our website using your personal link or coupon code. Your clients get a discount, and every order is credited to you.",
  },
  {
    q: "How long does approval take?",
    a: "We review every profile within 24 hours. You will receive a message with the result and a call from our team.",
  },
  {
    q: "Do you deliver all over India?",
    a: "Yes. We deliver to your clients anywhere in India.",
  },
  {
    q: "Are the products certified and safe?",
    a: "Yes. All GOMZI products are licensed and lab-tested, manufactured to certified quality standards.",
  },
];

