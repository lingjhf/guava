import { lazy } from 'solid-js'
import { Loading } from '../../components/loading'

const PaginationPrevNextLazy = lazy(() => import('./pagination-prev-next-lazy'))

export const PaginationPrevNextUsage = () => {
  return (
    <Loading>
      <PaginationPrevNextLazy />
    </Loading>
  )
}
