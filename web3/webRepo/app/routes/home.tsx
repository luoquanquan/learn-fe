import type { Route } from './+types/home'
import Home from '../pages/home'

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Home' }]
}

export default function HomePage() {
  return <Home />
}
