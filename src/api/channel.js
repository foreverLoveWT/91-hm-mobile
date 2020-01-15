import request from '@/utils/request'
import store from '@/store'

// 重构我的频道API  本地缓存
const CACHE_CHANNEL_T = 'hm-toutiao-91-t'
const CACHE_CHANNEL_U = 'hm-toutiao-91-u'
export function getMyChannels () {
  // return request({
  //   url: 'user/channels'
  // })
  return new Promise(async function (resolve, reject) {
    let key = store.state.user.token ? CACHE_CHANNEL_U : CACHE_CHANNEL_T
    let str = localStorage.getItem(key)
    if (str) {
      resolve({ channels: JSON.parse(str) })
    } else {
      const data = await request({ url: '/user/channels' })
      localStorage.setItem(key, JSON.stringify(data.channels))
      resolve(data)
    }
  })
}

// 删除本地化
export function delChannel (id) {
  return new Promise(function (resolve, reject) {
    let key = store.state.user.token ? CACHE_CHANNEL_U : CACHE_CHANNEL_T
    let channels = JSON.parse(localStorage.getItem(key))
    let index = channels.findIndex(item => item.id === id)
    if (index > -1) {
      channels.splice(index, 1)
      // 重新写入缓存
      localStorage.setItem(key, JSON.stringify(channels))
      resolve()
    } else {
      reject(new Error('找不到对应频道'))
    }
  })
}

// 获取所有频道
export function getAllChannels () {
  return request({
    url: '/channels'
  })
}
