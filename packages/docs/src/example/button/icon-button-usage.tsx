import { lazy } from 'solid-js'
import { Loading } from '../../components/loading'

const IconButtonLazy = lazy(() => import('./icon-button-lazy'))

export const IconButtonUsage = () => {
  return (
    <Loading>
      <IconButtonLazy />
    </Loading>
  )
}

