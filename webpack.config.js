const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = (env, argv) => {
	const isProduction = argv.mode === 'production';

	return {
		entry: './src/index.js',
		output: {
			path: path.resolve(__dirname, 'dist'),
			filename: isProduction ? '[name].[contenthash].js' : '[name].js',
			clean: true,
		},
		module: {
			rules: [
				{
					test: /\.(js|jsx)$/,
					exclude: /node_modules/,
					use: {
						loader: 'babel-loader',
						options: {
							presets: ['@babel/preset-env', '@babel/preset-react'],
						},
					},
				},
				{
					test: /\.scss$/,
					use: [
						isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
						'css-loader',
						'sass-loader',
						'postcss-loader',
					],
				},
			],
		},
		plugins: [
			new HtmlWebpackPlugin({
				template: './public/index.html',
			}),
			isProduction &&
				new MiniCssExtractPlugin({
					filename: '[name].[contenthash].css',
				}),
			new CleanWebpackPlugin(),
			isProduction &&
				new CompressionPlugin({
					filename: '[path][base].br',
					algorithm: 'brotliCompress',
					test: /\.(js|css|html|svg)$/,
					compressionOptions: { level: 11 },
					threshold: 10240,
					minRatio: 0.8,
					deleteOriginalAssets: false,
				}),
			isProduction &&
				new CompressionPlugin({
					filename: '[path][base].gz',
					algorithm: 'gzip',
					test: /\.(js|css|html|svg)$/,
					threshold: 10240,
					minRatio: 0.8,
					deleteOriginalAssets: false,
				}),
		].filter(Boolean),
		optimization: {
			minimize: isProduction,
			minimizer: [
				new TerserPlugin({
					terserOptions: {
						compress: {
							drop_console: true,
						},
						format: {
							comments: false,
						},
					},
					extractComments: false,
				}),
				new CssMinimizerPlugin(),
			],
			splitChunks: {
				chunks: 'all',
			},
		},
		devServer: {
			static: {
				directory: path.join(__dirname, 'public'),
			},
			port: 3000,
			hot: true,
			open: true,
		},
		resolve: {
			extensions: ['.js', '.jsx'],
		},
		cache: {
			type: 'filesystem',
		},
		performance: {
			hints: isProduction ? 'warning' : false,
		},
		mode: isProduction ? 'production' : 'development',
		devtool: isProduction ? 'source-map' : 'eval-source-map',
	};
};
