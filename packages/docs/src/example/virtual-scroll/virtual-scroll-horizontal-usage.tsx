import { lazy } from 'solid-js'
import { Loading } from '../../components/loading'

const VirtualScrollHorizontalLazy = lazy(() => import('./virtual-scroll-horizontal-lazy'))

export const VirtualScrollHorizontalUsage = () => {

  return (
    <Loading>
      <VirtualScrollHorizontalLazy />
    </Loading>
  )
}