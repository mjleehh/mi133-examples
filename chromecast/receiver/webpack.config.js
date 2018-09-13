const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const GitRevisionPlugin = require('git-revision-webpack-plugin')
const webpack = require('webpack')

const gitRevisionsPlugin = new GitRevisionPlugin()

console.log(GitRevisionPlugin)

module.exports = {
    entry: './src/index.jsx',
    output: {
        path: __dirname + '/www',
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
        new HtmlWebpackPlugin({template: __dirname + '/index.html'}),
        new CleanWebpackPlugin(['www']),
        new webpack.DefinePlugin({
            VERSION: JSON.stringify(gitRevisionsPlugin.version()),
            COMMITHASH: JSON.stringify(gitRevisionsPlugin.commithash()),
            BRANCH: JSON.stringify(gitRevisionsPlugin.branch()),
        })
    ],
    devtool: 'source-map',
}
