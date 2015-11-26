// webpack config file
const fs = require('fs');

const nodeModules = {};
fs.readdirSync('node_modules')
    .filter(function parseModules(modules) {
      return ['.bin'].indexOf(modules) === -1;
    })
    .forEach(function addToCommonJS(mod) {
      nodeModules[mod] = 'commonjs ' + mod;
    });

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
    libraryTarget: 'this',
  },
  node: {
    __dirname: true,
    __filename: true,
  },
  externals: nodeModules,
  devTool: '#eval-source-map',
  debug: true,
  module: {
    loaders: [
      {
        test: /\.jsx$|\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'stage-0'],
        },
      },
    ],
  },
};
