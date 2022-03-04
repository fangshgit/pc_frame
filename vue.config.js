/**
 * @description vue.config.js全局配置
 */
const path = require('path')

const { publicPath } = require('./src/config/router.config')
const { assetsDir, outputDir, lintOnSave, transpileDependencies, devPort, providePlugin, buildGzip, imageCompression,dllRely } = require('./src/config/cli.config')
const { title, abbreviation } = require('./src/config/setting.config.js')

const { version, author } = require('./package.json')
const Webpack = require('webpack')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = ['html', 'js', 'css']
process.env.VUE_APP_TITLE = title
process.env.VUE_APP_AUTHOR = author
process.env.VUE_APP_VERSION = version
const resolve = dir => {
	return path.join(__dirname, dir)
}

module.exports = {
	publicPath,
	assetsDir,
	outputDir,
	lintOnSave,
	transpileDependencies,
	devServer: {
		hot: true,
		port: devPort,
		open: true,
		noInfo: false,
		overlay: {
			warnings: true,
			errors: true
		},
		// host: '127.0.0.1',
		// 注释掉的地方是前端配置代理访问后端的示例
		// baseURL必须为/xxx，而不是后端服务器，请先了解代理逻辑，再设置前端代理
		// ！！！一定要注意！！！
		// 1.这里配置了跨域及代理只针对开发环境生效
		// 2.不建议你在前端配置跨域，建议你后端配置Allow-Origin,Method,Headers，放行token字段，一步到位
		// 3.后端配置了跨域，就不需要前端再配置，会发生Origin冲突
		proxy: {
			'/mock': {
				target: 'http://192.168.1.23:8080',
				secure: true,
				pathRewrite: {
					'/mock': '/'
				}
			},
			'/': {
				target: 'http://192.168.1.23:8080',
				ws: true,
				changeOrigin: true
			}
		}
	},

	configureWebpack() {
		let plugins = [];
		dllRely.map(item =>
			plugins.push(
				new Webpack.DllReferencePlugin({
					context: __dirname,
					manifest: require(path.resolve(__dirname, `./public/dll/js/${item}-manifest.json`))
				})
			)
		)
		return {
			resolve: {
				alias: {
					'~': resolve('.'),
					'@': resolve('src'),
					api: resolve('src/request/api')
				}
			},
			plugins: [
				// 需要自动注入并加载的模块
				new Webpack.ProvidePlugin(providePlugin),
				...plugins
			]
		}
	},
	chainWebpack(config) {
		// 注入需要加载的dll资源到public下的index.html文件
		// args即为htmlWebpackPlugin.options
		// 通过获取htmlWebpackPlugin.options可获取到注入的数据
		config.plugin('html').tap(args => {
			let arr = []
			dllRely.map(item => {
				arr.push(`./dll/js/${item}.dll.js`)
			})
			args[0].dllJs = arr
			return args
		})

		config.resolve.symlinks(true)
		config.module
			.rule('vue')
			.use('vue-loader')
			.loader('vue-loader')
			.tap(options => {
				// xss配置
				options.compilerOptions.directives = {
					html(node, directiveMeta) {
						;(node.props || (node.props = [])).push({
							name: 'innerHTML',
							value: `xss(_s(${directiveMeta.value}))`
						})
					}
				}
				return options
			})

		config.when(process.env.NODE_ENV === 'production', config => {
		 config.performance.set('hints', false)
			config.devtool('none')
			if (buildGzip)
				// 打包压缩
				config.plugin('compression').use(CompressionWebpackPlugin, [
					{
						filename: '[path][base].gz[query]',
						algorithm: 'gzip',
						test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
						threshold: 8192,
						minRatio: 0.8
					}
				])
		})
	},
	runtimeCompiler: true,
	productionSourceMap: false,
	css: {
		requireModuleExtension: true,
		sourceMap: true,
		loaderOptions: {
			scss: {
				// scss变量全局注入
				additionalData(content, loaderContext) {
					const { resourcePath, rootContext } = loaderContext
			  const relativePath = path.relative(rootContext, resourcePath)
					if (relativePath.replace(/\\/g, '/') !== 'src/init/styles/_theme.scss') return '@import "~@/init/styles/_theme.scss";' + content
					return content
				}
			}
		},
		extract:
			process.env.NODE_ENV === 'production'
				? {
						ignoreOrder: true
				  }
				: false
	}
}
