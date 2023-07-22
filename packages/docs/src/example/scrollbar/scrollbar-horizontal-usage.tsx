import { lazy } from 'solid-js'
import { Loading } from '../../components/loading'

const ScrollbarHorizontalLazy = lazy(() => import('./scrollbar-horizontal-lazy'))

export const ScrollbarHorizontalUsage = () => {
  return (
    <Loading>
      <ScrollbarHorizontalLazy />
    </Loading>
  )
}
