import request from '../index.js'
export const getUserInfo = () => {
  return request({
    url: 'mock/getInfo'
  })
}