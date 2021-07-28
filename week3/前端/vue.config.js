const requireHttp = require('webpack-require-http')
const url = 'http://localhost:4000/'

module.exports = {
    lintOnSave: false,
    publicPath: './',
    configureWebpack: {
        externals: [
            requireHttp
        ]
    },
    devServer: {
        disableHostCheck: true,
        port: 8080,
        proxy: {
          '/': {
            target: url,
            ws: false, // 需要websocket 开启
            pathRewrite: {
              '^/': '/'
            }
          }
          // 3.5 以后不需要再配置
        }
      }
}