export default {
  install (Vue) {
    Vue.prototype.$mynotify = (params) => Vue.prototype.$notify({ duration: 800, ...params })
  }
}
