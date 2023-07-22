import { lazy } from 'solid-js'
import { Loading } from '../../components/loading'

const AlertCenterLazy = lazy(() => import('./alert-center-lazy'))

export const AlertCenterUsage = () => {

  return (
    <Loading>
      <AlertCenterLazy />
    </Loading>
  )
}
