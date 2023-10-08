const getWebpackConfig = require('@nrwl/react/plugins/webpack');
const path = require('path');

/* const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin'); */
const RobotstxtPlugin = require('robotstxt-webpack-plugin');

const isDev = process.env.NODE_ENV !== 'production';

const robotstxtProdOptions = {
  policy: [
    {
      userAgent: '*',
      allow: '/',
      disallow: '/search',
      disallow: '/alliancemine',
      disallow: '/jbrowse',
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
  historyApiFallback: {
    disableDotRule: true
  },
  proxy: {
    '/api': {
      target: process.env.API_URL || 'http://localhost:8080',
      secure: false,
      changeOrigin: true
    },
    '/swagger-ui': {
      target: process.env.API_URL || 'http://localhost:8080',
      secure: false,
      changeOrigin: true
    },
    '/openapi': {
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
/*   new HtmlWebpackPlugin({
    template: folders.TEMPLATE
  }),
  new FaviconsWebpackPlugin({
    logo: folders.LOGO,
    inject: true,
    title: 'Alliance of Genome Resources'
  }),
  new webpack.EnvironmentPlugin({
    ALLIANCE_RELEASE: '[dev]',
  }),
  new MiniCssExtractPlugin({
    filename: '[name].[hash].css',
    chunkFilename: '[id].[hash].css'
  }), */
  new RobotstxtPlugin(isDev ? robotstxtDevOptions : robotstxtProdOptions),
];

module.exports = function (configOriginal) {
  const config = getWebpackConfig(configOriginal);

  config.devServer = {
    ...config.devServer,
    ...devServer,
  };

  config.plugins = [
    ...config.plugins,
    ...plugins,
  ]

  Object.defineProperty(RegExp.prototype, 'toJSON', {
    value: RegExp.prototype.toString,
  });
  // console.log(JSON.stringify(config.module.rules, null, 2));

  /* by default the styles are treated as modules */
  const [styleRule] = config.module.rules.filter(({test}) => (
    test.toString().search(/\.scss/) > -1
  ));

  if (styleRule && styleRule.oneOf) {
    const scssModuleRuleIndex = styleRule.oneOf.findIndex(({test}) => (
      test.test('somepath/style.module.scss')
    ));
    if (scssModuleRuleIndex > -1) {
      styleRule.oneOf.splice(
        scssModuleRuleIndex + 1,
        0,
        {
          ...styleRule.oneOf[scssModuleRuleIndex],
          test: /\.(scss|sass)$/,
          include: path.resolve(__dirname, 'src'),
          exclude: path.resolve(__dirname, 'src/style.scss'),
        },
      );
    }
  }

  // console.log(JSON.stringify(config.module.rules, null, 2));
  return config;
}
