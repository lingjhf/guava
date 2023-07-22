import { lazy } from 'solid-js'
import { Loading } from '../../components/loading'

const PaginationBaseLazy = lazy(() => import('./pagination-base-lazy'))

export const PaginationBaseUsage = () => {
  return (
    <Loading>
      <PaginationBaseLazy />
    </Loading>
  )
}
