const express = require("express");
const path = require("path");
const app = express();
const fs = require("fs");
const Mustache = require("mustache");
const expressStaticGzip = require("express-static-gzip");
const frameguard = require("frameguard");
const https = require("https");
const { createProxyMiddleware } = require("http-proxy-middleware");

// Import configuration
const { conf } = require("./config");
const BROWSER_CONFIG = conf.get("BROWSER_CONFIG");

// Security middleware
app.use(frameguard({ action: "DENY" }));

// Inject environment variables into index.html
try {
  if (fs.existsSync(path.resolve("./dist/index.html"))) {
    let indexHTML = fs.readFileSync(path.resolve("./dist/index.html"), {
      encoding: "utf8",
    });
    const configJS = {
      configJS: `window._conf=${JSON.stringify(BROWSER_CONFIG)}`,
    };
    indexHTML = indexHTML.replace(
      /(<\/head>)/,
      `<!-- <script>
            {{#configJS}} {{{configJS}}} {{/configJS}}
            </script> -->
            $1`
    );
    let uncommentedHTML = indexHTML.replace(
      /<!-- <script>\s*{{#configJS}} {{{configJS}}} {{\/configJS}}\s*<\/script> -->/,
      "<script>\n{{#configJS}} {{{configJS}}} {{/configJS}}\n</script>"
    );
    const result = Mustache.render(uncommentedHTML, configJS);

    fs.writeFile(path.resolve("./dist/index.html"), result, (error) => {
      if (error) console.error("Error writing to index.html:", error);
    });
  }
} catch (err) {
  console.error("Error processing index.html:", err);
}

// Health check endpoints
app.get("/_readyz", (req, res) => {
  res.json({ status: "ok" });
});

app.get("/_healthz", (req, res) => {
  res.json({ status: "ok" });
});

// Proxy configuration for external routes
app.use(
  "/pages",
  createProxyMiddleware({
    target: BROWSER_CONFIG.PROXY_TARGET,
    changeOrigin: true,
    followRedirects: true,
    secure: true,
    pathRewrite: {
      "^/pages": "/",
    },
    onProxyReq: (proxyReq, req) => {
      proxyReq.setHeader("Host", BROWSER_CONFIG.PROXY_HOST);
      proxyReq.setHeader("Referer", BROWSER_CONFIG.PROXY_REFERER);
    },
    onProxyRes: (proxyRes, req, res) => {
      proxyRes.headers["access-control-allow-origin"] = "*";
      console.log(
        `Proxied ${req.originalUrl} - Status: ${proxyRes.statusCode}`
      );
    },
    onError: (err, req, res) => {
      console.error(`Proxy error: ${err.message}`);
      res.status(500).send("Proxy error occurred");
    },
  })
);

// Serve static files
app.use("/", expressStaticGzip(path.join(__dirname, "./dist")));

// Catch-all route for SPA
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./dist", "index.html"));
});

// Start server based on environment
if (BROWSER_CONFIG.ENV === "dev") {
  try {
    const certOptions = {
      key: fs.readFileSync(path.resolve(__dirname, "./ssl/key.pem")),
      cert: fs.readFileSync(path.resolve(__dirname, "./ssl/cert.pem")),
    };

    https.createServer(certOptions, app).listen(BROWSER_CONFIG.PORT, () => {
      console.log(`HTTPS server running on port ${BROWSER_CONFIG.PORT}`);
    });
  } catch (err) {
    console.error(
      "SSL certificates not found, falling back to HTTP:",
      err.message
    );
    app.listen(BROWSER_CONFIG.PORT, () => {
      console.log(
        `HTTP server running on port ${BROWSER_CONFIG.PORT} in dev mode`
      );
    });
  }
} else {
  app.listen(BROWSER_CONFIG.PORT, () => {
    console.log(`Production server running on port ${BROWSER_CONFIG.PORT}`);
  });
}
