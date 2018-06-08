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
					test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, 
					loader: "url-loader?limit=10000&mimetype=application/font-woff" 
				},
				{ 
					test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, 
					loader: "file-loader" 
				},
			]
		}
	}
}