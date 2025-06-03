import React from "react";
import { IconPhoto, IconUserCircle } from "@tabler/icons-react";
import { SETTINGS_ROUTE } from "./apiEndpoints";

// Helper function to get environment variables
// In development, webpack replaces process.env.REACT_APP_* with actual values at build time
// In production, we use window._conf injected by the server
const getEnvVar = (envKey, defaultValue = "") => {
  // Check production mode first - server-injected config via window._conf
  if (
    typeof window !== "undefined" &&
    window._conf &&
    window._conf[envKey] !== undefined &&
    window._conf[envKey] !== ""
  ) {
    return window._conf[envKey];
  }

  // For development mode, directly access process.env
  // Webpack will replace these with actual values at build time
  let value = defaultValue;
  switch (envKey) {
    case "REACT_APP_BRAND_NAME":
      value = process.env.REACT_APP_BRAND_NAME || defaultValue;
      break;
    case "REACT_APP_LOGO_URL":
      value = process.env.REACT_APP_LOGO_URL || defaultValue;
      break;
    case "REACT_APP_PROJECTS_LABEL":
      value = process.env.REACT_APP_PROJECTS_LABEL || defaultValue;
      break;
    case "REACT_APP_EDIT_PROJECTS_LABEL":
      value = process.env.REACT_APP_EDIT_PROJECTS_LABEL || defaultValue;
      break;
    case "REACT_APP_PROJECTS_ROUTE":
      value = process.env.REACT_APP_PROJECTS_ROUTE || defaultValue;
      break;
    case "REACT_APP_ENABLE_PROJECTS":
      value = process.env.REACT_APP_ENABLE_PROJECTS || defaultValue;
      break;
    case "REACT_APP_KNOWLEDGE_BASE_LABEL":
      value = process.env.REACT_APP_KNOWLEDGE_BASE_LABEL || defaultValue;
      break;
    case "REACT_APP_EDIT_KNOWLEDGE_BASE_LABEL":
      value = process.env.REACT_APP_EDIT_KNOWLEDGE_BASE_LABEL || defaultValue;
      break;
    case "REACT_APP_KNOWLEDGE_BASE_ROUTE":
      value = process.env.REACT_APP_KNOWLEDGE_BASE_ROUTE || defaultValue;
      break;
    case "REACT_APP_ENABLE_KNOWLEDGE_BASES":
      value = process.env.REACT_APP_ENABLE_KNOWLEDGE_BASES || defaultValue;
      break;
    case "REACT_APP_ENABLE_HISTORY":
      value = process.env.REACT_APP_ENABLE_HISTORY || defaultValue;
      break;
    case "REACT_APP_ENABLE_CHATS":
      value = process.env.REACT_APP_ENABLE_CHATS || defaultValue;
      break;
    case "REACT_APP_GOOGLE_ANALYTICS_ENABLE":
      value = process.env.REACT_APP_GOOGLE_ANALYTICS_ENABLE || defaultValue;
      break;
    case "REACT_APP_GOOGLE_ANALYTICS_CODE":
      value = process.env.REACT_APP_GOOGLE_ANALYTICS_CODE || defaultValue;
      break;
    case "REACT_APP_CHAT_ROUTE":
      value = process.env.REACT_APP_CHAT_ROUTE || defaultValue;
      break;
    case "REACT_APP_BASE_CEREBRUM_URL":
      value = process.env.REACT_APP_BASE_CEREBRUM_URL || defaultValue;
      break;
    case "REACT_APP_BASE_LOCKSMIITH_URL":
      value = process.env.REACT_APP_BASE_LOCKSMIITH_URL || defaultValue;
      break;
    case "REACT_APP_BASE_WAYNE_URL":
      value = process.env.REACT_APP_BASE_WAYNE_URL || defaultValue;
      break;
    default:
      value = defaultValue;
  }

  return value;
};

// Helper function to parse boolean values
const parseBoolean = (value) => {
  if (typeof value === "boolean") return value;
  if (typeof value === "string") {
    return value.toLowerCase() === "true" || value === "1";
  }
  return false;
};

