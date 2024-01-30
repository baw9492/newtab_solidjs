import { defineConfig } from 'vite'

import solid from 'vite-plugin-solid'

export default defineConfig({
  plugins: [solid()],
  esbuild: {
    pure: ['console.log'], // 删除 console.log
    drop: ['debugger'], // 删除 debugger
  },
})
