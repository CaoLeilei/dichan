module.exports = {
  // cli3 代理是从指定的target后面开始匹配的，不是任意位置；配置pathRewrite可以做替换
  devServer: {
    proxy: {
      '/fd': {
        target: 'http://jzhang.avosapps.us/fd',
        // target: 'http://jzhang.avosapps.us/fd',
        changeOrigin: true,
        pathRewrite: {
          '^/fd': '/'
        }
      }
    }
  }
};