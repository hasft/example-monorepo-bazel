require("dotenv").config();
const path = require("path");
const fs = require("fs");

let config = {
  pageExtensions: ["tsx", "md", "mdx"],
  distDir: `../${process.argv.slice(-1)[0]}`,
  env: {
    BASE_URL: process.env.BASE_URL,
  },
  webpack: (config, options) => {
    // Use the module name mappings in tsconfig so imports resolve properly.
    config.resolve.plugins = config.resolve.plugins || [];
    config.resolve.alias = {
      ...config.resolve.alias,
      mm: path.resolve(__dirname, "../../"),
    };

    config.module.rules.push({
      test: /\.jsx?$/,
      exclude: /node_modules/,
      use: [{ loader: require.resolve("umd-compat-loader") }],
    });

    // Tell webpack to preserve information about file names so we can use them for paths.
    config.node = { __filename: true, fs: "empty", child_process: "empty" };
    return config;
  },
};

module.exports = config;
