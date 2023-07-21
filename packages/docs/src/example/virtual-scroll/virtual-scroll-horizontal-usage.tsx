import { lazy } from 'solid-js'
import { Loading } from '../../components/loading'

const VirtualScrollHorizontalExample = lazy(() => import('./virtual-scroll-horizontal-lazy'))

export const VirtualScrollHorizontalUsage = () => {

  return (
    <Loading>
      <VirtualScrollHorizontalExample />
    </Loading>
  )
}