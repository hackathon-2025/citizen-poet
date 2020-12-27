// webpack.config.js
const path = require('path'); // подключаем path к конфигу вебпак
const HtmlWebpackPlugin = require('html-webpack-plugin'); //подключаем html-plugin
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); //подключаем css-plugin

module.exports = {
    entry: { main: './scripts/index.js' }, //точка входа
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js'
      },
        module: {
        rules: [ // rules — это массив правил
          // объект правил для бабеля
          {
            // регулярное выражение, которое ищет все js файлы
            test: /\.js$/,
            // при обработке этих файлов нужно использовать babel-loader
            loader: 'babel-loader',
            // исключает папку node_modules, файлы в ней обрабатывать не нужно
            exclude: '/node_modules/'
          },
          // регулярное выражение, которое ищет все файлы с такими расширениями
          // при обработке этих файлов нужно использовать file-loader
          {
            test: /.(png|svg|jpg|gif)$/,
            loader: 'file-loader?name=./images/[name].[ext]'
          },
          {
            test: /.(eot|ttf|woff|woff2)$/,
            loader: 'file-loader?name=./vendor/[name].[ext]',
          },
          //правило для работы с html
          {
            test: /\.html$/,
            loader: 'html-loader',
          },
          {
            // применять это правило только к CSS-файлам
              test: /\.css$/,
            // при обработке этих файлов нужно использовать
            // MiniCssExtractPlugin.loader и css-loader
              loader:  [MiniCssExtractPlugin.loader,
                {
                    loader: 'css-loader',
                    options: {
                        importLoaders: 1
                    }
                },
                'postcss-loader']
            }
        ]
    },
      plugins: [
        new HtmlWebpackPlugin({
          template: './index.html' // путь к файлу index.html
        }),
        new MiniCssExtractPlugin()
      ]
    };

