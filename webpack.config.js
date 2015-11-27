const escapeStringRegExp = require('escape-string-regexp');
const project = require('./package.json');
const webpack = require('webpack');
const fs = require('fs');

const commonEntryPoints = ['babel-polyfill'];

module.exports = {
  context: __dirname,
  entry: {
    example1: commonEntryPoints.concat(['./src/example1/example1.js']),
    example2: commonEntryPoints.concat(['./src/example2/example2.js']),
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },

  target: 'node',
  output: {
    filename: '[name]-bundle.js',
    path: './dist',
    libraryTarget: 'commonjs',
  },
  externals: (
    Object
      .keys(project.dependencies)
      .map(module => new RegExp(`^${escapeStringRegExp(module)}(?:\/.*)?$`))
  ),

  devtool: '#sourcemap',

  plugins: [
    new webpack.BannerPlugin(
      'require("source-map-support").install();',
      { raw: true, entryOnly: false }
    ),
  ],

  module: {

    // We'll use a npm taks for eslint and jsrc
    preLoaders: [
      {
        test: /\.jsx?$/,
        loader: 'eslint-loader',
        include: __dirname,
        exclude: [ /node_modules/ ],
      },
    ],
    loaders: [
      {
        test: /\.jsx$|\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
};
