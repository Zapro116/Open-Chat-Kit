/**
 * Security Configuration Module
 * Handles API access control and configuration filtering
 */

const rateLimit = require("express-rate-limit");

// Rate limiting configurations
const createRateLimiter = (windowMs, max, message) => {
  return rateLimit({
    windowMs,
    max,
    message: {
      error: "Rate limit exceeded",
      message,
      retryAfter: Math.ceil(windowMs / 1000),
    },
    standardHeaders: true,
    legacyHeaders: false,
    skip: (req) => {
      // Skip rate limiting for health checks
      return req.path.startsWith("/_health") || req.path.startsWith("/_ready");
    },
  });
};

// Rate limiters
const configRateLimit = createRateLimiter(
  60 * 1000, // 1 minute window
  5, // 5 requests per window
  "Configuration access is rate limited for security"
);

const apiRateLimit = createRateLimiter(
  15 * 60 * 1000, // 15 minute window
  100, // 100 requests per window
  "API access is rate limited"
);

// Security middleware for configuration endpoint
const configSecurityMiddleware = (BROWSER_CONFIG) => {
  return (req, res, next) => {
    const clientIP = req.ip || req.connection.remoteAddress || "unknown";
    const userAgent = req.get("User-Agent") || "";
    const referer = req.get("Referer") || "";
    const origin = req.get("Origin") || "";
    const isProduction = BROWSER_CONFIG.ENV === "production";

    // Log all config access attempts
    console.log(
      `🔍 Config access: IP=${clientIP}, ENV=${
        BROWSER_CONFIG.ENV
      }, UA=${userAgent.slice(0, 30)}...`
    );

    // Security checks for production environment
    if (isProduction) {
      // Block common automated tools
      const blockedUAs = [
        "curl/",
        "wget/",
        "python-requests/",
        "postman",
        "insomnia",
        "httpie/",
        "go-http-client/",
        "java/",
        "php/",
        "ruby/",
      ];

      const isBlocked = blockedUAs.some((blocked) =>
        userAgent.toLowerCase().includes(blocked.toLowerCase())
      );

      if (isBlocked) {
        console.warn(
          `❌ Config access blocked: Automated tool detected - ${userAgent.slice(
            0,
            50
          )}`
        );
        return res.status(403).json({
          error: "Access Denied",
          message: "Configuration access not available for automated tools",
          code: "AUTOMATED_ACCESS_BLOCKED",
        });
      }

      // Validate origin for CORS requests
      if (origin) {
        const allowedOrigins = [
          `http://localhost:${BROWSER_CONFIG.PORT}`,
          `https://localhost:${BROWSER_CONFIG.PORT}`,
          // Add production domains here
        ];

        const isAllowedOrigin = allowedOrigins.some(
          (allowed) => origin === allowed || origin.startsWith(allowed)
        );

        if (!isAllowedOrigin) {
          console.warn(
            `❌ Config access blocked: Unauthorized origin - ${origin}`
          );
          return res.status(403).json({
            error: "Access Denied",
            message: "Configuration access not allowed from this origin",
            code: "ORIGIN_NOT_ALLOWED",
          });
        }
      }
    }

    // Add security headers
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("X-Frame-Options", "DENY");
    res.setHeader(
      "Cache-Control",
      "private, no-cache, no-store, must-revalidate"
    );

    next();
  };
};

