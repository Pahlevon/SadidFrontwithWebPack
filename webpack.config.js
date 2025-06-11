'use strict'


const path = require('path')
const autoprefixer = require('autoprefixer')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const miniCssExtractPlugin = require('mini-css-extract-plugin')



module.exports = {
  mode: 'development',
  entry: './src/js/main.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    static: path.resolve(__dirname, 'dist'),
    port: 8081,
    hot: true
  },
  plugins: [
    new HtmlWebpackPlugin({ template: './src/index.html' }),
    new miniCssExtractPlugin()
  ],
  resolve: {
    extensions: ['.js', '.scss']
  },
  module: {
    rules: [
      
        {
          mimetype: 'image/svg+xml',
          scheme: 'data',
          type: 'asset/resource',
          generator: {
            filename: 'icons/[hash].svg'
          }
        },
        , {
          test: /\.js$/,
          exclude: [/node_modules/, /\.scss$/],
          use: {
            loader: 'babel-loader',
            options: {
              sourceType: 'module',
              presets: ['@babel/preset-env']
            }
          }
        },
        {
          test: /\.(scss)$/,
          type: 'javascript/auto',
          use: [
            {
              // Extracts CSS for each JS file that includes CSS loader: miniCssExtractPlugin.loader
              loader: 'style-loader'
            },
            {
              // Interprets `@import` and `url()` like `import/require()` and will resolve them
              loader: 'css-loader'
            },
            {
              // Loader for webpack to process CSS with PostCSS
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: [
                    autoprefixer
                  ]
                }
              }
            },
            {
              // Loads a SASS/SCSS file and compiles it to CSS
              loader: 'sass-loader',
              options: {
                sassOptions: {
                  // Optional: Silence Sass deprecation warnings. See note below.
                  silenceDeprecations: [
                    'mixed-decls',
                    'color-functions',
                    'global-builtin',
                    'import'
                  ]
                }
              }
            }
          ]
        }
      ]
  }
}