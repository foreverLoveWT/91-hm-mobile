import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'

dayjs.extend(relativeTime)

export default {
  install (Vue) {
    Vue.prototype.$mynotify = (params) => Vue.prototype.$notify({ duration: 800, ...params })
    Vue.prototype.$sleep = sleep
    Vue.filter('relTime', relTime)
  }
}

// 封装延迟处理函数
function sleep (time = 500) {
  return new Promise(function (resolve) {
    setTimeout(() => resolve(), time)
  })
}

// 时间格式化
function relTime (value) {
  return dayjs().locale('zh-cn').from(value)
}
