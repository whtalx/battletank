const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = function config({ development }) {
  const result = {
    mode: development ? 'development' : 'production',
    entry: { script: './index.js' },
    context: path.resolve(__dirname, './src'),
    output: {
      assetModuleFilename: '[hash][ext][query]',
      clean: true,
      filename: '[name].[contenthash].js',
      publicPath: '/',
    },
    module: {
      rules: [
        {
          test: /\.js(x?)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                '@babel/preset-react',
              ],
              plugins: [
                'module:@react-three/babel',
              ],
            },
          },
        },
        {
          test: /\.css$/,
          use: [
            { loader: development ? 'style-loader' : MiniCssExtractPlugin.loader },
            { loader: 'css-loader' },
          ],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({ template: path.resolve(__dirname, './src/index.html') }),
    ],
    resolve: { extensions: ['', '.js', '.jsx'] },
  };

  if (development) {
    result.module.rules[0].use.options.plugins.push('module:react-refresh/babel');
    result.plugins.push(new ReactRefreshWebpackPlugin());
    result.devtool = 'eval-source-map';
    result.devServer = {
      static: {
        directory: path.resolve(__dirname, './dist'),
      },
      port: 4444,
      historyApiFallback: true,
      hot: true,
    };
  } else {
    result.plugins.push(
      new MiniCssExtractPlugin({
        filename: '[name].[contenthash].css',
        chunkFilename: '[id].[contenthash].css',
      }),
    );
  }

  return result;
};
