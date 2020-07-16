var nodeExternals = require('webpack-node-externals');

module.exports = {
  mode: 'development',
  target: 'node', // in order to ignore built-in modules like path, fs, etc.
  externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
  output: {
    devtoolModuleFilenameTemplate        : '[absolute-resource-path]',
    devtoolFallbackModuleFilenameTemplate: '[absolute-resource-path]?[hash]'
  },
  devtool: '#inline-cheap-module-source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.(css|scss)$/,
        exclude: /node_modules/,
        use: 'null-loader'
      },
      {
        test: /\.(css|scss)$/,
        exclude: /src/,
        use: 'null-loader'
      },
      {
        test: /\.(jpg|png|ttf|eot|woff|woff2|svg)$/,
        exclude: /node_modules/,
        use: 'null-loader'
      }
    ]
  },
};
