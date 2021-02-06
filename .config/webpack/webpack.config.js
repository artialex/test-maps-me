const { config } = require('dotenv')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CircularDependencyPlugin = require('circular-dependency-plugin')
const { TsconfigPathsPlugin } = require('tsconfig-paths-webpack-plugin')

const { Dirs } = require('../dirs')

config()

module.exports = {
  entry: [Dirs.src('client/main.tsx')],

  output: {
    path: Dirs.root('dist'),
    filename: '[name].bundle.js',
    chunkFilename: '[name].chunk.js',
  },

  plugins: [
    new CleanWebpackPlugin({
      cleanStaleWebpackAssets: false, // ?
    }),

    new HtmlWebpackPlugin({
      template: Dirs.src('client/index.ejs'),
      NODE_ENV: process.env.NODE_ENV,
    }),

    new webpack.EnvironmentPlugin({
      NODE_ENV: process.env.NODE_ENV,
    }),
  ],

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        include: /src/,
        exclude: /mode_modules/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              happyPackMode: true,
              transpileOnly: true,
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                auto: true,
                localIdentName: '[name]__[local]--[hash:base64:5]',
              },
            },
          },
        ],
      },
    ],
  },

  resolve: {
    symlinks: false,
    extensions: ['.js', '.ts', '.tsx'],
    plugins: [new TsconfigPathsPlugin()],
  },
}

/* -- Configuration for `development` --------------------------------------- */

if (process.env.NODE_ENV === 'development') {
  module.exports.mode = 'development'
  module.exports.devtool = 'eval-cheap-module-source-map'
  module.exports.entry.unshift('webpack-hot-middleware/client')
  module.exports.plugins.push(new CircularDependencyPlugin({ include: /src/ }))
  module.exports.plugins.push(new webpack.HotModuleReplacementPlugin())
}

/* -- Configuration for `production` ---------------------------------------- */

if (process.env.NODE_ENV === 'production') {
  module.exports.mode = 'production'
  module.exports.plugins.push(new CircularDependencyPlugin({ include: /src/, failOnError: true }))
}
