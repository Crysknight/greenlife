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
				use: extractPlugin.extract({
					use: ['css-loader', 'sass-loader']
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
				use: ['html-loader']
			},
			{
				test: /\.(jpe?g|png|svg|gif)$/,
				include: path.resolve(__dirname, 'src/img'),
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[hash:6].[ext]',
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
			},
			{
				test: /\.mp4$/,
				use: {
					loader: 'file-loader',
					options: {
						outputPath: 'videos/'
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
			Util: 'exports-loader?Util!bootstrap/js/dist/util',
			Dropdown: 'exports-loader?Dropdown!bootstrap/js/dist/dropdown',
			slick: 'slick-carousel'
		}),
		extractPlugin,
		new HtmlWebpackPlugin({
			template: 'src/index.ejs'
		}),
		new CleanWebpackPlugin(['dist'])
	]
};