import { lazy } from 'solid-js'
import { Loading } from '../../components/loading'

const DrawerFootLazy = lazy(() => import('./drawer-footer-lazy'))

export const DrawerFooterUsage = () => {
  return (
    <Loading>
      <DrawerFootLazy />
    </Loading>
  )
}

