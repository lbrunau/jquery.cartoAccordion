const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: {
    "jquery.cartoAccordion": ["./src/accordion.js", "./css/accordion.css"],
  },
  resolve: {
    extensions: ['.js', '.css']
  },
  module: {
    rules: [{ test: /\.css$/, 
      use: [
        MiniCssExtractPlugin.loader,
        {loader: 'css-loader', options: {minimize: true}}
      ]
    }]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].min.js'
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].min.css",
      chunkFilename: "[id].css"
    })
  ]
};
