const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const path = require('path')

const appModulePath = path.resolve(__dirname, 'src')

module.exports = {
    entry: './src/app/index.jsx',
    output: {
        path: __dirname + '/dist',
        filename: 'bundle.js',
    },
    module: {
        rules: [
            // currently broken with webpack 4
            // waiting for fix from project jshint-loader
            // {
            //     test: /\.jsx?$/,
            //     use: 'jshint-loader',
            //     enforce: "pre",
            //     exclude: /node_modules/
            // },
            {
                test: /\.jsx?$/,
                use: 'babel-loader',
                include: [appModulePath]
            },
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader']
            },
            {
                test: /\.gscss$/,
                use: [ 'style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.scss/,
                use: [ 'inline-css-webpack-loader']
            }
        ],
    },
    resolve: {
        modules: [appModulePath, 'node_modules'],
        extensions: ['.js', '.jsx', '.json']
    },
    plugins: [
        new HtmlWebpackPlugin({template: __dirname + '/index.html'}),
        new CleanWebpackPlugin(['dist']),
    ],
    devtool: 'source-map',
    devServer: {
        proxy: {
            "/api": {
                target: "http://localhost:3000/api",
                pathRewrite: {"^/api": ""},
            }
        }
    }
}
