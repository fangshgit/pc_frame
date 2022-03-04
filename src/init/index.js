
// 自动化导入插件模块
const Plugins = require.context('./plugins', true, /\.js$/)
Plugins.keys().map(Plugins)