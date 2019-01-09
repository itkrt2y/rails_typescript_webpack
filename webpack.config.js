const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const ManifestPlugin = require("webpack-manifest-plugin");
const LiveReloadPlugin = require("webpack-livereload-plugin");

module.exports = (_, argv) => {
  const isProduction = argv.mode === "production";
  const dist = path.resolve(__dirname, "public/javascripts/dist");

  return {
    entry: {
      hello_world: "./app/frontend/hello_world.ts"
    },

    output: {
      filename: "[name].[contenthash].js",
      path: dist,
      publicPath: "dist/"
    },

    mode: isProduction ? "production" : "development",

    devtool: isProduction ? "source-map" : "inline-source-map",

    resolve: {
      extensions: [".ts", ".tsx", ".js"]
    },

    module: {
      rules: [{ test: /\.tsx?$/, loader: "ts-loader" }]
    },

    plugins: [
      new CleanWebpackPlugin(dist),
      new ManifestPlugin({ fileName: "webpack-manifest.json" }),
      !isProduction && new LiveReloadPlugin({ appendScriptTag: true })
    ].filter(Boolean)
  };
};
