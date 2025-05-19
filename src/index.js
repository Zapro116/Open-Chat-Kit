import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "core-js/stable";
import "regenerator-runtime/runtime";
import "./index.scss";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);

const renderApp = (Component) => {
  root.render(
    <MantineProvider>
      <Component />
    </MantineProvider>
  );
};

// Initial render
renderApp(App);

// Hot Module Replacement (HMR) setup
if (module.hot) {
  module.hot.accept("./App", () => {
    const NextApp = require("./App").default;
    renderApp(NextApp);
  });
}