// Generate the site configuration using environment variables
export const initialSiteConfig = {
  BRAND_NAME: getEnvVar("REACT_APP_BRAND_NAME", "FEX Platform"),
  LOGO_URL: getEnvVar(
    "REACT_APP_LOGO_URL",
    "https://marketplace.canva.com/EAGUe-CYFgU/1/0/1600w/canva-grey-orange-modern-circle-class-logo-Aro9ea9TDP4.jpg"
  ),
  PROJECT_LABEL: getEnvVar("REACT_APP_PROJECTS_LABEL", "Projects"),
  PROJECT_EDIT_LABEL: getEnvVar("REACT_APP_EDIT_PROJECTS_LABEL", "Project"),
  PROJECT_ROUTE: getEnvVar("REACT_APP_PROJECTS_ROUTE", "project"),
  ENABLE_PROJECTS: parseBoolean(getEnvVar("REACT_APP_ENABLE_PROJECTS", "true")),
  KNOWLEDGE_BASE_LABEL: getEnvVar(
    "REACT_APP_KNOWLEDGE_BASE_LABEL",
    "Knowledge Bases"
  ),
  KNOWLEDGE_BASE_EDIT_LABEL: getEnvVar(
    "REACT_APP_EDIT_KNOWLEDGE_BASE_LABEL",
    "Knowledge Base"
  ),
  KNOWLEDGE_BASE_ROUTE: getEnvVar(
    "REACT_APP_KNOWLEDGE_BASE_ROUTE",
    "knowledge"
  ),
  ENABLE_KNOWLEDGE_BASES: parseBoolean(
    getEnvVar("REACT_APP_ENABLE_KNOWLEDGE_BASES", "true")
  ),
  ENABLE_HISTORY: parseBoolean(getEnvVar("REACT_APP_ENABLE_HISTORY", "true")),
  ENABLE_CHATS: parseBoolean(getEnvVar("REACT_APP_ENABLE_CHATS", "true")),
  GOOGLE_ANALYTICS_ENABLE: parseBoolean(
    getEnvVar("REACT_APP_GOOGLE_ANALYTICS_ENABLE", "false")
  ),
  GOOGLE_ANALYTICS_CODE: getEnvVar("REACT_APP_GOOGLE_ANALYTICS_CODE", ""),
  CHAT_ROUTE: getEnvVar("REACT_APP_CHAT_ROUTE", "chat"),
};

// Export individual constants
export const BRAND_NAME = initialSiteConfig.BRAND_NAME;
export const LOGO_URL = initialSiteConfig.LOGO_URL;

export const PROJECT_LABEL = initialSiteConfig.PROJECT_LABEL;
export const PROJECT_EDIT_LABEL = initialSiteConfig.PROJECT_EDIT_LABEL;
export const PROJECT_ROUTE = initialSiteConfig.PROJECT_ROUTE;
export const ENABLE_PROJECTS = initialSiteConfig.ENABLE_PROJECTS;

export const KNOWLEDGE_BASE_LABEL = initialSiteConfig.KNOWLEDGE_BASE_LABEL;
export const KNOWLEDGE_BASE_EDIT_LABEL =
  initialSiteConfig.KNOWLEDGE_BASE_EDIT_LABEL;
export const KNOWLEDGE_BASE_ROUTE = initialSiteConfig.KNOWLEDGE_BASE_ROUTE;
export const ENABLE_KNOWLEDGE_BASES = initialSiteConfig.ENABLE_KNOWLEDGE_BASES;
export const CHAT_ROUTE = initialSiteConfig.CHAT_ROUTE;

export const ENABLE_HISTORY = initialSiteConfig.ENABLE_HISTORY;
export const ENABLE_CHATS = initialSiteConfig.ENABLE_CHATS;

// API URLs from environment variables
export const CEREBRUM_BASE_URL = getEnvVar(
  "REACT_APP_BASE_CEREBRUM_URL",
  "http://localhost:8081/"
);
export const LOCKSMITH_BASE_URL = getEnvVar(
  "REACT_APP_BASE_LOCKSMIITH_URL",
  "http://localhost:8082/"
);
export const WAYNE_BASE_URL = getEnvVar(
  "REACT_APP_BASE_WAYNE_URL",
  "http://localhost:8083/"
);

export const DEFAULT_CLERK_TEMPLATE = "neon2";

export const DEFAULT_LIMIT_TOKEN_STATUS_CODE = 4029;

export const PROFILE_PROFILE_DROPDOWN_TAB = {
  title: "PROFILE",
  items: [
    {
      icon: <IconUserCircle color="var(--title-text-color)" size={20} />,
      label: "Settings",
      color: "var(--title-text-color)",
      href: SETTINGS_ROUTE,
    },
  ],
};

export const getStandardImageUploadAction = (overrideProps = {}) => ({
  id: "upload-image",
  actionType: "imageUpload",
  icon: IconPhoto,
  tooltip: "Upload Image",
  position: "left",
  ...overrideProps,
});

export const ASSISTANT_ROLE = "assistant";
export const USER_ROLE = "user";
export const DEFAULT_MODEL_SLUG_NAME = "gpt-4o";
export const DEFAULT_PRODUCT_NAME = "co_pilot";

export const PLANS_PRICING_ROUTE = "/plans-pricing";

export const PRODUCT_LABEL = "co_pilot";
