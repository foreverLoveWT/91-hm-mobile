import request from '@/utils/request'
export function getMyChannels () {
  return request({
    url: 'user/channels'
  })
}
