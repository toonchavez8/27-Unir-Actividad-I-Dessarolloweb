import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/css/Global.css"; // Importing CSS module

import App from "@/App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
