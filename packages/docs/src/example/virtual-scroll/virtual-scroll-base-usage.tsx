import { lazy } from 'solid-js'
import { Loading } from '../../components/loading'

const VirtualScrollBaseLazy = lazy(() => import('./virtual-scroll-base-lazy'))

export const VirtualScrollBaseUsage = () => {

  return (
    <Loading>
      <VirtualScrollBaseLazy />
    </Loading>
  )
}