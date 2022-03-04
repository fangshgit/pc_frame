/**
 * @description 路由配置
 */
module.exports = {
	// 缓存路由的最大数量
	keepAliveMaxNum: 20,
	// 路由模式，可选值为 history 或 hash
	routerMode: 'hash',
	// hash模式时在不确定二级目录名称的情况下建议使用""代表相对路径或者"/二级目录/"
	// history模式默认使用"/"或者"/二级目录/"，记住只有hash时publicPath可以为空！！！
	publicPath: '',
	// 不经过token校验的路由，白名单路由建议配置到与login页面同级，如果需要放行带传参的页面，请使用query传参，配置时只配置path即可
	routesWhiteList: ['/login', '/callback', '/404', '/404-auth', '/403'],
	// 加载时显示文字
	loadingText: '正在加载中...',
	// token失效回退到登录页时是否记录本次的路由（是否记录当前tab页）
	recordRoute: true,
	// 是否开启登录拦截
	loginInterception: false,
	// intelligence(前端导出路由)和all(后端导出路由)两种方式
	authentication: 'intelligence'
}