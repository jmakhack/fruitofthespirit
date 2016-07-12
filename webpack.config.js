const webpack = require('webpack');

module.exports = {
  entry: './src/app.js',
  output: {
    path: './bin',
    filename: 'app.bundle.js',
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel'
      }, {
      test: /\.css$/,
      exclude: /node_modules/,
      loader: 'css'
      }, {
      test: /\.json$/,
      exclude: /node_modules/,
      loader: 'json'
    }]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      output: {
        comments: false
      }
    })
  ]
}
