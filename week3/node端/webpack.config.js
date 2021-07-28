const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
    entry: './src/main.js',
    output:{
        path: path.resolve(__dirname, 'node/dist'),
        filename: 'bundle.js',
        libraryTarget: 'amd'
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    'css-loader'
                ]
            }
        ]
    },/*为.vue文件配置加载器，只支持原生js*/
    plugins: [
        new VueLoaderPlugin()
    ],
    mode: 'development',
};