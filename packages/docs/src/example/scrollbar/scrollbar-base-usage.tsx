import { lazy } from 'solid-js'
import { Loading } from '../../components/loading'

const ScrollbarBaseLazy = lazy(() => import('./scrollbar-base-lazy'))

export const ScrollbarBaseUsage = () => {
  return (
    <Loading>
      <ScrollbarBaseLazy />
    </Loading>
  )
}

