const webpack = require('webpack');
const resolve = require('path').resolve;

module.exports = {
  devtool: 'cheap-source-map',
  entry: {
    'my-f2': './src/index.js'
  },
  output: {
    filename: '[name].js',
    library: 'myF2',
    libraryTarget: 'umd',
    path: resolve(__dirname, 'build/')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        // exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            babelrc: true
          }
        }
      }
    ]
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.AggressiveMergingPlugin()
  ]
};
