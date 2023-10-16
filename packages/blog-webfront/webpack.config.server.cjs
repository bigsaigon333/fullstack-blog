const path = require("path");
const { merge } = require("webpack-merge");
const commonConfig = require("./webpack.config.common.cjs");

/** @type {import('webpack').Configuration} */
const config = {
  entry: "./src/server.tsx",
  output: {
    path: path.resolve(__dirname, "dist/server"),
    publicPath: "/",
    clean: true,
    libraryTarget: "commonjs",
    filename: "main.cjs",
  },
};

module.exports = merge(commonConfig, config);
