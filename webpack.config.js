const path = require('path');

const config = {
  entry: {
      client: './app/src/client.js'
  },
  output: {
    path: path.resolve(__dirname, 'app/dest'),
    filename: '[name].js',
  },
  module: {
    rules: [
      { test: /\.jsx?$/, exclude: /node_modules/, use: 'babel-loader' }
    ]
  },
  devtool: 'eval-source-map'
};

module.exports = config;