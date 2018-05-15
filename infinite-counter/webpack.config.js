const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
    entry: './src/app/index.js',
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
                test: /\.elm?$/,
                use: {
                  loader: 'elm-webpack-loader',
                  options: {
                    verbose: true,
                    warn: true,
                    debug: true
                  },
                },
                exclude: [/node_modules/, /elm-stuff/]
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
        new HtmlWebpackPlugin({
          template: __dirname + '/index.html.template',
          filename: __dirname + '/dist/index.html'
        }),
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
