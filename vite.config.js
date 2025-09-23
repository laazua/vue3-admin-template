import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { viteMockServe } from 'vite-plugin-mock'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    // 配置本地mock
    viteMockServe({
      mockPath: 'src/mock', // 指向 mock 目录
      localEnabled: true,   // 开发模式启用
      prodEnabled: false,   // 生产模式禁用
      supportTs: false
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  // 开发监听地址配置
  server: {
    port: 7776,
    host: '0.0.0.0',
  }
})
