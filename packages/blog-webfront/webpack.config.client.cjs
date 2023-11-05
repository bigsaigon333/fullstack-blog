const path = require("path");
const { merge } = require("webpack-merge");
const commonConfig = require("./webpack.config.common.cjs");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

const isAnalyzeMode = process.env.ANALYZE === "true";

/** @type {import('webpack').Configuration} */
const config = {
  entry: "./src/client.tsx",
  output: {
    path: path.resolve(__dirname, "dist/client"),
    publicPath: "/",
    clean: true,
  },
  plugins: [isAnalyzeMode && new BundleAnalyzerPlugin()].filter(Boolean),
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
          priority: -10,
          reuseExistingChunk: true,
        },
      },
    },
  },
};

module.exports = merge(commonConfig, config);
