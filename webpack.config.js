//
// Here is a good guide to creating library packages/modules.
//   https://webpack.js.org/guides/author-libraries/#final-steps
// The project below does not full conform to the above, but we
// might find guidance above.
//

const path = require('path');
const webpack = require('webpack');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const src = path.resolve(__dirname, 'src/');
const dist = path.resolve(__dirname, 'dist/');

var libraryConfig = {
  name: 'library',
  mode: 'development',
  entry: path.resolve(src, 'index.js'),
  output: {
    filename: 'index.js',
    globalObject: 'this',
    library: 'GenomeFeatureViewer',
    libraryTarget: 'umd'
  },
  plugins: [
    new CopyWebpackPlugin([
        { from: path.resolve(src, 'GenomeFeatureViewer.css') },
    ]),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['@babel/preset-env'],
        }
      },
      {
        test: /\.css/,
        loader: 'css-loader',
        include: src
      }
    ]
  },
};


const demosrc = path.resolve(src, 'demo/');

var demoConfig = {
  name: 'demo',
  mode: 'development',
  entry: path.resolve(demosrc, 'index.js'),
  output: {
    path: dist,
    filename: 'demo.js'
  },
  externals: {
    GenomeFeatureViewer: 'GenomeFeatureViewer',
  },
  plugins: [
    new HtmlWebpackPlugin(
    {
      template: 'src/demo/index.ejs',
      inject: false
    }),
  ],
  module: {
    noParse: /dist\//,
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['@babel/preset-env'],
        }
      },
      {
        test: /\.css/,
        loader: 'css-loader',
        include: path.resolve(__dirname, '/src')
      }
    ]
  },

  devServer: {
    contentBase: dist,
    open: true
  },
};

const configs = [
  libraryConfig,
  demoConfig
];

module.exports = configs;
