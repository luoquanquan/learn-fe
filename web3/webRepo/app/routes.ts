import { type RouteConfig, index, route } from '@react-router/dev/routes'

export default [
  index('routes/home.tsx'),
  route('aesGcm', 'routes/aesGcm.tsx'),
  route('evmDapp', 'routes/evmDapp.tsx')
] satisfies RouteConfig
