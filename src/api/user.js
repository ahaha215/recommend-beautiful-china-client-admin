import request from '@/utils/request'

// export function login(data) {
//   return request({
//     url: '/vue-admin-template/user/login',
//     method: 'post',
//     data
//   })
// }

export function login(data) {
  return request({
    url: '/ucenterservice/user/login',
    method: 'post',
    data
  })
}

// export function getInfo(token) {
//   return request({
//     url: '/vue-admin-template/user/info',
//     method: 'get',
//     params: { token }
//   })
// }

export function getInfo(token) {
  return request({
    url: '/ucenterservice/user/getUserInfo',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}


// --------------------------------------------------------

export function addUser(user) {
  return request({
    url: `/ucenterservice/user/addUser`,
    method: 'post',
    data: user
  })
}

export function delUser(userId) {
  return request({
    url: `/ucenterservice/user/delUser/${userId}`,
    method: 'delete'
  })
}

export function updateUserInfo(user) {
  return request({
    url: `/ucenterservice/user/updateUserInfo`,
    method: 'post',
    data: user
  })
}

export function findUserById(userId) {
  return request({
    url: `/ucenterservice/user/findUserById/${userId}`,
    method: 'get'
  })
}

export function pageUserList(current,limit) {
  return request({
    url: `/ucenterservice/user/pageUserList/${current}/${limit}`,
    method: 'get'
  })
}
