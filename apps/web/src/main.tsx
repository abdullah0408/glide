import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createLogger } from "@glide/shared";
import { App } from "./app";
import "./styles.css";

const logger = createLogger({ service: "web" });

window.addEventListener("error", (event) => {
  logger.error("uncaught browser error", {
    error: event.error,
    message: event.message
  });
});

window.addEventListener("unhandledrejection", (event) => {
  logger.error("unhandled promise rejection", {
    reason: event.reason
  });
});

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);
