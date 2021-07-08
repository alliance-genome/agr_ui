const path = require('path');

/**
 * Export a function. Accept the base config as the only param.
 * @param {Object} options
 * @param {Required<import('webpack').Configuration>} options.config
 * @param {'DEVELOPMENT' | 'PRODUCTION'} options.mode - change the build configuration. 'PRODUCTION' is used when building the static version of storybook.
 */
module.exports = async ({ config, mode }) => {
  // Make whatever fine-grained changes you need

  const pngRulesIndex = config.module.rules.findIndex((rule) => {
    const { test } = rule;
    return test.toString().includes('png');
  });

  // storybook's default file oader for interferes with the url-loader
  if (pngRulesIndex > -1) {
    config.module.rules[pngRulesIndex].exclude =
      config.module.rules[pngRulesIndex].exclude || [];
    config.module.rules[pngRulesIndex].exclude.push(
      path.resolve(__dirname, '../libs/')
    );
    config.module.rules[pngRulesIndex].exclude.push(
      path.resolve(__dirname, '../apps/')
    );
  }

  // Return the altered config
  return config;
};
