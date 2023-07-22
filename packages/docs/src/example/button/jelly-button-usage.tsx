import { lazy } from 'solid-js'
import { Loading } from '../../components/loading'

const JellyButtonLazy = lazy(() => import('./jelly-button-lazy'))

export const JellyButtonUsage = () => {
  return (
    <Loading>
      <JellyButtonLazy />
    </Loading>
  )
}

