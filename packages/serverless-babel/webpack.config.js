const path = require("path");
const slsw = require("serverless-webpack");

module.exports = {
  entry: slsw.lib.entries,
  target: "node",
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ["babel-loader"],
        include: __dirname,
        exclude: /node_modules/
      },
      // Transpile laconia as it is written in node 8
      {
        test: /\.js$/,
        loaders: ["babel-loader"],
        include: /node_modules\/@laconia/
      }
    ]
  },
  output: {
    libraryTarget: "commonjs",
    path: path.join(__dirname, ".webpack"),
    filename: "[name].js"
  },
  // Exclude aws-sdk as it is available in Lambda runtime
  externals: ["aws-sdk"]
};
