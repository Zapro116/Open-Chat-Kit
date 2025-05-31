import React from "react";
import { IconPhoto, IconUserCircle } from "@tabler/icons-react";
import { SETTINGS_ROUTE } from "./apiEndpoints";
const { conf } = require("../../config");

// Get configuration from convict
const BROWSER_CONFIG = conf.get("BROWSER_CONFIG");

console.log("BROWSER_CONFIG", BROWSER_CONFIG);

// Default configuration values
const DEFAULT_CONFIG = {
  BRAND_NAME: "Rimberio School",
  LOGO_URL:
    "https://marketplace.canva.com/EAGUe-CYFgU/1/0/1600w/canva-grey-orange-modern-circle-class-logo-Aro9ea9TDP4.jpg",
  PROJECT_LABEL: "Projects",
  PROJECT_EDIT_LABEL: "Project",
  PROJECT_ROUTE: "project",
  ENABLE_PROJECTS: false,
  KNOWLEDGE_BASE_LABEL: "Knowledge Bases",
  KNOWLEDGE_BASE_EDIT_LABEL: "Knowledge Base",
  KNOWLEDGE_BASE_ROUTE: "knowledge",
  ENABLE_KNOWLEDGE_BASES: false,
  ENABLE_HISTORY: false,
  ENABLE_CHATS: false,
  GOOGLE_ANALYTICS_ENABLE: false,
  GOOGLE_ANALYTICS_CODE: "",
  CHAT_ROUTE: "chat",
};

// Generate the site configuration using convict config
export const initialSiteConfig = {
  BRAND_NAME: BROWSER_CONFIG.REACT_APP_BRAND_NAME || DEFAULT_CONFIG.BRAND_NAME,
  LOGO_URL: BROWSER_CONFIG.REACT_APP_LOGO_URL || DEFAULT_CONFIG.LOGO_URL,
  PROJECT_LABEL:
    BROWSER_CONFIG.REACT_APP_PROJECTS_LABEL || DEFAULT_CONFIG.PROJECT_LABEL,
  PROJECT_EDIT_LABEL:
    BROWSER_CONFIG.REACT_APP_EDIT_PROJECTS_LABEL ||
    DEFAULT_CONFIG.PROJECT_EDIT_LABEL,
  PROJECT_ROUTE:
    BROWSER_CONFIG.REACT_APP_PROJECTS_ROUTE || DEFAULT_CONFIG.PROJECT_ROUTE,
  ENABLE_PROJECTS: BROWSER_CONFIG.REACT_APP_ENABLE_PROJECTS,
  KNOWLEDGE_BASE_LABEL:
    BROWSER_CONFIG.REACT_APP_KNOWLEDGE_BASE_LABEL ||
    DEFAULT_CONFIG.KNOWLEDGE_BASE_LABEL,
  KNOWLEDGE_BASE_EDIT_LABEL:
    BROWSER_CONFIG.REACT_APP_EDIT_KNOWLEDGE_BASE_LABEL ||
    DEFAULT_CONFIG.KNOWLEDGE_BASE_EDIT_LABEL,
  KNOWLEDGE_BASE_ROUTE:
    BROWSER_CONFIG.REACT_APP_KNOWLEDGE_BASE_ROUTE ||
    DEFAULT_CONFIG.KNOWLEDGE_BASE_ROUTE,
  ENABLE_KNOWLEDGE_BASES: BROWSER_CONFIG.REACT_APP_ENABLE_KNOWLEDGE_BASES,
  ENABLE_HISTORY: BROWSER_CONFIG.REACT_APP_ENABLE_HISTORY,
  ENABLE_CHATS: BROWSER_CONFIG.REACT_APP_ENABLE_CHATS,
  GOOGLE_ANALYTICS_ENABLE: BROWSER_CONFIG.REACT_APP_GOOGLE_ANALYTICS_ENABLE,
  GOOGLE_ANALYTICS_CODE:
    BROWSER_CONFIG.REACT_APP_GOOGLE_ANALYTICS_CODE ||
    DEFAULT_CONFIG.GOOGLE_ANALYTICS_CODE,
  CHAT_ROUTE: BROWSER_CONFIG.REACT_APP_CHAT_ROUTE || DEFAULT_CONFIG.CHAT_ROUTE,
};

// Export default config for reference
export const defaultConfig = DEFAULT_CONFIG;

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

// API URLs from convict config
export const CEREBRUM_BASE_URL =
  BROWSER_CONFIG.REACT_APP_BASE_CEREBRUM_URL || "http://localhost:8081/";
export const LOCKSMITH_BASE_URL =
  BROWSER_CONFIG.REACT_APP_BASE_LOCKSMIITH_URL || "http://localhost:8082/";
export const WAYNE_BASE_URL =
  BROWSER_CONFIG.REACT_APP_BASE_WAYNE_URL || "http://localhost:8083/";
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
