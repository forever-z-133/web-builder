import { fileURLToPath } from 'url'
import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import alias from '@rollup/plugin-alias'

const rootPath = path.resolve(fileURLToPath(import.meta.url), '..')

export default defineConfig(() => {
  return {
    server: {
      port: 3000
    },
    build: {
      outDir: 'build',
      sourcemap: true,
      rollupOptions: {
        plugins: [
          alias({
            entries: {
              '@': path.join(rootPath, 'src')
            }
          })
        ]
      }
    },
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.join(rootPath, 'src')
      }
    }
  }
})
