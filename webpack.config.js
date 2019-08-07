const path = require('path');
const webpack = require("webpack");

module.exports = {
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env',
              '@babel/preset-react', {
                'plugins': ['@babel/plugin-proposal-class-properties']
              }]
          }
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
    path: path.resolve(__dirname, './umd/'),
    filename: 'index.js',
    libraryTarget: "umd"
  },
  devServer: {
    inline: false,
    contentBase: "./src",
  },
};