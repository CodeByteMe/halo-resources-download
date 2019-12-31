import { axios } from '@/utils/request'

export function loadDownloadList(parameter) {
  return axios({
    url: '/api',
    method: 'get',
    params: parameter
  })
}
