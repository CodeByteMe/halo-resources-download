import { axios } from '@/utils/request'

export function list(prefix) {
  return axios({
    url: '/api',
    method: 'get',
    params: {
      prefix: prefix
    }
  })
}
