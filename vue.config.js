const ENV = process.env.NODE_ENV;

module.exports = {
  configureWebpack: config => {
    config.externals = {
      vue: 'Vue',
      'element-ui': 'ElementUI',
      'vue-router': 'VueRouter',
      axios: 'axios',
      vuex: 'Vuex'
    }
  },
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].environment = ENV;
        return args;
      });
  }
}
