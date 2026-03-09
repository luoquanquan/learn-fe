import type { Route } from './+types/evmDapp'
import EvmDapp from '../pages/EvmDapp'

export function meta({}: Route.MetaArgs) {
  return [{ title: 'EvmDapp' }]
}

export default function EvmDappPage() {
  return <EvmDapp />
}
