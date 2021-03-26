const getWebpackConfig = require('@nrwl/react/plugins/webpack');
const path = require('path');

module.exports = function (configOriginal) {
  const config = getWebpackConfig(configOriginal);

  if (config.devServer) {
    config.devServer.proxy = {
      "/api": {
        target: process.env.API_URL || "http://build.alliancegenome.org",
        secure: false
      }
    }
  }

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