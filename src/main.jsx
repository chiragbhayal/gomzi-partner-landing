import React from "react";
import ReactDOM from "react-dom/client";
import GomziPartnerLanding from "./GomziPartnerLanding";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Failed to find root element with id 'root'. Check index.html.");
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <GomziPartnerLanding />
  </React.StrictMode>
);

