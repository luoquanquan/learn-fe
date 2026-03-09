import { reactRouter } from '@react-router/dev/vite'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

const devOnlyRoutes = () => ({
  name: 'dev-only-routes',
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      if (req.url === '/.well-known/appspecific/com.chrome.devtools.json') {
        res.setHeader('Content-Type', 'application/json')
        res.end(
          JSON.stringify({
            workspace: { root: process.cwd(), uuid: '550e8400-e29b-41d4-a716-446655440000' }
          })
        )
        return
      }
      if (req.url === '/service-worker.js') {
        res.setHeader('Content-Type', 'application/javascript')
        res.setHeader('Cache-Control', 'no-store')
        res.end(
          `// placeholder\nself.addEventListener('install',()=>self.skipWaiting());\nself.addEventListener('activate',()=>self.clients.claim());\n`
        )
        return
      }
      next()
    })
  }
})

export default defineConfig({
  plugins: [devOnlyRoutes(), tailwindcss(), reactRouter(), tsconfigPaths()]
})
