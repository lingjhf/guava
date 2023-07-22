import { lazy } from 'solid-js'
import { Loading } from '../../components/loading'

const ListSubheaderLazy = lazy(() => import('./list-subheader-lazy'))

export const ListSubheaderUsage = () => {
  return (
    <Loading>
      <ListSubheaderLazy />
    </Loading>
  )
}

