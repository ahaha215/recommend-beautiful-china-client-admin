import request from '@/utils/request'


export function addType(type) {
    return request({
      url: '/typeservice/type/addType',
      method: 'post',
      data: type
    })
}

export function delType(typeId) {
    return request({
      url: `/typeservice/type/delType/${typeId}`,
      method: 'delete'
    })
}

export function updateType(type) {
    return request({
      url: '/typeservice/type/updateType',
      method: 'post',
      data: type
    })
}

export function findAll() {
    return request({
      url: '/typeservice/type/findAllType',
      method: 'get'
    })
}

export function findTypeById(typeId) {
    return request({
      url: `/typeservice/type/findTypeById/${typeId}`,
      method: 'get'
    })
}