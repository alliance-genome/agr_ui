import path from 'path';
import webpack from 'webpack';

import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import RobotstxtPlugin from 'robotstxt-webpack-plugin';

let isProduction = process.env.NODE_ENV === 'production';
let API_URL = process.env.API_URL || 'http://localhost:8080';
let DEV_SERVER_UI_PORT = process.env.DEV_SERVER_UI_PORT || '2992';
let JBROWSE_URL = process.env.JBROWSE_URL || 'http://jbrowse.alliancegenome.org';
let APOLLO_URL = process.env.APOLLO_URL || 'https://agr-apollo.berkeleybop.io/apollo/';
let JBROWSE_PORT = process.env.JBROWSE_PORT || '8891';
let LIVE_UI = process.env.LIVE_UI || 'false';

// Development asset host, asset location and build output path.
const buildOutputPath = path.join(__dirname, './dist');

let mainSass = new ExtractTextPlugin('main.[contenthash].css');
let vendorCss = new ExtractTextPlugin('vendor.[contenthash].css');

const robotsOptions = (LIVE_UI === 'true') ? {
  policy: [
    {
      userAgent: '*',
      allow: '/',
      disallow: '/search',
    },
  ],
  sitemap: [
    'http://www.alliancegenome.org/sitemap.xml',
    'http://www.alliancegenome.org/api/sitemap.xml',
  ],
} : {
  policy: [
    {
      userAgent: '*',
      disallow: '/',
    },
  ],
};

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
    disableHostCheck: true,
    contentBase: 'dist',
    historyApiFallback: true,
    port: DEV_SERVER_UI_PORT,
    host: '0.0.0.0',
    proxy: {
      '/api': {
        target: API_URL,
        secure: false,
        changeOrigin: true
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
        test: /\.scss$/,
        include: path.resolve(__dirname, 'src'),
        exclude: [
          path.resolve(__dirname, 'src/public'),
          path.resolve(__dirname, 'src/style.scss')
        ],
        loader: mainSass.extract([
          'css?modules&sourceMap&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
          'postcss',
          'sass'
        ])
      },
      {
        test:  /\.(css|scss)$/,
        include: [
          path.resolve(__dirname, 'node_modules'),
          path.resolve(__dirname, 'src/style.scss')
        ],
        loader: vendorCss.extract(['css', 'sass'])
      },
      {
        test: /\.(jpg|png|ttf|eot|woff|woff2|svg)$/,
        loader: 'url?limit=100000'
      }
    ]
  },
  plugins: [
    new RobotstxtPlugin(robotsOptions),
    new HtmlWebpackPlugin({
      inject: true,
      template: path.join(__dirname, 'src', 'public', 'index.html'),
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('develop'),
        'JBROWSE_URL': JSON.stringify(JBROWSE_URL),
        'JBROWSE_PORT': JSON.stringify(JBROWSE_PORT)
      }
    }),
    vendorCss,
    mainSass
  ]
};

if (isProduction) {
  config.devtool = 'source-map';
  config.devServer = {};
  config.plugins = [
    new RobotstxtPlugin(robotsOptions),
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
        'NODE_ENV': JSON.stringify('production'),
        'JBROWSE_URL': JSON.stringify(JBROWSE_URL),
        'JBROWSE_PORT': JSON.stringify(JBROWSE_PORT)
      }
    }),
    new webpack.optimize.UglifyJsPlugin(),
    vendorCss,
    mainSass
  ];
}

export default config;
