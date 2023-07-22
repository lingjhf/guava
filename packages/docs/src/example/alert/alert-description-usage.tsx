import { lazy } from 'solid-js'
import { Loading } from '../../components/loading'

const AlertDescriptionLazy = lazy(() => import('./alert-description-lazy'))

export const AlertDescriptionUsage = () => {
  return (
    <Loading>
      <AlertDescriptionLazy />
    </Loading>
  )
}
