const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const Dotenv = require("dotenv-webpack");

const isProduction = process.env.NODE_ENV == "production";

/** @type {import('webpack').Configuration} */
const config = {
  mode: isProduction ? "production" : "development",
  module: {
    rules: [
      {
        test: /\.[mc]?[jt]sx?$/,
        include: path.resolve(__dirname, "src"),
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                ["@babel/preset-env", { targets: "defaults" }],
                ["@babel/preset-react", { runtime: "automatic" }],
                "@babel/preset-typescript",
              ],
            },
          },
        ],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: "asset",
      },
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  "tailwindcss",
                  "postcss-preset-env",
                  "autoprefixer",
                  isProduction && { cssnano: {} },
                ].filter(Boolean),
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
      chunkFilename: "[id].[contenthash].css",
    }),
    new Dotenv({ path: "../../.env" }),
  ],
  resolve: {
    extensions: ["mjs", "js", "ts", "tsx", "json", "jsx"].map(
      (ext) => `.${ext}`
    ),
    extensionAlias: {
      ".js": [".ts", ".tsx", ".js", ".jsx"],
      ".cjs": [".cts", ".cjs"],
      ".mjs": [".mts", ".mjs"],
    },
  },
};

module.exports = config;
