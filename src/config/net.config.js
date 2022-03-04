/**
 * @description 导出网络配置
 **/
module.exports = {
  // 接口地址
  // process.env.NODE_ENV为development代表开发环境，production代表生产环境
  baseURL: process.env.NODE_ENV === 'development' ? '/' : '/',
  // 请求头的contentType
  // 常见的数据格式
  // application/json
  // application/x-www-form-urlencoded
  // multipart/form-data
  contentType: 'application/json',
  // 最长请求时间
  requestTimeout: 10000,
  // 操作正常code，支持String、Array、int多种类型
  successCode: [200, 0, '200', '0'],
  // 数据状态的字段名称
  statusName: 'code',
  // 状态信息的字段名称
  messageName: 'msg',
}
