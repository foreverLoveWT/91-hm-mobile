import request from '@/utils/request'
export function getMyChannels () {
  return request({
    url: 'user/channels'
  })
}

// 获取所有频道
export function getAllChannels () {
  return request({
    url: '/channels'
  })
}
