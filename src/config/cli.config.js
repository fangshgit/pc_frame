/**
 * @description 导出vue/cli配置，以下所有配置修改需要重启项目
 */
// 将长期不会变动的的库文件提取出来，先打包到dll目录下,减少项目打包的时间
// 提取的库文件必须是长期不会变动的，如果其中某个库版本有变动或者新增、删除了某个库，都必须重新执行npm run build:dll来更新dll
const dllEntry = {
	// 需要提取的库文件
	vue: ['vue', 'vue-router', 'vuex'], // 打包 vue、vue-router、vuex依赖打包到一个叫 vue 的dll模块中去
	elementui: ['element-ui'],
	axios: ['axios']
}

module.exports = {
	// 生产环境构建文件的目录名
	outputDir: 'dist',
	// 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
	assetsDir: 'static',
	// 开发环境每次保存时是否输出为eslint编译警告
	lintOnSave: false,
	// 进行编译的依赖
	transpileDependencies: ['resize-detector'],
	// 开发环境端口号
	devPort: 81,
	// 需要自动注入并加载的模块
	providePlugin: {
		component: {
			libraryName: 'element-ui',
			style: false // 不打包element的样式文件
		}
	},
	dllEntry,
	// 需要加载的dll资源
	dllRely: Object.keys(dllEntry),
	// npm run build时是否生成gzip
	buildGzip: false
}
