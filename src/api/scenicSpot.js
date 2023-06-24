import request from '@/utils/request'

export function pageAuditedScenicSpotList(condition,current,limit) {
  return request({
    url: `scenicSpotService/scenicSpot/pageConditionScenicSpotList/${condition}/${current}/${limit}`,
    method: 'get'
  })
}

export function auditScenicSpot(scenicSpotAuditDTO) {
  return request({
    url: `/scenicSpotService/scenicSpot/auditScenicSpot`,
    method: 'post',
    data: scenicSpotAuditDTO
  })
}

export function delScenicSpot(scenicSpotId) {
  return request({
    url: `/scenicSpotService/scenicSpot/delScenicSpot/${scenicSpotId}`,
    method: 'delete'
  })
}

export function findScenicSpotById(scenicSpotId) {
  return request({
    url: `/scenicSpotService/scenicSpot/findScenicSpotById/${scenicSpotId}`,
    method: 'get'
  })
}

