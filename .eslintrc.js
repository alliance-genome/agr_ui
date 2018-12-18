const errorInProduction = process.env.NODE_ENV === 'production' ? 'error' : 'off';
const path = require('path');

module.exports = {
  root: true,
  env: {
    node: true,
    browser: true
  },
  plugins: [
    'import',
  ],
  extends: [
    // 'plugin:import/errors',
    // 'plugin:import/warnings',
    'standard',
  ],
  rules: {
    'comma-dangle': 0,
    'quotes': 0,
    'semi': 0,
    'no-trailing-spaces': 0,
    'object-curly-spacing': 0,
    'padded-blocks': 0,
    'indent': 0,
    'space-before-function-paren': 0,
    'space-before-blocks': 0,
    'brace-style': 0,
    'no-unused-vars': 0,
    'no-multi-spaces': 0,
    'no-unused-expressions': 0,
    'comma-spacing': 0,
    'space-infix-ops': 0,
    'no-multiple-empty-lines': 0,
    'space-in-parens': 0,
    'camelcase': 0,
    'spaced-comment': 0,
    'keyword-spacing': 0,
    'eol-last': 0,
    'no-redeclare': 0,
    'key-spacing': 0,
    'no-useless-constructor': 0,
    'arrow-spacing': 0,
    'no-undef': 0,
    'standard/object-curly-even-spacing': 0,
    'no-new': 0,
    'block-spacing': 0,
    'semi-spacing': 0,
    'eqeqeq': 0,
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  settings: {
  },
};
