import React from "react";
import { useConfig } from "../utils/config";

/**
 * Example component demonstrating the new secure configuration system
 * This replaces the old window._conf approach
 */
const ConfigExample = () => {
  const { config, loading, error } = useConfig();

  if (loading) {
    return (
      <div className="config-loading">
        <div className="spinner"></div>
        <p>Loading application configuration...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="config-error">
        <h3>Configuration Error</h3>
        <p>Failed to load application configuration: {error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  return (
    <div className="config-example">
      <h2>Application Configuration</h2>
      <div className="config-grid">
        {/* Brand Information */}
        <div className="config-section">
          <h3>Brand Settings</h3>
          <div className="config-item">
            <strong>Brand Name:</strong>{" "}
            {config.REACT_APP_BRAND_NAME || "Not Set"}
          </div>
          {config.REACT_APP_LOGO_URL && (
            <div className="config-item">
              <strong>Logo:</strong>
              <img
                src={config.REACT_APP_LOGO_URL}
                alt="Brand Logo"
                style={{
                  maxWidth: "100px",
                  height: "auto",
                  marginLeft: "10px",
                }}
              />
            </div>
          )}
        </div>

        {/* Feature Toggles */}
        <div className="config-section">
          <h3>Feature Settings</h3>
          <div className="config-item">
            <strong>Projects Enabled:</strong>
            <span
              className={`status ${
                config.REACT_APP_ENABLE_PROJECTS ? "enabled" : "disabled"
              }`}
            >
              {config.REACT_APP_ENABLE_PROJECTS ? "Yes" : "No"}
            </span>
          </div>
          <div className="config-item">
            <strong>Knowledge Bases Enabled:</strong>
            <span
              className={`status ${
                config.REACT_APP_ENABLE_KNOWLEDGE_BASES ? "enabled" : "disabled"
              }`}
            >
              {config.REACT_APP_ENABLE_KNOWLEDGE_BASES ? "Yes" : "No"}
            </span>
          </div>
          <div className="config-item">
            <strong>Chats Enabled:</strong>
            <span
              className={`status ${
                config.REACT_APP_ENABLE_CHATS ? "enabled" : "disabled"
              }`}
            >
              {config.REACT_APP_ENABLE_CHATS ? "Yes" : "No"}
            </span>
          </div>
          <div className="config-item">
            <strong>History Enabled:</strong>
            <span
              className={`status ${
                config.REACT_APP_ENABLE_HISTORY ? "enabled" : "disabled"
              }`}
            >
              {config.REACT_APP_ENABLE_HISTORY ? "Yes" : "No"}
            </span>
          </div>
        </div>

        {/* Navigation Labels */}
        <div className="config-section">
          <h3>Navigation Labels</h3>
          <div className="config-item">
            <strong>Projects Label:</strong>{" "}
            {config.REACT_APP_PROJECTS_LABEL || "Projects"}
          </div>
          <div className="config-item">
            <strong>Knowledge Base Label:</strong>{" "}
            {config.REACT_APP_KNOWLEDGE_BASE_LABEL || "Knowledge Bases"}
          </div>
        </div>

        {/* Routes */}
        <div className="config-section">
          <h3>Route Configuration</h3>
          <div className="config-item">
            <strong>Projects Route:</strong> /
            {config.REACT_APP_PROJECTS_ROUTE || "project"}
          </div>
          <div className="config-item">
            <strong>Knowledge Base Route:</strong> /
            {config.REACT_APP_KNOWLEDGE_BASE_ROUTE || "knowledge"}
          </div>
          <div className="config-item">
            <strong>Chat Route:</strong> /{config.REACT_APP_CHAT_ROUTE || "c"}
          </div>
        </div>

        {/* Service URLs */}
        <div className="config-section">
          <h3>Service URLs</h3>
          <div className="config-item">
            <strong>Cerebrum URL:</strong>
            <code>
              {config.REACT_APP_BASE_CEREBRUM_URL || "Not configured"}
            </code>
          </div>
          <div className="config-item">
            <strong>Locksmith URL:</strong>
            <code>
              {config.REACT_APP_BASE_LOCKSMIITH_URL || "Not configured"}
            </code>
          </div>
          <div className="config-item">
            <strong>Wayne URL:</strong>
            <code>{config.REACT_APP_BASE_WAYNE_URL || "Not configured"}</code>
          </div>
        </div>

        {/* Analytics */}
        <div className="config-section">
          <h3>Analytics</h3>
          <div className="config-item">
            <strong>Google Analytics:</strong>
            <span
              className={`status ${
                config.REACT_APP_GOOGLE_ANALYTICS_ENABLE
                  ? "enabled"
                  : "disabled"
              }`}
            >
              {config.REACT_APP_GOOGLE_ANALYTICS_ENABLE
                ? "Enabled"
                : "Disabled"}
            </span>
          </div>
          {config.REACT_APP_GOOGLE_ANALYTICS_ENABLE &&
            config.REACT_APP_GOOGLE_ANALYTICS_CODE && (
              <div className="config-item">
                <strong>Tracking Code:</strong>
                <code>{config.REACT_APP_GOOGLE_ANALYTICS_CODE}</code>
              </div>
            )}
        </div>

        {/* Environment */}
        <div className="config-section">
          <h3>Environment</h3>
          <div className="config-item">
            <strong>Environment:</strong>
            <span className={`env-badge env-${config.ENV}`}>
              {config.ENV || "production"}
            </span>
          </div>
        </div>
      </div>

      {/* Security Note */}
      <div className="security-note">
        <h4>🔒 Security Information</h4>
        <p>
          Configuration is now loaded securely via API endpoint instead of being
          exposed in the DOM. This prevents sensitive information from being
          visible in the browser's view source.
        </p>
        <p>
          <strong>Note:</strong> Only public configuration values are exposed to
          the frontend. Sensitive server-side configuration remains secure on
          the server.
        </p>
      </div>
    </div>
  );
};

export default ConfigExample;
