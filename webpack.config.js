const path = require('path');
const webpack = require("webpack");

module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  plugins: [
    [
      "@babel/plugin-proposal-class-properties"
    ]
  ],
  entry: {
    filename: path.resolve(__dirname, './src/') + '/index.js'
  },
  output: {
    path: path.resolve(__dirname, './umd/'),
    filename: 'index.js',
    libraryTarget: "umd"
  }
};