const path = require('path');
const webpack = require("webpack");

module.exports = {
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader",
            options: {
              modules: true
            }
          }
        ]
      }
    ]
  },
  entry: {
    filename: path.resolve(__dirname, './src/') + '/index.js'
  },
  output: {
    path: path.resolve(__dirname, './lib/'),
    filename: 'index.js'
  },
  devServer: {
    inline: false,
    contentBase: "./src",
  }
};
