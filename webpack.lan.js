const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "development",
  devtool: "inline-source-map", //track errors in the source file instead of in bundles
  devServer: {
    //serve files from ./dist on localhost:8080
    // inline: true,
    static: "./dist",
    hot: true,
    bonjour: true,
    allowedHosts: ["all"],
    host: "local-ipv4",
    client: { overlay: false },
  },
});
