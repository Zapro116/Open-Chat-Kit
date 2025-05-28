import ReactGA from "react-ga4";
import { initialSiteConfig } from "./contants";

export const initGA = () => {
  if (initialSiteConfig.GOOGLE_ANALYTICS_ENABLE) {
    ReactGA.initialize(initialSiteConfig.GOOGLE_ANALYTICS_CODE);
  }
};

export const logPageView = () => {
  if (initialSiteConfig.GOOGLE_ANALYTICS_ENABLE) {
    ReactGA.send({ hitType: "pageview", page: window.location.pathname });
  }
};

export const logEvent = (event) => {
  if (initialSiteConfig.GOOGLE_ANALYTICS_ENABLE) {
    ReactGA.event(event);
  }
};
