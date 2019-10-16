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
                test: /\.scss$/,
                use: [ 'style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.(c|cpp)$/,
                use: {
                    loader: 'cpp-wasm-loader',
                    options: {
                        fetchFiles: true,
                        fullEnv: true,
                    }
                }
            }
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    plugins: [
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin([{from: 'app.yaml'}]),
        new HtmlWebpackPlugin({template: path.join(__dirname, 'index.html')})
    ],
    devtool: 'source-map',
}
