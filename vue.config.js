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
  }
}