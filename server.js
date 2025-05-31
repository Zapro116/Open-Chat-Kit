const express = require("express");
const path = require("path");
const fs = require("fs");
const expressStaticGzip = require("express-static-gzip");
const frameguard = require("frameguard");
const https = require("https");
const { createProxyMiddleware } = require("http-proxy-middleware");
const helmet = require("helmet");

// Import configuration
const { conf } = require("./config");
const BROWSER_CONFIG = conf.get("BROWSER_CONFIG");

const app = express();

// Security middleware
app.use(
  helmet({
    contentSecurityPolicy: false, // Disable CSP for React apps that need inline scripts
    frameguard: { action: "deny" },
  })
);

// Additional security headers
app.use((req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-XSS-Protection", "1; mode=block");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  next();
});

// Trust proxy for correct client IP in load balancer scenarios
app.set("trust proxy", 1);

// Inject environment variables into index.html
const injectConfig = () => {
  try {
    const indexPath = path.resolve("./dist/index.html");

    if (fs.existsSync(indexPath)) {
      let indexHTML = fs.readFileSync(indexPath, { encoding: "utf8" });

      const configScript = `<script>window._conf=${JSON.stringify(
        BROWSER_CONFIG
      )};</script>`;

      console.log(
        "🔧 Injecting configuration:",
        JSON.stringify(BROWSER_CONFIG, null, 2)
      );

      // Replace placeholder or inject before closing head tag
      if (indexHTML.includes("<!-- CONFIG_PLACEHOLDER -->")) {
        // Replace placeholder with actual config
        indexHTML = indexHTML.replace(
          "<!-- CONFIG_PLACEHOLDER -->",
          configScript
        );
        console.log("✓ Replaced CONFIG_PLACEHOLDER with configuration");
      } else if (indexHTML.includes("window._conf=")) {
        // Replace existing config
        indexHTML = indexHTML.replace(
          /<script>window\._conf=.*?<\/script>/,
          configScript
        );
        console.log("✓ Replaced existing configuration in index.html");
      } else {
        // Inject new config before closing head tag
        indexHTML = indexHTML.replace(
          /(<\/head>)/,
          `${configScript}
          $1`
        );
        console.log("✓ Injected new configuration into index.html");
      }

      fs.writeFileSync(indexPath, indexHTML);
      console.log("✓ Configuration injected into index.html");
    } else {
      console.warn("⚠ index.html not found at ./dist/index.html");
    }
  } catch (err) {
    console.error("❌ Error processing index.html:", err.message);
    console.error("Stack trace:", err.stack);
  }
};

// Inject configuration on startup
injectConfig();

// Health check endpoints
app.get("/_readyz", (req, res) => {
  res.status(200).json({
    status: "ready",
    timestamp: new Date().toISOString(),
    environment: BROWSER_CONFIG.ENV,
  });
});

app.get("/_healthz", (req, res) => {
  res.status(200).json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    environment: BROWSER_CONFIG.ENV,
  });
});

// Metrics endpoint (optional)
app.get("/_metrics", (req, res) => {
  res.status(200).json({
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    cpu: process.cpuUsage(),
    environment: BROWSER_CONFIG.ENV,
    timestamp: new Date().toISOString(),
  });
});

// Proxy configuration for external routes
if (BROWSER_CONFIG.PROXY_TARGET) {
  app.use(
    "/pages",
    createProxyMiddleware({
      target: BROWSER_CONFIG.PROXY_TARGET,
      changeOrigin: true,
      followRedirects: true,
      secure: true,
      timeout: 30000,
      pathRewrite: {
        "^/pages": "/",
      },
      onProxyReq: (proxyReq, req) => {
        proxyReq.setHeader("Host", BROWSER_CONFIG.PROXY_HOST);
        proxyReq.setHeader("Referer", BROWSER_CONFIG.PROXY_REFERER);
        console.log(
          `📤 Proxying: ${req.method} ${req.originalUrl} -> ${BROWSER_CONFIG.PROXY_TARGET}`
        );
      },
      onProxyRes: (proxyRes, req, res) => {
        proxyRes.headers["access-control-allow-origin"] = "*";
        console.log(
          `📥 Proxy response: ${req.originalUrl} - Status: ${proxyRes.statusCode}`
        );
      },
      onError: (err, req, res) => {
        console.error(`❌ Proxy error for ${req.originalUrl}:`, err.message);
        res.status(502).json({
          error: "Bad Gateway",
          message: "Proxy service unavailable",
        });
      },
    })
  );
  console.log(`🔗 Proxy configured: /pages -> ${BROWSER_CONFIG.PROXY_TARGET}`);
}

// Serve static files with compression
app.use(
  "/",
  expressStaticGzip(path.join(__dirname, "./dist"), {
    enableBrotli: true,
    orderPreference: ["br", "gz"],
    setHeaders: (res, path) => {
      // Cache static assets
      if (
        path.match(/\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$/)
      ) {
        res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
      } else {
        res.setHeader("Cache-Control", "public, max-age=0, must-revalidate");
      }
    },
  })
);

// Catch-all route for SPA (must be last)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./dist", "index.html"));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("❌ Unhandled error:", err);
  res.status(500).json({
    error: "Internal Server Error",
    message:
      BROWSER_CONFIG.ENV === "dev" ? err.message : "Something went wrong",
  });
});

// Graceful shutdown handling
const gracefulShutdown = (signal) => {
  console.log(`\n🛑 Received ${signal}. Shutting down gracefully...`);
  process.exit(0);
};

process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
process.on("SIGINT", () => gracefulShutdown("SIGINT"));

// Start server based on environment
const startServer = () => {
  if (BROWSER_CONFIG.ENV === "dev") {
    // Try HTTPS first for development
    try {
      const certOptions = {
        key: fs.readFileSync(path.resolve(__dirname, "./ssl/key.pem")),
        cert: fs.readFileSync(path.resolve(__dirname, "./ssl/cert.pem")),
      };

      https.createServer(certOptions, app).listen(BROWSER_CONFIG.PORT, () => {
        console.log(
          `🚀 HTTPS server running on https://localhost:${BROWSER_CONFIG.PORT}`
        );
        console.log(
          `📊 Health check: https://localhost:${BROWSER_CONFIG.PORT}/_healthz`
        );
      });
    } catch (err) {
      console.warn(
        "⚠ SSL certificates not found, falling back to HTTP:",
        err.message
      );
      app.listen(BROWSER_CONFIG.PORT, () => {
        console.log(
          `🚀 HTTP server running on http://localhost:${BROWSER_CONFIG.PORT} (dev mode)`
        );
        console.log(
          `📊 Health check: http://localhost:${BROWSER_CONFIG.PORT}/_healthz`
        );
      });
    }
  } else {
    // Production HTTP server
    app.listen(BROWSER_CONFIG.PORT, "0.0.0.0", () => {
      console.log(
        `🚀 Production server running on port ${BROWSER_CONFIG.PORT}`
      );
      console.log(
        `📊 Health check: http://localhost:${BROWSER_CONFIG.PORT}/_healthz`
      );
      console.log(`🌍 Environment: ${BROWSER_CONFIG.ENV}`);
    });
  }
};

startServer();
