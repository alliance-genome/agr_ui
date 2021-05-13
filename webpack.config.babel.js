const path = require('path');
const webpack = require('webpack');

const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const RobotstxtPlugin = require('robotstxt-webpack-plugin');

const folders = {
  NPM: path.resolve(__dirname, './node_modules'),
  APP: path.resolve(__dirname, 'src/index.js'),
  CONTENTBASE: path.resolve(__dirname, 'dist'),
  TEMPLATE: path.resolve(__dirname, 'src/public/index.html'),
  LOGO: path.resolve(__dirname, 'src/public/logo.png'),
  STYLES: path.resolve(__dirname, 'src/style.scss'),
  SRC: path.resolve(__dirname, 'src')
};
const isDev = process.env.NODE_ENV !== 'production';

const robotstxtProdOptions = {
  policy: [
    {
      userAgent: '*',
      allow: '/',
      disallow: '/search',
    },
  ],
  sitemap: [
    'https://www.alliancegenome.org/sitemap.xml',
    'https://www.alliancegenome.org/api/sitemap.xml',
  ],
};
const robotstxtDevOptions = {
  policy: [
    {
      userAgent: '*',
      disallow: '/',
    },
  ],
};

const devServer = {
  disableHostCheck: true,
  contentBase: folders.CONTENTBASE,
  historyApiFallback: true,
  port: process.env.DEV_SERVER_UI_PORT || '2992',
  host: '0.0.0.0',
  hot: true,
  proxy: {
    '/api': {
      target: process.env.API_URL || 'http://localhost:8080',
      secure: false,
      changeOrigin: true
    },
    '/apollo': {
      target: process.env.APOLLO_URL || process.env.API_URL,
      secure: false,
      changeOrigin: true
    },
    '/jbrowse': {
      target: process.env.JBROWSE_URL || process.env.API_URL,
      secure: false,
      changeOrigin: true
    }
  }
};

const plugins = [
  new HtmlWebpackPlugin({
    template: folders.TEMPLATE
  }),
  new FaviconsWebpackPlugin({
    logo: folders.LOGO,
    inject: true,
    title: 'Alliance of Genome Resources'
  }),
  new webpack.EnvironmentPlugin({
    API_URL: '',
  }),
  new MiniCssExtractPlugin({
    filename: '[name].[hash].css',
    chunkFilename: '[id].[hash].css'
  }),
  new RobotstxtPlugin(isDev ? robotstxtDevOptions : robotstxtProdOptions),
];

if (isDev) {
  plugins.push(new webpack.HotModuleReplacementPlugin());
}

module.exports = {
  mode: isDev ? 'development' : 'production',
  entry:[folders.APP],
  output: {
    filename: '[name].[hash].js',
    chunkFilename: '[id].[hash].js',
    path: folders.CONTENTBASE,
    publicPath: '/',
  },
  devtool: isDev ? 'eval-source-map' : 'source-map',
  devServer: isDev ? devServer : undefined,
  module: {
    rules: [
      // run eslint on javascript files before anything else
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['eslint-loader'],
      },

      // transform javascript files according to babel rules
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },

      // transform our own sass files, except for the bootstrap and overrides file
      {
        test: /\.scss$/,
        include: folders.SRC,
        exclude: folders.STYLES,
        use: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: true,
              sourceMap: true,
              importLoaders: 1,
              localIdentName: '[name]__[local]___[hash:base64:5]'
            }
          },
          'sass-loader'
        ]
      },

      // transform third-party sass and css, including our overrides
      {
        test: /\.(css|sass|scss)$/,
        include: [
          folders.NPM,
          folders.STYLES
        ],
        use: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            }
          },
          'sass-loader'
        ]
      },

      // static files
      {
        test: /\.png$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 100000
            }
          }
        ]
      }
    ]
  },
  optimization: {
    minimizer: [
      new TerserPlugin(),
      new OptimizeCSSAssetsPlugin(),
    ]
  },
  plugins,
};
