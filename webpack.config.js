const path = require("path");

module.exports = {
  entry: "./src/index.js",
  mode: "production",
  optimization: {
    minimize: true
  },
  performance: {
    hints: false
  },
  output: {
    path: __dirname + "/dist",
    publicPath: "dist",
    filename: "worker.js"
  },
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.graphql$/,
        use: [{ loader: "graphql-import-loader" }]
      },
      {
        test: /\.m?js$/,
        type: "javascript/auto",
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-react"],
            plugins: [ "babel-plugin-relay"]
          }
        }
      }
    ]
  }
};
