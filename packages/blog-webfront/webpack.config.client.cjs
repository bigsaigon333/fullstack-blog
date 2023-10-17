const path = require("path");
const { merge } = require("webpack-merge");
const commonConfig = require("./webpack.config.common.cjs");
const HtmlWebpackPlugin = require("html-webpack-plugin");

/** @type {import('webpack').Configuration} */
const config = {
  entry: "./src/client.tsx",
  output: {
    path: path.resolve(__dirname, "dist/client"),
    publicPath: "/",
    clean: true,
  },
  devServer: {
    open: true,
    host: "localhost",
    hot: true,
    port: 3000,
    proxy: {
      "/api": {
        target: "http://localhost:8080",
        changeOrigin: true,
      },
      "/oauth": {
        target: "http://localhost:8080",
        changeOrigin: true,
      },
    },
    historyApiFallback: true,
  },
  plugins: [new HtmlWebpackPlugin({ template: "public/index.html" })],
};

module.exports = merge(commonConfig, config);
