const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractPlugin = new ExtractTextPlugin({
	filename: 'css/styles.css'
});
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
	entry: './src/js/index.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'js/scripts.js',
		publicPath: '/'
	},
	module: {
		rules: [
			{
				test: /\.scss$/,
				include: path.resolve(__dirname, 'src/css'),
				use: extractPlugin.extract({
					use: [
						{
							loader: 'css-loader',
							options: {
								root: '..',
								url: false
							}
						}, 
						'postcss-loader', 
						'sass-loader'
					]
				})
			},
			{
				test: /\.css$/,
				use: extractPlugin.extract({
					use: [
						{
							loader: 'css-loader'
						}
					]
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
						interpolate: true,
						minimize: false
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
							name: 'img/[name].[ext]'
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
						name: 'fonts/[name].[ext]',
						publicPath: '../'
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
			template: 'src/index.html',
			minify: false
		}),
		new HtmlWebpackPlugin({
			filename: 'catalogue.html',
			template: 'src/catalogue.html',
			minify: false
		}),
		new HtmlWebpackPlugin({
			filename: 'article.html',
			template: 'src/article.html',
			minify: false
		}),
		new HtmlWebpackPlugin({
			filename: 'terms.html',
			template: 'src/terms.html',
			minify: false
		}),
		new HtmlWebpackPlugin({
			filename: 'contacts.html',
			template: 'src/contacts.html',
			minify: false
		}),
		new HtmlWebpackPlugin({
			filename: 'press.html',
			template: 'src/press.html',
			minify: false
		}),
		new HtmlWebpackPlugin({
			filename: 'photo-gallery.html',
			template: 'src/photo-gallery.html',
			minify: false
		}),
		new CleanWebpackPlugin(['dist'])
	]
};