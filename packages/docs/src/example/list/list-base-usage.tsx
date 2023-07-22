import { lazy } from 'solid-js'
import { Loading } from '../../components/loading'

const ListBaseLazy = lazy(() => import('./list-base-lazy'))

export const ListBaseUsage = () => {
  return (
    <Loading>
      <ListBaseLazy />
    </Loading>
  )
}

