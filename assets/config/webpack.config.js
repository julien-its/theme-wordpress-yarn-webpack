const webpack = require('webpack');

const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const path = require('path');

module.exports = {
    mode: 'production',
    // For production build we want to extract CSS to stand-alone file
    // Provide `extractStyles` param and `bootstrap-loader` will handle it
    entry: ['./assets/build/js/theme.js'],
    output: {
        path: path.join(__dirname, "../../assets/dist/js"),
        filename: "theme.js"
    },
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true // set to true if you want JS source maps
            }),
            new OptimizeCSSAssetsPlugin({})
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({ filename: '../css/style.css', allChunks:true }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
        }),
    ],
    module: {
        rules: [
            { test: /\.css$/, use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'], },
            { test: /\.scss$/, use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'], },
            { test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                // Limiting the size of the woff fonts breaks font-awesome ONLY for the extract text plugin
                // use: "url?limit=10000"
                use: 'url-loader', },
            { test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/, use: 'file-loader', },
        ],
    },
};