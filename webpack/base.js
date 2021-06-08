/* eslint-disable import/no-extraneous-dependencies */
import { DefinePlugin } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin, { loader as _loader } from 'mini-css-extract-plugin';

export const mode = 'development';
export const devtool = 'eval-source-map';
export const module = {
  rules: [
    {
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
        },
      },
    },
    {
      test: [/\.vert$/, /\.frag$/],
      use: 'raw-loader',
    },
    {
      test: /\.css$/i,
      use: [_loader, 'style-loader', 'css-loader'],
    },
    {
      test: /\.(png|svg|jpg|jpeg|gif)$/i,
      type: 'asset/resource',
    },
  ],
};
export const plugins = [
  new DefinePlugin({
    CANVAS_RENDERER: JSON.stringify(true),
    WEBGL_RENDERER: JSON.stringify(true),
  }),
  new HtmlWebpackPlugin({
    template: 'src/template.html',
  }),
  new MiniCssExtractPlugin(),
];
