module.exports = {
  configureWebpack: config => {
    config.externals = {
      vue: 'Vue',
      'element-ui': 'ElementUI',
      'vue-router': 'VueRouter',
      axios: 'axios',
      vuex: 'Vuex'
    }
  }
}
