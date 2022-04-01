

module.exports = {
  // 配置代理
  devServer: {
    host: "localhost",
    port: 8080, //端口号
    proxy: {
      '/api': { // 匹配所有以'/api'开头的请求路径
        target: 'http://127.0.0.1:8000', // 代理目标的基础路径
        changeOrigin: true,
        ws: false, // websocket是否支持
      },
      '/api2': { // 匹配所有以'/api'开头的请求路径
        target: 'http://127.0.0.1:80', // 代理目标的基础路径
        changeOrigin: true,
        pathRewrite: { '^/api2': 'api' }
      },
    }
  }
}
/*
  changeOrigin 设置为true时，服务器收到的请求头中的host 为,localhost:5000
  changeOrigin 设置为false时，服务器收到的请求头中host为：localhost:8080
  changeOrigin 默认为true
 */
