import { lazy } from 'solid-js'
import { Loading } from '../../components/loading'

const DrawerBaseLazy = lazy(() => import('./drawer-base-lazy'))

export const DrawerBaseUsage = () => {
  return (
    <Loading>
      <DrawerBaseLazy />
    </Loading>
  )
}

