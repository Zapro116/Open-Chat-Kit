import React, { createContext, useState, useContext } from "react";
import { initialSiteConfig } from "../utils/contants";

const SiteConfigContext = createContext();

export const useSiteConfig = () => useContext(SiteConfigContext);

export const SiteConfigProvider = ({ children }) => {
  const [siteConfig, setSiteConfig] = useState(initialSiteConfig);

  return (
    <SiteConfigContext.Provider value={{ siteConfig, setSiteConfig }}>
      {children}
    </SiteConfigContext.Provider>
  );
};
