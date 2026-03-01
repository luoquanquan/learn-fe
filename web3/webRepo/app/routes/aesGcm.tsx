import type { Route } from './+types/aesGcm'
import AesGcm from '../pages/aesGcm'

export function meta({}: Route.MetaArgs) {
  return [{ title: 'AesGcm' }]
}

export default function AesGcmPage() {
  return <AesGcm />
}
