const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractPlugin = new ExtractTextPlugin({
	filename: 'main[hash].css'
});
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
	entry: './src/js/index.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].bundle[hash].js'
		// publicPath: '/'
	},
	module: {
		rules: [
			{
				test: /\.scss$/,
				include: path.resolve(__dirname, 'src/css'),
				use: extractPlugin.extract({
					use: ['css-loader', 'postcss-loader', 'sass-loader']
				})
			},
			{
				test: /\.css$/,
				use: extractPlugin.extract({
					use: ['css-loader']
				})
			},
			{
				test: /\.js$/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							presets: ['es2015']
						}
					}
				]
			},
			{
				test: /\.html$/,
				use: {
					loader: 'html-loader',
					options: {
						interpolate: true
					}
				}
			},
			{
				test: /\.(jpe?g|png|svg|gif|mp4)$/,
				include: [
					path.resolve(__dirname, 'src/img')
				],
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name].[ext]',
							outputPath: 'img/'
							// publicPath: 'img/'
						}
					},
					'image-webpack-loader'
				]
			},
			{
				test: /\.(eot|svg|ttf|woff)$/,
				include: path.resolve(__dirname, 'src/fonts'),
				use: {
					loader: 'file-loader',
					options: {
						outputPath: 'fonts/'
					}
				}
			}
		]
	},
	plugins: [
		// new webpack.optimize.UglifyJsPlugin({
		// 	// ...
		// }),
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery',
			Popper: ['popper.js', 'default'],
			'window.jQuery': 'jquery',
			Util: 'exports-loader?Util!bootstrap/js/dist/util',
			Dropdown: 'exports-loader?Dropdown!bootstrap/js/dist/dropdown',
			slick: 'slick-carousel'
		}),
		extractPlugin,
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: 'src/index.html'
		}),
		new HtmlWebpackPlugin({
			filename: 'catalogue.html',
			template: 'src/catalogue.html'
		}),
		new HtmlWebpackPlugin({
			filename: 'article.html',
			template: 'src/article.html'
		}),
		new HtmlWebpackPlugin({
			filename: 'terms.html',
			template: 'src/terms.html'
		}),
		new HtmlWebpackPlugin({
			filename: 'contacts.html',
			template: 'src/contacts.html'
		}),
		new HtmlWebpackPlugin({
			filename: 'press.html',
			template: 'src/press.html'
		}),
		new CleanWebpackPlugin(['dist'])
	]
};