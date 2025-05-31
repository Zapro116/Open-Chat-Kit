const convict = require("convict");
const _ = require("lodash");

// Define a schema
const conf = convict({
  BROWSER_CONFIG: {
    ENV: {
      doc: "Application environment",
      format: String,
      default: "production",
      env: "ENV",
      arg: "env",
    },
    PORT: {
      doc: "The application port",
      format: "port",
      default: 4000,
      env: "PORT",
    },
    REACT_APP_CLERK_PUBLISHABLE_KEY: {
      doc: "Clerk publishable key",
      format: String,
      default: "",
      env: "REACT_APP_CLERK_PUBLISHABLE_KEY",
    },
    REACT_APP_LOGO_URL: {
      doc: "Application logo URL",
      format: String,
      default: "",
      env: "REACT_APP_LOGO_URL",
    },
    REACT_APP_BRAND_NAME: {
      doc: "Application brand name",
      format: String,
      default: "",
      env: "REACT_APP_BRAND_NAME",
    },
    REACT_APP_PROJECTS_LABEL: {
      doc: "Projects section label",
      format: String,
      default: "Projects",
      env: "REACT_APP_PROJECTS_LABEL",
    },
    REACT_APP_EDIT_PROJECTS_LABEL: {
      doc: "Edit projects label",
      format: String,
      default: "Project",
      env: "REACT_APP_EDIT_PROJECTS_LABEL",
    },
    REACT_APP_PROJECTS_ROUTE: {
      doc: "Projects route path",
      format: String,
      default: "project",
      env: "REACT_APP_PROJECTS_ROUTE",
    },
    REACT_APP_ENABLE_PROJECTS: {
      doc: "Enable projects feature",
      format: Boolean,
      default: true,
      env: "REACT_APP_ENABLE_PROJECTS",
    },
    REACT_APP_KNOWLEDGE_BASE_LABEL: {
      doc: "Knowledge base section label",
      format: String,
      default: "KBs",
      env: "REACT_APP_KNOWLEDGE_BASE_LABEL",
    },
    REACT_APP_EDIT_KNOWLEDGE_BASE_LABEL: {
      doc: "Edit knowledge base label",
      format: String,
      default: "Knowledge Base",
      env: "REACT_APP_EDIT_KNOWLEDGE_BASE_LABEL",
    },
    REACT_APP_KNOWLEDGE_BASE_ROUTE: {
      doc: "Knowledge base route path",
      format: String,
      default: "knowledge",
      env: "REACT_APP_KNOWLEDGE_BASE_ROUTE",
    },
    REACT_APP_ENABLE_KNOWLEDGE_BASES: {
      doc: "Enable knowledge bases feature",
      format: Boolean,
      default: true,
      env: "REACT_APP_ENABLE_KNOWLEDGE_BASES",
    },
    REACT_APP_ENABLE_CHATS: {
      doc: "Enable chats feature",
      format: Boolean,
      default: true,
      env: "REACT_APP_ENABLE_CHATS",
    },
    REACT_APP_CHAT_ROUTE: {
      doc: "Chat route path",
      format: String,
      default: "c",
      env: "REACT_APP_CHAT_ROUTE",
    },
    REACT_APP_ENABLE_HISTORY: {
      doc: "Enable history feature",
      format: Boolean,
      default: true,
      env: "REACT_APP_ENABLE_HISTORY",
    },
    REACT_APP_GOOGLE_ANALYTICS_ENABLE: {
      doc: "Enable Google Analytics",
      format: Boolean,
      default: false,
      env: "REACT_APP_GOOGLE_ANALYTICS_ENABLE",
    },
    REACT_APP_GOOGLE_ANALYTICS_CODE: {
      doc: "Google Analytics tracking code",
      format: String,
      default: "",
      env: "REACT_APP_GOOGLE_ANALYTICS_CODE",
    },
    REACT_APP_BASE_CEREBRUM_URL: {
      doc: "Base URL for Cerebrum service",
      format: String,
      default: "http://localhost:8081/",
      env: "REACT_APP_BASE_CEREBRUM_URL",
    },
    REACT_APP_BASE_LOCKSMIITH_URL: {
      doc: "Base URL for Locksmith service",
      format: String,
      default: "http://localhost:8082/",
      env: "REACT_APP_BASE_LOCKSMIITH_URL",
    },
    REACT_APP_BASE_WAYNE_URL: {
      doc: "Base URL for Wayne service",
      format: String,
      default: "http://localhost:8083/",
      env: "REACT_APP_BASE_WAYNE_URL",
    },
    PROXY_TARGET: {
      doc: "Proxy target URL",
      format: String,
      default: "https://webflow.fynix.ai",
      env: "PROXY_TARGET",
    },
    PROXY_HOST: {
      doc: "Proxy host header",
      format: String,
      default: "webflow.fynix.ai",
      env: "PROXY_HOST",
    },
    PROXY_REFERER: {
      doc: "Proxy referer header",
      format: String,
      default: "https://webflow.fynix.ai/",
      env: "PROXY_REFERER",
    },
  },
});

// Load environment dependent configuration
conf.load({ BROWSER_CONFIG: { ENV: process.env.ENV || "production" } });

// Validate configuration
try {
  conf.validate({ allowed: "strict" });
} catch (err) {
  console.error("Configuration validation error:", err);
  process.exit(1);
}

// Extend configuration with getter
_.extend(conf, conf.get());

// Export get function for backward compatibility
const get = () => {
  return { BROWSER_CONFIG: conf.get("BROWSER_CONFIG") };
};

module.exports = { get, conf };
