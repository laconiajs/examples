const path = require("path");
const slsw = require("serverless-webpack");

// Copied and modified from: https://github.com/serverless-heaven/serverless-webpack/tree/master/examples/babel-webpack-4
module.exports = {
  entry: slsw.lib.entries,
  mode: slsw.lib.webpack.isLocal ? "development" : "production",
  optimization: {
    minimize: false
  },
  performance: {
    hints: false
  },
  target: "node",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader"
          }
        ]
      },
      // Transpile laconia
      // babel-loader config is being specified here as babel-loader will not loader .babelrc
      // for node_modules for some reason
      {
        test: /\@laconia.*\.js$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                [
                  "@babel/env",
                  {
                    targets: {
                      node: "6.10"
                    }
                  }
                ]
              ],
              sourceType: "script",
              plugins: ["@babel/transform-runtime"]
            }
          }
        ]
      }
    ]
  },
  output: {
    libraryTarget: "commonjs2",
    path: path.join(__dirname, ".webpack"),
    filename: "[name].js"
  },
  // Exclude aws-sdk as it is available in Lambda runtime
  externals: ["aws-sdk"]
};
