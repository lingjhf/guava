import { lazy } from 'solid-js'
import { Loading } from '../../components/loading'

const PaginationMaxPagerLazy = lazy(() => import('./pagination-max-pager-lazy'))

export const PaginationMaxPagerUsage = () => {
  return (
    <Loading>
      <PaginationMaxPagerLazy />
    </Loading>
  )
}
