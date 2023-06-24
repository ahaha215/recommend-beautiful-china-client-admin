import request from '@/utils/request'


export function pageConditionPostsList(condition,current,limit) {
  return request({
    url: `/postsservice/posts/pageConditionPostsList/${condition}/${current}/${limit}`,
    method: 'get'
  })
}

export function auditPosts(postsAuditDTO) {
  return request({
    url: `/postsservice/posts/auditPosts`,
    method: 'post',
    data: postsAuditDTO
  })
}

export function delPosts(postsId) {
  return request({
    url: `/postsservice/posts/delPosts/${postsId}`,
    method: 'delete'
  })
}

export function findPostsById(postsId) {
  return request({
    url: `/postsservice/posts/findPostsById/${postsId}`,
    method: 'get'
  })
}

