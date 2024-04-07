const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const myLoader = require('./myLoader')
module.exports = {
    entry: {
        playListDetail: ["./src/js/login_status.js", "./src/js/search.js", "./src/js/play_music.js", "./src/js/ge_dan_detail.js"],
        playLists: ["./src/js/login_status.js", "./src/js/ge_dan_s.js"],
        phoneNumberLogin: ["./src/js/login_status.js", "./src/js/other_way_to_login.js"],
        playDetail: ["./src/js/play_music.js", "./src/js/play_detail.js"],
        search: ["./src/js/login_status.js", "./src/js/play_music.js", "./src/js/search_page.js", "./src/js/search.js"],
        login: ["./src/js/login_status.js", "./src/js/login.js"],
        start: ["./src/js/play_music.js", "./src/js/login_status.js", "./src/js/start.js", "./src/js/search.js"],
    },               // 入口文件
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.js$/,
                use: ['./myLoader']
            }
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/html/ge_dan_detail.html",
            filename: 'playListDetail.html',
            chunks: ["playListDetail"],
        }),
        new HtmlWebpackPlugin({
            template: './src/html/ge_dan_s.html',
            filename: 'playLists.html',
            chunks: ['playLists']
        }),
        new HtmlWebpackPlugin({
            template: './src/html/other_way_to_login.html',
            filename: 'phoneNumberLogin.html',
            chunks: ['phoneNumberLogin']
        }),
        new HtmlWebpackPlugin({
            template: './src/html/play_detail.html',
            filename: 'playDetail.html',
            chunks: ['playDetail']
        }),
        new HtmlWebpackPlugin({
            template: './src/html/search.html',
            filename: 'searchPage.html',
            chunks: ['searchPage']
        }),
        new HtmlWebpackPlugin({
            template: './src/html/login.html',
            filename: 'login.html',
            chunks: ['login']
        }),
        new HtmlWebpackPlugin({
            template: "./src/html/start.html",
            filename: 'start.html',
            chunks: ['start']
        })
    ],
    devServer: {},
    optimization: {},
    resolve: {},
}