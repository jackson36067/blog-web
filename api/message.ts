import httpInstance from '@/utils/http'

export const GetHistorySessionAPI = () => {
  return httpInstance({
    method: 'GET',
    url: '/session/history',
  })
}
