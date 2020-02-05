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

// 获取文章搜索
export function suggestion (params) {
  return request({
    url: '/suggestion',
    params
  })
}

// 获取文章搜索结果
export function searchArticle (params) {
  return request({
    url: '/search',
    params
  })
}
// 获取文章详情
export function getArticleInfo (id) {
  return request({
    url: `/articles/${id}`
  })
}

// 获取文章评论或评论回复
export function getComments (params) {
  return request({
    url: '/comments',
    params
  })
}
