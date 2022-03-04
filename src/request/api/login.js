import request from '../index.js'
export const login = data => {
  return request({
    url: 'mock/login',
	method:'post',
	data
  })
}
export const logout = () => {
  return request({
    url: 'mock/logout',
	method: 'delete',
  })
}