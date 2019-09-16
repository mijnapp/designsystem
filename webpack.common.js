const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackMessages = require('webpack-messages');

module.exports = {
  context: path.resolve(__dirname),
  entry: {
    'components-app': [
      './src/js/common.app.js',
    ],
    'components-styles': './src/scss/components-styles.scss',
  },
  output: {
    filename: 'js/[name].js',
  },
  resolve: {
    modules: [
      process.env.NODE_PATH || 'node_modules',
    ],
  },
  stats: {
    all: false,
    errors: true,
    warnings: true,
    moduleTrace: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "eslint-loader",
        options: {
          emitError: true,
        }
      },       {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {},
          }, {
            loader: 'css-loader',
          }, {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
            },
          }, {
            loader: 'sass-loader',
            options: {},
          }, {
            loader: 'sass-resources-loader',
            options: {
              resources: [
                // Functions
                './src/scss/functions/*.scss',

                // Base
                './src/scss/_variables.scss',
                './src/scss/_fonts.scss',

                // Components
                './src/components/00-algemeen/**/*.scss',
                './src/components/01-componenten/**/*.scss',
              ],
            },
          },
        ],
      },
    ],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'components-styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true,
        },
      },
    },
  },
  plugins: [
    new WebpackMessages({
      name: 'client',
      logger: str => console.log(`>> ${str}`)
    }),
  ],
};
