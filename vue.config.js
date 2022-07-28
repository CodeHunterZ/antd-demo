const { defineConfig } = require('@vue/cli-service')
// 头部引入

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
    configureWebpack: {
    resolve: {
      fallback: { path: require.resolve('path-browserify') }
    }
  }
})


