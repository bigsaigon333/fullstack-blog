const path = require("path");
const { merge } = require("webpack-merge");
const commonConfig = require("./webpack.config.common.cjs");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

/** @type {import('webpack').Configuration} */
const config = {
  entry: "./src/client.tsx",
  output: {
    path: path.resolve(__dirname, "dist/client"),
    publicPath: "/",
    clean: true,
  },
  plugins: [new BundleAnalyzerPlugin()],
};

module.exports = merge(commonConfig, config);
