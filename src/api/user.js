import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/power/instances/ipmistatus/',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/power/instances/ipmistatus/',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/power/instances/ipmistatus/',
    method: 'post'
  })
}
