const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const deps = require("./package.json").dependencies;
module.exports = {
    output: {
        publicPath: "http://localhost:8080/",
      },
    mode: 'development',
    devServer: {
        port: 8080,
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env', '@babel/preset-react'],
                },
            },
        ],
    },
    resolve: {
        modules: [path.resolve('./src'), path.resolve('./node_modules')],
        extensions: ['*', '.js', '.jsx'],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
        }),
        new ModuleFederationPlugin({
            name: 'container',
            remotes: {
                calendar_card:
                    'calendar_card@http://localhost:3002/remoteEntry.js',
            },
            shared:{
                react: {
                    singleton: true,
                    requiredVersion: deps.react,
                    eager: true,
                  },
                  'react-dom': {
                    singleton: true,
                    requiredVersion: deps['react-dom'],
                    eager: true,
                  },
                  '@/': {
                    requiredVersion: deps['@common'],
                    version: DEPS['@common'],
                  }
            },
        }),
    ],
};
