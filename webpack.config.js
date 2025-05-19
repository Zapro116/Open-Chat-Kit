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
          test: /\.scss$/,
          use: [
            isProduction ? MiniCssExtractPlugin.loader : "style-loader",
            {
              loader: "css-loader",
              options: {
                sourceMap: true,
                importLoaders: 2,
              },
            },
            "postcss-loader", // Moved before sass-loader for better compatibility
            "sass-loader",
          ],
        },
        {
          test: /\.css$/,
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
              maxSize: 8 * 1024, // 8kb
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
        minify: isProduction
          ? {
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
            }
          : false,
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: "public",
            to: ".",
            filter: (resourcePath) => {
              return (
                resourcePath.endsWith(".png") ||
                resourcePath.endsWith(".jpg") ||
                resourcePath.endsWith(".svg") ||
                resourcePath.endsWith(".gif") ||
                resourcePath.endsWith(".ico")
              );
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
      new webpack.DefinePlugin({
        "process.env.NODE_ENV": JSON.stringify(
          isProduction ? "production" : "development"
        ),
        __DEV__: !isProduction,
      }),
      ...(isProduction
        ? []
        : [
            new webpack.HotModuleReplacementPlugin(),
            new ReactRefreshWebpackPlugin(),
          ]),
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
      isProduction &&
        new CompressionPlugin({
          filename: "[path][base].gz",
          algorithm: "gzip",
          test: /\.(js|css|html|svg)$/,
          threshold: 10240,
          minRatio: 0.8,
          deleteOriginalAssets: false,
        }),
      shouldAnalyze &&
        new BundleAnalyzerPlugin({
          analyzerMode: isProduction ? "static" : "server",
          openAnalyzer: isProduction ? false : true,
          generateStatsFile: true,
          statsFilename: "stats.json",
          reportFilename: "report.html",
        }),
    ].filter(Boolean),
    optimization: {
      usedExports: true,
      minimize: isProduction,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            parse: {
              ecma: 8,
            },
            compress: {
              ecma: 5,
              warnings: false,
              comparisons: false,
              inline: 2,
              drop_console: true,
            },
            mangle: {
              safari10: true,
            },
            output: {
              ecma: 5,
              comments: false,
              ascii_only: true,
            },
          },
          parallel: true,
          extractComments: false,
        }),
        new CssMinimizerPlugin(),
      ],
      runtimeChunk: "single",
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
      allowedHosts: "all",
      client: {
        overlay: {
          errors: true,
          warnings: false,
        },
        progress: true,
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
    devtool: isProduction ? "hidden-source-map" : "eval-source-map",
  };
};
