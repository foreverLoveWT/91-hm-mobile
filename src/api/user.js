import request from '@/utils/request'
export function login (data) {
  return request({
    url: '/authorizations',
    data,
    method: 'post'
  })
}

// 关注用户
export function followUser (data) {
  return request({
    url: '/user/followings',
    method: 'post',
    data
  })
}
// 取消关注
export function unFollowUser (target) {
  return request({
    url: `/user/followings/${target}`,
    method: 'delete'
  })
}

// 获取用户个人信息
export function getUserInfo () {
  return request({
    url: '/user'
  })
}
