const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const common = require('./webpack.common');
const { STATIC_PATH } = require('./constants');

const configs = merge.smart(common, {
  entry: {
    'components-app': [
      './src/js/generic.app.js',
    ],
  },
  mode: 'development',
  output: {
    path: STATIC_PATH,
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
            loader: 'sass-resources-loader',
            options: {
              resources: [
                // Functions
                './src/scss/functions/*.scss',

                // Base
                './src/scss/_variables.scss',
                './src/scss/_dev-styles.scss',
                './src/scss/_fonts.scss',

                // Components
                './src/components/00-algemeen/**/*.scss',
                './src/components/01-componenten/**/*.scss',
              ],
            },
          },
        ],
      }
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
      // chunkFilename: 'css/[id].css',
    }),
  ],
});

module.exports = configs;
