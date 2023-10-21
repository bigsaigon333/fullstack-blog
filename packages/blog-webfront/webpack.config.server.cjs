const path = require("path");
const { merge } = require("webpack-merge");
const CopyPlugin = require("copy-webpack-plugin");
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
  plugins: [
    new CopyPlugin({
      patterns: [{ from: "src/server.d.ts", to: "main.d.cts" }],
    }),
  ],
};

module.exports = merge(commonConfig, config);
