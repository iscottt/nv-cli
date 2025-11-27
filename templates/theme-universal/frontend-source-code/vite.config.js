import { defineConfig } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'
import copy from 'rollup-plugin-copy'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
	build: {
		rollupOptions: {
			input: {
				main: path.resolve(__dirname, 'application.html'),
			},
			output: {
				entryFileNames: `assets/[hash].js`,
				chunkFileNames: `assets/[hash].js`,
				assetFileNames: `assets/[hash].[ext]`,
			}
		},
		outDir: path.resolve(__dirname, '../web'),
	},
	server: {
		open: true,
		port: 3000,
		proxy:{
			'/vite-proxy': {
				target: 'http://localhost:8081',
				changeOrigin: true,
				rewrite: path => path.replace(/^\/vite-proxy/, '')
			},
			'/uploads': {
				target: 'http://localhost:8081/uploads',
				changeOrigin: true,
				rewrite: path => path.replace(/^\/uploads/, '')
			}
		}
	},
	optimizeDeps: {
		include: [
			"axios",
		]
	},
	resolve: {
		alias: {
			'/@': path.resolve(__dirname, './src'), // 键必须以斜线开始
		},
	},
	tsconfig: {
		"compilerOptions": {
			"types": ["vite/client"]
		}
	},
	plugins: [
		vue({
			template: {
				compilerOptions: {
					isCustomElement: tag=>tag.startsWith("block-")
				}
			}
		}),
		AutoImport({
			imports: [
			{
				'naive-ui': [
				'useDialog',
				'useMessage',
				'useNotification',
				'useLoadingBar'
				]
			}
			]
		}),
		Components({
			resolvers: [NaiveUiResolver()]
		})
	],
})