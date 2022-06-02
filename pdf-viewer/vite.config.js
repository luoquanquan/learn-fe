import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import legacy from '@vitejs/plugin-legacy'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0'
  },
  plugins: [vue(), legacy({
    targets: ['> 1%, last 1 version, ie >= 11'],
    polyfills: ['web/structured-clone']
  })]
})
