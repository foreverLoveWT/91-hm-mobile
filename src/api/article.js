import request from '@/utils/request'
export function getArticles (params) {
  return request({
    url: 'http://ttapi.research.itcast.cn/app/v1_1/articles',
    params: { with_top: 1, ...params }
  })
}
// 不感兴趣接口
export function disLikeArticle (data) {
  return request({
    url: '/article/dislikes',
    data,
    method: 'POST'
  })
}

// 举报文章
export function reportArticle (data) {
  return request({
    url: '/article/reports',
    data,
    method: 'POST'
  })
}
