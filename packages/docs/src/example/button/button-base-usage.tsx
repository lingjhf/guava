import { lazy } from 'solid-js'
import { Loading } from '../../components/loading'

const ButtonBaseLazy = lazy(() => import('./button-base-lazy'))

export const ButtonBaseUsage = () => {
  return (
    <Loading>
      <ButtonBaseLazy />
    </Loading>
  )
}

