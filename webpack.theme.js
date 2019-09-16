const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const { THEME_BUILD_PATH } = require('./constants');

module.exports = {
  mode: 'development',
  context: path.resolve(__dirname),
  entry: {
    'fractal-app': './theme/js/fractal-app.js',
    'fractal-styles': './theme/scss/fractal-styles.scss',
  },
  output: {
    path: THEME_BUILD_PATH,
    filename: 'js/[name].js',
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'img',
              publicPath: '../img/',
            },
          },
        ],
      }, {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts',
              publicPath: '../fonts/',
            },
          },
        ],
      }, {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {},
          }, {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
          }, {
            loader: 'sass-loader',
            options: {},
          }, {
            loader: 'sass-resources-loader',
            options: {
              resources: [
                // Reset
                './theme/scss/_reset.scss',

                // Functions
                './theme/scss/functions/*.scss',

                // Base
                './theme/scss/_variables.scss',
                './theme/scss/_fonts.scss',
                './theme/scss/_foundation.scss',

                // Components
                './theme/scss/theme-components/*.scss',
                './theme/scss/components/*.scss',
              ],
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
    }),
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        styles: {
          test: /\.css$/,
          name: 'fractal-styles',
          chunks: 'all',
          enforce: true,
        },
      },
    },
  },
};
