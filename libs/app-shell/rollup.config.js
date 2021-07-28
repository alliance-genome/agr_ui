const getRollupOptionsDefault = require('@nrwl/react/plugins/bundle-rollup');
const svgr = require('@svgr/rollup').default;

function getRollupOptions(optionsDefault) {
  const options = getRollupOptionsDefault(optionsDefault);
  options.plugins = [...options.plugins, svgr()];
  return options;
}
module.exports = getRollupOptions;
