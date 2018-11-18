module.exports = {
    // 解决开发环境配置 host 而导致 'Invalid Host Header'
    devServer: {
      disableHostCheck: true
    }
  }