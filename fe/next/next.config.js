const path = require("path");
const fs = require("fs");


console.log('argv', `../${process.argv.slice(-1)[0]}`);
let config = {
  pageExtensions: ["tsx", "md", "mdx"],
  cssModules: true,
  // Next cannot handle absolute distDir's, so go up to the top of the workspace.
  distDir: `../${process.argv.slice(-1)[0]}`,
  webpack: (config, options) => {
    // Use the module name mappings in tsconfig so imports resolve properly.
    config.resolve.plugins = config.resolve.plugins || [];
    config.resolve.alias = {
      ...config.resolve.alias,
      df: path.resolve(__dirname, "../")
    };
    // Make sure webpack can resolve modules that live within our bazel managed deps.

    // Tell webpack to preserve information about file names so we can use them for paths.
    config.node = { __filename: true, fs: "empty", child_process: "empty" };
    return config;
  }
};

module.exports = config;