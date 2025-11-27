const { defineConfig } = require('@vue/cli-service')
const webpack = require('webpack')
const path = require('path')

module.exports = defineConfig({
	pages: {},
	outputDir: '../dist/',
	transpileDependencies: true,
	runtimeCompiler: false,
	productionSourceMap: false,
	parallel: false,
	filenameHashing: false,
	chainWebpack: (config) => {
		config.optimization.delete('splitChunks');
		config
			.plugin('limitSplitChunks')
			.use(webpack.optimize.LimitChunkCountPlugin, [{ maxChunks: 1 }]);
		config.plugins.delete('html')
		config.plugins.delete('preload')
		config.plugins.delete('prefetch')
		config.optimization.minimize(true)// 开启压缩js代码
	},
	css: {
		extract: {
			filename: '[name].css',
			chunkFilename: '[name].css',
		},
	},
	configureWebpack: {
		entry: './backend/backend.js',
		experiments: {
			outputModule: true,
		},
		output: {
			filename: '[name].js',
			chunkFilename: '[name].js',
			library: {
				type: 'module',
			}
		},
		externalsType: 'var',
		externals: {
			vue: 'nv.Vue'
		},
	},
})
