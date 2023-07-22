import { lazy } from 'solid-js'
import { Loading } from '../../components/loading'

const ListGroupLazy = lazy(() => import('./list-group-lazy'))

export const ListGroupUsage = () => {
  return (
    <Loading>
      <ListGroupLazy />
    </Loading>
  )
}

