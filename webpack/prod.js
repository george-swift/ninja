/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved */
const { merge } = require('webpack-merge');
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const base = require('./base.js');

module.exports = merge(base, {
  mode: 'production',
  output: {
    filename: 'bundle.min.js',
    path: path.resolve(__dirname, 'dist'),
    assetModuleFilename: 'images/[hash][ext][query]',
  },
  devtool: false,
  performance: {
    maxEntrypointSize: 1200000,
    maxAssetSize: 1200000,
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          output: {
            comments: false,
          },
        },
      }),
    ],
  },
});
