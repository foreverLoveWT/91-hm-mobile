import request from '@/utils/request'
export function login (data) {
  return request({
    url: '/authorizations',
    data,
    method: 'post'
  })
}
