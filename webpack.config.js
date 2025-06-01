require("dotenv").config();

// Log all environment variables
console.log("Environment Variables:");
console.log("=====================");
Object.keys(process.env)
  .filter((key) => key.startsWith("REACT_APP_"))
  .forEach((key) => {
    console.log(`${key}: ${process.env[key]}`);
  });
console.log("=====================");

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const webpack = require("webpack");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

// Create a new webpack.EnvironmentPlugin instance with all environment variables
const envPlugin = new webpack.EnvironmentPlugin({
  NODE_ENV: process.env.NODE_ENV || "development",
  REACT_APP_CLERK_PUBLISHABLE_KEY:
    process.env.REACT_APP_CLERK_PUBLISHABLE_KEY || "",
  REACT_APP_LOGO_URL: process.env.REACT_APP_LOGO_URL || "",
  REACT_APP_BRAND_NAME: process.env.REACT_APP_BRAND_NAME || "Rimberio School",
  REACT_APP_PROJECTS_LABEL: process.env.REACT_APP_PROJECTS_LABEL || "Projects",
  REACT_APP_EDIT_PROJECTS_LABEL:
    process.env.REACT_APP_EDIT_PROJECTS_LABEL || "Project",
  REACT_APP_PROJECTS_ROUTE: process.env.REACT_APP_PROJECTS_ROUTE || "project",
  REACT_APP_ENABLE_PROJECTS: process.env.REACT_APP_ENABLE_PROJECTS || "false",
  REACT_APP_KNOWLEDGE_BASE_LABEL:
    process.env.REACT_APP_KNOWLEDGE_BASE_LABEL || "Knowledge Bases",
  REACT_APP_EDIT_KNOWLEDGE_BASE_LABEL:
    process.env.REACT_APP_EDIT_KNOWLEDGE_BASE_LABEL || "Knowledge Base",
  REACT_APP_KNOWLEDGE_BASE_ROUTE:
    process.env.REACT_APP_KNOWLEDGE_BASE_ROUTE || "knowledge",
  REACT_APP_ENABLE_KNOWLEDGE_BASES:
    process.env.REACT_APP_ENABLE_KNOWLEDGE_BASES || "false",
  REACT_APP_ENABLE_CHATS: process.env.REACT_APP_ENABLE_CHATS || "false",
  REACT_APP_CHAT_ROUTE: process.env.REACT_APP_CHAT_ROUTE || "chat",
  REACT_APP_ENABLE_HISTORY: process.env.REACT_APP_ENABLE_HISTORY || "false",
  REACT_APP_GOOGLE_ANALYTICS_ENABLE:
    process.env.REACT_APP_GOOGLE_ANALYTICS_ENABLE || "false",
  REACT_APP_GOOGLE_ANALYTICS_CODE:
    process.env.REACT_APP_GOOGLE_ANALYTICS_CODE || "",
  REACT_APP_BASE_CEREBRUM_URL:
    process.env.REACT_APP_BASE_CEREBRUM_URL || "http://localhost:8081/",
  REACT_APP_BASE_LOCKSMIITH_URL:
    process.env.REACT_APP_BASE_LOCKSMIITH_URL || "http://localhost:8082/",
  REACT_APP_BASE_WAYNE_URL:
    process.env.REACT_APP_BASE_WAYNE_URL || "http://localhost:8083/",
});

