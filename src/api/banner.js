import request from '@/utils/request'

export function addBanner(banner) {
  return request({
    url: '/cms/banner/addBanner',
    method: 'post',
    data: banner
  })
}

export function delBanner(bannerId) {
    return request({
      url: `/cms/banner/delBanner/${bannerId}`,
      method: 'delete'
    })
}

export function updateBanner(banner) {
    return request({
      url: `/cms/banner/updateBanner`,
      method: 'post',
      data: banner
    })
}

export function findAllBanner() {
    return request({
      url: `/cms/banner/findAllBanner`,
      method: 'get'
    })
}

export function findBannerById(bannerId) {
    return request({
      url: `/cms/banner/findBannerById/${bannerId}`,
      method: 'get'
    })
}

export function delBannerImage(fileName) {
    return request({
      url: `/oss/banner/delOssFileBanner/${fileName}`,
      method: 'delete'
    })
}
