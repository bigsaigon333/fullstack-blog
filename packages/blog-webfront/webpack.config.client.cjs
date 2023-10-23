const path = require("path");
const { merge } = require("webpack-merge");
const commonConfig = require("./webpack.config.common.cjs");

/** @type {import('webpack').Configuration} */
const config = {
  entry: "./src/client.tsx",
  output: {
    path: path.resolve(__dirname, "dist/client"),
    publicPath: "/",
    clean: true,
  },
};

module.exports = merge(commonConfig, config);
