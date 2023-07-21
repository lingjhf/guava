import { lazy } from 'solid-js'
import { Loading } from '../../components/loading'

const VirtualScrollBaseExample = lazy(() => import('./virtual-scroll-base-example'))

export const VirtualScrollBaseUsage = () => {

  return (
    <Loading>
      <VirtualScrollBaseExample />
    </Loading>
  )
}