import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "core-js/stable";
import "regenerator-runtime/runtime";
import "./index.scss";

// Hot Module Replacement (HMR) setup
if (module.hot) {
  module.hot.accept("./App", () => {
    const NextApp = require("./App").default;
    render(NextApp);
  });
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
