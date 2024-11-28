import path from "path";
import { fileURLToPath } from "url";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import ESLintPlugin from "eslint-webpack-plugin";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isProduction = process.env.NODE_ENV == "production";
const semanticVersion =
  process.env.SEMANTIC_RELEASE_NEXT_RELEASE_VERSION || "0.0.0";
const buildMetadata = `build.${Date.now()}`;
const buildNumber = `${semanticVersion}+${buildMetadata}`;

// Automatically detect entry point (index.ts or index.js)
const getEntry = () => {
  const tsEntry = "./src/scripts/index.ts";
  const jsEntry = "./src/scripts/index.js";
  return fs.existsSync(path.resolve(__dirname, tsEntry)) ? tsEntry : jsEntry;
};

const stylesHandler = isProduction
  ? MiniCssExtractPlugin.loader
  : "style-loader";

const config = {
  entry: getEntry(),

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[contenthash].js", // Cache-busting filenames
    clean: true, // Clean output directory before build
  },

  devServer: {
    open: true,
    host: "localhost",
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "src/index.html",
      inject: "body",
      templateParameters: {
        BUILD_NUMBER: buildNumber,
      },
    }),
    new ESLintPlugin({
      configType: "flat",
    }), // Add your plugins here
    // Learn more about plugins from https://webpack.js.org/configuration/plugins/
  ],

  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/i,
        use: "ts-loader",
        exclude: ["/node_modules/"],
      },
      {
        test: /\.(js|jsx)$/i,
        loader: "babel-loader",
      },
      {
        test: /\.s[ac]ss$/i,
        use: [stylesHandler, "css-loader", "postcss-loader", "sass-loader"],
      },
      {
        test: /\.css$/i,
        use: [stylesHandler, "css-loader", "postcss-loader"],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: "asset",
      }, // Add your rules for custom modules here
      // Learn more about loaders from https://webpack.js.org/loaders/
    ],
  },

  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", "..."],
  },
};

export default () => {
  if (isProduction) {
    config.mode = "production";
    config.plugins.push(new MiniCssExtractPlugin());
  } else {
    config.mode = "development";
  }
  return config;
};
