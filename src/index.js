import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "core-js/stable";
import "./index.scss";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import { ClerkProvider } from "@clerk/clerk-react";
import { SiteConfigProvider } from "./contexts/SiteConfigContext";
import { initGA } from "./utils/analytics";
import { Notifications } from "@mantine/notifications";

const PUBLISHABLE_KEY = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Clerk Publishable Key");
}

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);

const renderApp = (AppComponent) => {
  root.render(
    <React.StrictMode>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
        <MantineProvider>
          <SiteConfigProvider>
            <Notifications />
            <AppComponent />
          </SiteConfigProvider>
        </MantineProvider>
      </ClerkProvider>
    </React.StrictMode>
  );
};

initGA();

// Initial render
renderApp(App);

// Hot Module Replacement (HMR) setup
if (module.hot) {
  module.hot.accept("./App", () => {
    const NextApp = require("./App").default;
    renderApp(NextApp);
  });
}