// Configuration filtering based on environment and request context
const getSecureConfig = (BROWSER_CONFIG, req) => {
  const clientIP = req.ip || req.connection.remoteAddress || "";
  const isLocalhost =
    ["127.0.0.1", "::1", "::ffff:127.0.0.1"].includes(clientIP) ||
    clientIP.includes("127.0.0.1") ||
    clientIP.includes("localhost");
  const isDevelopment = ["dev", "development", "local"].includes(
    BROWSER_CONFIG.ENV?.toLowerCase()
  );

  // Base configuration (always safe to expose)
  const baseConfig = {
    ENV: BROWSER_CONFIG.ENV,
    REACT_APP_BRAND_NAME: BROWSER_CONFIG.REACT_APP_BRAND_NAME,
    REACT_APP_PROJECTS_LABEL: BROWSER_CONFIG.REACT_APP_PROJECTS_LABEL,
    REACT_APP_EDIT_PROJECTS_LABEL: BROWSER_CONFIG.REACT_APP_EDIT_PROJECTS_LABEL,
    REACT_APP_PROJECTS_ROUTE: BROWSER_CONFIG.REACT_APP_PROJECTS_ROUTE,
    REACT_APP_ENABLE_PROJECTS: BROWSER_CONFIG.REACT_APP_ENABLE_PROJECTS,
    REACT_APP_KNOWLEDGE_BASE_LABEL:
      BROWSER_CONFIG.REACT_APP_KNOWLEDGE_BASE_LABEL,
    REACT_APP_EDIT_KNOWLEDGE_BASE_LABEL:
      BROWSER_CONFIG.REACT_APP_EDIT_KNOWLEDGE_BASE_LABEL,
    REACT_APP_KNOWLEDGE_BASE_ROUTE:
      BROWSER_CONFIG.REACT_APP_KNOWLEDGE_BASE_ROUTE,
    REACT_APP_ENABLE_KNOWLEDGE_BASES:
      BROWSER_CONFIG.REACT_APP_ENABLE_KNOWLEDGE_BASES,
    REACT_APP_ENABLE_CHATS: BROWSER_CONFIG.REACT_APP_ENABLE_CHATS,
    REACT_APP_CHAT_ROUTE: BROWSER_CONFIG.REACT_APP_CHAT_ROUTE,
    REACT_APP_ENABLE_HISTORY: BROWSER_CONFIG.REACT_APP_ENABLE_HISTORY,
  };

  // Additional configuration for development or localhost
  if (isDevelopment || isLocalhost) {
    return {
      ...baseConfig,
      REACT_APP_LOGO_URL: BROWSER_CONFIG.REACT_APP_LOGO_URL,
      // Only include API key in development
      ...(isDevelopment && {
        REACT_APP_CLERK_PUBLISHABLE_KEY:
          BROWSER_CONFIG.REACT_APP_CLERK_PUBLISHABLE_KEY,
        REACT_APP_GOOGLE_ANALYTICS_ENABLE:
          BROWSER_CONFIG.REACT_APP_GOOGLE_ANALYTICS_ENABLE,
        REACT_APP_GOOGLE_ANALYTICS_CODE:
          BROWSER_CONFIG.REACT_APP_GOOGLE_ANALYTICS_CODE,
      }),
      // Service URLs only for localhost/development
      REACT_APP_BASE_CEREBRUM_URL: BROWSER_CONFIG.REACT_APP_BASE_CEREBRUM_URL,
      REACT_APP_BASE_LOCKSMIITH_URL:
        BROWSER_CONFIG.REACT_APP_BASE_LOCKSMIITH_URL,
      REACT_APP_BASE_WAYNE_URL: BROWSER_CONFIG.REACT_APP_BASE_WAYNE_URL,
    };
  }

  // Production configuration (minimal exposure)
  return {
    ...baseConfig,
    // Only include absolutely necessary items for production
    REACT_APP_LOGO_URL: BROWSER_CONFIG.REACT_APP_LOGO_URL,
  };
};

// Create a secure config endpoint handler
const createSecureConfigHandler = (BROWSER_CONFIG) => {
  return async (req, res) => {
    try {
      const secureConfig = getSecureConfig(BROWSER_CONFIG, req);

      // Add metadata for debugging (in development only)
      if (BROWSER_CONFIG.ENV !== "production") {
        secureConfig._meta = {
          requestIP: req.ip,
          timestamp: new Date().toISOString(),
          userAgent: req.get("User-Agent")?.slice(0, 50),
          filtered: true,
        };
      }

      // Set appropriate cache headers
      const cacheControl =
        BROWSER_CONFIG.ENV === "production"
          ? "private, max-age=300" // 5 minutes in production
          : "no-cache"; // No cache in development

      res.setHeader("Cache-Control", cacheControl);
      res.setHeader("X-Config-Version", "2.0");
      res.setHeader(
        "X-Security-Level",
        BROWSER_CONFIG.ENV === "production" ? "high" : "medium"
      );

      res.json(secureConfig);
    } catch (error) {
      console.error("❌ Error serving secure config:", error);
      res.status(500).json({
        error: "Configuration Error",
        message: "Failed to load application configuration",
        timestamp: new Date().toISOString(),
      });
    }
  };
};

module.exports = {
  configRateLimit,
  apiRateLimit,
  configSecurityMiddleware,
  getSecureConfig,
  createSecureConfigHandler,
};
