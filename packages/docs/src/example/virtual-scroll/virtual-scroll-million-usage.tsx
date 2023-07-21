import { lazy } from 'solid-js'
import { Loading } from '../../components/loading'

const VirtualScrollMillionLazy = lazy(() => import('./virtual-scroll-million-lazy'))

export const VirtualScrollMillionUsage = () => {

  return (
    <Loading>
      <VirtualScrollMillionLazy />
    </Loading>
  )
}