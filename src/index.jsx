import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles/tailwind.css";
import "./styles/index.css";

// Optional: Sentry monitoring (loaded only if DSN and package available)
if (import.meta.env?.VITE_SENTRY_DSN) {
  const sentryPkg = '@sentry/react';
  // Use dynamic string to avoid eager bundler resolution if package is missing
  import(sentryPkg)
    .then((Sentry) => {
      const dsn = import.meta.env?.VITE_SENTRY_DSN;
      Sentry.init({
        dsn,
        integrations: [
          Sentry.browserTracingIntegration?.(),
          Sentry.replayIntegration?.(),
        ].filter(Boolean),
        tracesSampleRate: Number(import.meta.env?.VITE_SENTRY_TRACES_SAMPLE_RATE || 0.1),
        replaysSessionSampleRate: Number(import.meta.env?.VITE_SENTRY_REPLAYS_SESSION_SAMPLE_RATE || 0.05),
        replaysOnErrorSampleRate: Number(import.meta.env?.VITE_SENTRY_REPLAYS_ERROR_SAMPLE_RATE || 1.0)
      });
    })
    .catch(() => {
      // Sentry not installed; skip silently
    });
}

const container = document.getElementById("root");
const root = createRoot(container);

root.render(<App />);
