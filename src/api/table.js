import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/power/instances/ipmistatus/',
    method: 'get',
    params
  })
}
