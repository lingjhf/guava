import { lazy } from 'solid-js'
import { Loading } from '../../components/loading'

const DrawerFootLazy = lazy(() => import('./drawer-header-lazy'))

export const DrawerHeaderUsage = () => {
  return (
    <Loading>
      <DrawerFootLazy />
    </Loading>
  )
}

