import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: '/C_PushBox/',  // 添加base配置，值为仓库名称
  server: {
    host: '0.0.0.0',  // 监听所有地址
    port: 5173,       // 指定端口
  },
  resolve: {
    alias: {
      '@': '/src'
    }
  }
})
