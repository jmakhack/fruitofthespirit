const webpack = require('webpack');

module.exports = {
  entry: './src/main.js',
  output: {
    path: './dist',
    filename: 'fruitofthespirit.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel']
      },
      {
        test: /\.css$/,
        loaders: ['style', 'css']
      },
      {
        test: /\.json$/,
        loaders: ['json']
      },
      {
        test: /\.ico$/,
        loaders: ['static']
      }
    ]
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
