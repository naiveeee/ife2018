const path = require('path')
const MinCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = function(env, argv) {
	var name = env.name ? env.name : 'task_one',
		college = env.college ? env.college : 'mvvm',
		devMode = env.dev,
		collegePath = path.join(__dirname, college)
	return {
		mode: devMode ? 'development' : 'production',
		entry: {
			main: path.join(collegePath, 'src', name, 'index.js')
		},
		output: {
			path: path.join(collegePath, 'dist', name),
			filename: '[name].js'
		},
		plugins: [
			new MinCssExtractPlugin({
				filename: '[name].css',
				chunkFilename: '[name].css'
			}),
			new HtmlWebpackPlugin({
				template: env.college != 'mvvm' ? path.join(collegePath, 'src', name, 'index.html') : './template.html',
				filename: 'index.html'
			})
		],
		resolve: {
			alias: {
				'node_modules': path.resolve(__dirname, 'node_modules'),
				svg: path.resolve(__dirname, 'svg')
			}
		},
		optimization: {
			runtimeChunk: {
				name: 'manifest'
		  },
			splitChunks: {
		  	chunks: "all", // 必须三选一： "initial" | "all"(推荐) | "async" (默认就是async)
				minSize: 30000, // 最小尺寸，30000
				minChunks: 1, // 最小 chunk ，默认1
				maxAsyncRequests: 5, // 最大异步请求数， 默认5
				maxInitialRequests : 3, // 最大初始化请求书，默认3
				automaticNameDelimiter: '~',// 打包分隔符
			}
		},
		module: {
			rules: [
				{
					test: /\.css$/,
					use: [
						devMode ? 'style-loader' : MinCssExtractPlugin.loader,
						'css-loader',
						'postcss-loader'
					]
				},
				{
					test: /\.less$/,
					use: [
					  {
						loader: devMode ? 'style-loader' : MinCssExtractPlugin.loader,
					  },
					  {
						loader: 'css-loader'
					  },
					  {
						loader: 'less-loader'
					  }
					]
				},
				{
					test: /.js$/,
					exclude: /node_modules/,
					use: {
						loader: 'babel-loader'
					}
				},
				{
					test: /\.san$/,
					use: {
						loader: 'san-loader'
					}
				},
				{
					test: /\.svg$/,
					loader: 'svg-sprite-loader',
					include: [path.resolve(__dirname, 'svg')]
				},
				{ 
					test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, 
					loader: "url-loader?limit=10000&mimetype=application/font-woff" 
				},
				{ 
					test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
					exclude: [path.resolve(__dirname, 'svg')],
					loader: "file-loader" 
				},
			]
		}
	}
}