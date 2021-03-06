const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

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
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                use: [ 'style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.iscss$/,
                use: [ 'inline-css-webpack-loader']
            }
        ],
    },
    resolve: {
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
