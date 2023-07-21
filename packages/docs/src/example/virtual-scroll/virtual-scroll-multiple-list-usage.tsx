import { lazy } from 'solid-js'
import { Loading } from '../../components/loading'

const VirtualScrollMultipleListLazy = lazy(() => import('./virtual-scroll-multiple-list-lazy'))

export const VirtualScrollMultipleListUsage = () => {

  return (
    <Loading>
      <VirtualScrollMultipleListLazy />
    </Loading>
  )
}