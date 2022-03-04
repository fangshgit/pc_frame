/**
 * @description 4个子配置，vue/cli配置|通用配置|i18配置|网络配置导出
 *              config中的部分配置由vue.config.js读取，本质是node，故不可使用window等浏览器对象
 */
const cli = require('./cli.config.js')
const setting = require('./setting.config.js')
const i18 = require('./i18.config.js')
const network = require('./net.config.js')
module.exports = {
  ...cli,
  ...setting,
  ...i18,
  ...network,
}
