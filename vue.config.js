const CompressionPlugin = require('compression-webpack-plugin')

module.exports = {
  devServer: {
    port: '8082',
    proxy: {
      '/capi': {
        target: 'http://www.testweb.fssocks.com',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/capi': '/'
        }
      }
    }
  },
  productionSourceMap: false,
  configureWebpack: {
    plugins: [
      new CompressionPlugin({
        test: /\.js$|\.css$/i,
        deleteOriginalAssets: false
      })
    ]
  }
}