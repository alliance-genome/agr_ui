import path from 'path';
import webpack from 'webpack';

import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';

let isProduction = process.env.NODE_ENV === 'production';
let API_URL = process.env.API_URL || 'http://localhost:5000';
let DEV_SERVER_UI_PORT = process.env.DEV_SERVER_UI_PORT || '2992';

// Development asset host, asset location and build output path.
const buildOutputPath = path.join(__dirname, './dist');
const cssFileName = '[name].[contenthash].css';

let config = {
  context: path.join(__dirname, 'src'),
  debug: true,
  entry: [
    './index.js'
  ],
  output: {
    path: buildOutputPath,
    publicPath: '/',
    filename: '[name].[hash].js',
    chunkFilename: '[id].[chunkhash].js'
  },
  devtool: 'eval-source-map',
  devServer: {
    contentBase: 'dist',
    historyApiFallback: true,
    port: DEV_SERVER_UI_PORT,
    proxy: {
      '/api': {
        target: API_URL,
        secure: false
      }
    }
  },
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint'
      }
    ],
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel'
      },
      {
        test: /\.css$/,
        include: path.resolve(__dirname, "src"),  // limit match to only src/
        exclude: path.resolve(__dirname, "src/public"),
        loader: ExtractTextPlugin.extract(
          'style',
          'css?modules&sourceMap&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
          'postcss'
        )
      },
      {
        test:  /\.css$/,
        include: [
          path.resolve(__dirname, "src/public"),
          path.resolve(__dirname, "node_modules")
        ],
        loader: ExtractTextPlugin.extract(
          'style',
          'css'
        )
      },
      {
        test: /\.(jpg|png|ttf|eot|woff|woff2|svg)$/,
        exclude: /node_modules/,
        loader: 'url?limit=100000'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: path.join(__dirname, 'src', 'public', 'index.html'),
    }),
    new ExtractTextPlugin(cssFileName)
  ]
};

if (isProduction) {
  config.devtool = 'source-map';
  config.devServer = {};
  config.plugins = [
    // Generates an `index.html` file with the <script> injected.
    new HtmlWebpackPlugin({
      inject: true,
      template: path.join(__dirname, 'src', 'public', 'index.html'),
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      }
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new ExtractTextPlugin(cssFileName)
  ]
}

export default config;
