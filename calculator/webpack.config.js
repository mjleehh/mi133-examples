const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const webpack = require('webpack')
const path = require('path')

const OUTPUT_FOLDER = 'dist'

module.exports = {
    entry: './src/index.jsx',
    output: {
        path: path.join(__dirname, OUTPUT_FOLDER),
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ]
            },
            {
                test: /\.scss$/,
                use: [ 'style-loader', 'css-loader', 'sass-loader']
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json']
    },
    plugins: [
      new CleanWebpackPlugin([OUTPUT_FOLDER]),
      new CopyWebpackPlugin([{from: 'app.yaml'}]),
      new HtmlWebpackPlugin({template: path.join(__dirname, 'index.html')})
    ],
    devtool: 'source-map',
}
