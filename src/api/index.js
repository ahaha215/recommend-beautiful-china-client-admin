import request from '@/utils/request'

export function statisticsUserInfo() {
  return request({
    url: '/ucenterservice/user/statisticsUserInfoBySex',
    method: 'get'
  })
}

export function statisticsTypeInfo() {
  return request({
    url: '/typeservice/type/statisticsType',
    method: 'get'
  })
}

export function statisticsResourceInfo() {
  return request({
    url: '/resourceservice/resource/statisticsResourceByType',
    method: 'get'
  })
}

export function statisticPostsInfo() {
  return request({
    url: '/postsservice/posts/statisticsPosts',
    method: 'get'
  })
}