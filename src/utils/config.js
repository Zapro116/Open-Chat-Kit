import React from "react";

/**
 * Configuration utility for loading app configuration from API endpoint
 * This replaces the previous window._conf approach for better security
 */

let configCache = null;
let configPromise = null;

/**
 * Fetch configuration from the server API endpoint
 * Uses caching to avoid multiple requests
 */
export const loadConfig = async () => {
  // Return cached config if available
  if (configCache) {
    return configCache;
  }

  // Return existing promise if already loading
  if (configPromise) {
    return configPromise;
  }

  // Start loading configuration
  configPromise = (async () => {
    try {
      const response = await fetch("/api/config", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        // Add credentials if needed for authentication
        credentials: "same-origin",
      });

      if (!response.ok) {
        throw new Error(
          `Failed to load configuration: ${response.status} ${response.statusText}`
        );
      }

      const config = await response.json();

      // Cache the configuration
      configCache = config;

      console.log("✅ Configuration loaded successfully");
      return config;
    } catch (error) {
      console.error("❌ Failed to load configuration:", error);

      // Fallback to default configuration in case of error
      const fallbackConfig = {
        ENV: "production",
        REACT_APP_BRAND_NAME: "Open Chat Kit",
        REACT_APP_PROJECTS_LABEL: "Projects",
        REACT_APP_EDIT_PROJECTS_LABEL: "Project",
        REACT_APP_PROJECTS_ROUTE: "project",
        REACT_APP_ENABLE_PROJECTS: true,
        REACT_APP_KNOWLEDGE_BASE_LABEL: "Knowledge Bases",
        REACT_APP_EDIT_KNOWLEDGE_BASE_LABEL: "Knowledge Base",
        REACT_APP_KNOWLEDGE_BASE_ROUTE: "knowledge",
        REACT_APP_ENABLE_KNOWLEDGE_BASES: true,
        REACT_APP_ENABLE_CHATS: true,
        REACT_APP_CHAT_ROUTE: "c",
        REACT_APP_ENABLE_HISTORY: true,
        REACT_APP_GOOGLE_ANALYTICS_ENABLE: false,
        REACT_APP_BASE_CEREBRUM_URL: "http://localhost:8081/",
        REACT_APP_BASE_LOCKSMIITH_URL: "http://localhost:8082/",
        REACT_APP_BASE_WAYNE_URL: "http://localhost:8083/",
      };

      configCache = fallbackConfig;
      return fallbackConfig;
    } finally {
      // Clear the promise so future calls can retry if needed
      configPromise = null;
    }
  })();

  return configPromise;
};

/**
 * Get a specific configuration value
 * @param {string} key - Configuration key
 * @param {*} defaultValue - Default value if key is not found
 */
export const getConfig = async (key, defaultValue = undefined) => {
  const config = await loadConfig();
  return config[key] !== undefined ? config[key] : defaultValue;
};

/**
 * Get all configuration
 */
export const getAllConfig = async () => {
  return await loadConfig();
};

/**
 * Clear configuration cache (useful for testing or forced refresh)
 */
export const clearConfigCache = () => {
  configCache = null;
  configPromise = null;
};

/**
 * Check if configuration is loaded
 */
export const isConfigLoaded = () => {
  return configCache !== null;
};

/**
 * React hook for using configuration
 * Usage: const config = useConfig();
 */
export const useConfig = () => {
  const [config, setConfig] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    loadConfig()
      .then((cfg) => {
        setConfig(cfg);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { config, loading, error };
};

// Legacy compatibility function for existing code that uses window._conf
export const getLegacyConfig = async () => {
  // Check if window._conf exists (for backward compatibility)
  if (typeof window !== "undefined" && window._conf) {
    console.warn(
      "⚠️ Using legacy window._conf configuration. Consider migrating to the new config API."
    );
    return window._conf;
  }

  // Fall back to API-based configuration
  return await loadConfig();
};
