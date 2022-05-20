const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
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
                '@babel/plugin-syntax-dynamic-import',
              ],
            },
          },
        },
        {
          test: /\.(frag|vert|glsl)$/,
          use: { loader: 'glsl-shader-loader' },
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, './src/index.html'),
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, './src/assets'),
            to: '.',
          },
        ],
      }),
    ],
    resolve: { extensions: ['', '.js', '.jsx'] },
  };

  if (development) {
    result.module.rules[0].use.options.plugins.push('module:react-refresh/babel');
    result.devtool = 'eval-source-map';
    result.devServer = {
      static: {
        directory: path.resolve(__dirname, './dist'),
      },
      port: 4444,
      historyApiFallback: true,
      hot: true,
    };

    result.plugins.push(
      new ReactRefreshWebpackPlugin({
        include: /\.(js(x?)|frag|vert|glsl)$/i,
      }),
    );
  }

  return result;
};