module.exports = (env, argv) => {
  const isProduction = argv.mode === "production";
  const shouldAnalyze = process.env.ANALYZE === "true";

  return {
    entry: "./src/index.js",
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: isProduction ? "[name].[contenthash].js" : "[name].js",
      clean: true,
      publicPath: "/",
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx|ts|tsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              cacheDirectory: true,
              presets: ["@babel/preset-env", "@babel/preset-react"],
              plugins: !isProduction ? ["react-refresh/babel"] : [],
            },
          },
        },
        {
          test: /node_modules\/gotham\/(src|folders)\/.*\.(js|jsx)$/,
          // exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              cacheDirectory: true,
              plugins: !isProduction ? ["react-refresh/babel"] : [],
              presets: ["@babel/preset-env", "@babel/preset-react"],
            },
          },
        },
        {
          test: /\.(scss|css)$/,
          use: [
            isProduction ? MiniCssExtractPlugin.loader : "style-loader",
            {
              loader: "css-loader",
              options: {
                sourceMap: true,
                importLoaders: 2,
              },
            },
            "postcss-loader",
            "sass-loader",
          ],
        },
        {
          test: /\.(png|jpe?g|gif|svg)$/i,
          type: "asset/resource",
          generator: {
            filename: "images/[hash][ext][query]",
          },
          parser: {
            dataUrlCondition: {
              maxSize: 8 * 1024,
            },
          },
        },
        {
          test: /\.json$/,
          type: "json", // No need for json-loader in Webpack 5
        },
        {
          test: /\.m?js$/,
          resolve: { fullySpecified: false },
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./public/index.html",
        filename: "index.html",
        minify: isProduction && {
          removeComments: true,
          collapseWhitespace: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeStyleLinkTypeAttributes: true,
          keepClosingSlash: true,
          minifyJS: true,
          minifyCSS: true,
          minifyURLs: true,
        },
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: "public",
            to: ".",
            globOptions: {
              ignore: ["**/index.html"],
            },
          },
        ],
      }),
      isProduction &&
        new MiniCssExtractPlugin({
          filename: "[name].[contenthash].css",
          chunkFilename: "[id].[contenthash].css",
        }),
      new CleanWebpackPlugin(),
      envPlugin,
      new webpack.ProvidePlugin({
        process: "process/browser",
      }),
      !isProduction && new webpack.HotModuleReplacementPlugin(),
      !isProduction && new ReactRefreshWebpackPlugin(),
      isProduction &&
        new CompressionPlugin({
          filename: "[path][base].br",
          algorithm: "brotliCompress",
          test: /\.(js|css|html|svg)$/,
          compressionOptions: { level: 11 },
          threshold: 10240,
          minRatio: 0.8,
          deleteOriginalAssets: false,
        }),
      shouldAnalyze &&
        new BundleAnalyzerPlugin({
          analyzerMode: isProduction ? "static" : "server",
          openAnalyzer: !isProduction,
          generateStatsFile: true,
          statsFilename: "stats.json",
          reportFilename: "report.html",
        }),
    ].filter(Boolean),
    optimization: {
      minimize: isProduction,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            compress: {
              drop_console: true,
            },
            output: {
              comments: false,
            },
          },
        }),
        new CssMinimizerPlugin(),
      ],
      splitChunks: {
        chunks: "all",
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendors",
            chunks: "all",
          },
        },
      },
    },
    devServer: {
      static: {
        directory: path.join(__dirname, "public"),
      },
      port: 4000,
      hot: true,
      open: true,
      historyApiFallback: true,
      client: {
        overlay: {
          errors: true,
          warnings: false,
        },
      },
    },
    resolve: {
      extensions: [".js", ".jsx", ".ts", ".tsx"],
      alias: {
        "@src": path.resolve(__dirname, "src"),
        gotham: path.resolve(
          __dirname,
          "node_modules/gotham/src/BillingApp.jsx"
        ),
        "@public": path.resolve(__dirname, "node_modules/gotham/src/public"),
      },
      fallback: {
        path: require.resolve("path-browserify"),
        util: require.resolve("util/"),
        process: require.resolve("process"),
        fs: false,
        crypto: false,
        stream: false,
        buffer: false,
        http: false,
        https: false,
        zlib: false,
        url: false,
      },
    },
    cache: {
      type: "filesystem",
    },
    performance: {
      hints: isProduction ? "warning" : false,
      maxEntrypointSize: 250000,
      maxAssetSize: 250000,
    },
    mode: isProduction ? "production" : "development",
    devtool: isProduction ? "source-map" : "eval-source-map",
  };
};
