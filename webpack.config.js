'use strict'


const path = require('path')
const autoprefixer = require('autoprefixer')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const miniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')



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
    new CopyWebpackPlugin({
  patterns: [
    { 
      from: path.resolve(__dirname, 'src/shared/images'), 
      to: path.resolve(__dirname, 'dist/images') 
    },
    // favicon هم اگر نیاز است
    { 
      from: path.resolve(__dirname, 'src/shared/images/favicon.ico'), 
      to: path.resolve(__dirname, 'dist') 
    }
  ]
}),
    new miniCssExtractPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        { from: path.resolve(__dirname, 'src/shared/images/favicon.ico'), to: path.resolve(__dirname, 'dist/favicon.ico') }
      ]
    })
  ],
  resolve: {
    extensions: ['.js', '.scss']
  },
  module: {
    rules: [
      // قانون جدید برای تصاویر (به غیر از SVG)
      {
        test: /\.(png|jpg|jpeg|gif|webp)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name][ext][query]'
        }
      },
      // قانون موجود برای SVG (همین قانون فعلی شما)
      {
        mimetype: 'image/svg+xml',
        scheme: 'data',
        type: 'asset/resource',
        generator: {
          filename: 'icons/[hash].svg'
        }
      },
      // بقیه قوانین...

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