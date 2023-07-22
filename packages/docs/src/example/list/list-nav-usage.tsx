import { lazy } from 'solid-js'
import { Loading } from '../../components/loading'

const ListNavLazy = lazy(() => import('./list-nav-lazy'))

export const ListNavUsage = () => {
  return (
    <Loading>
      <ListNavLazy />
    </Loading>
  )
}

