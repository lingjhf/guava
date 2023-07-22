import { lazy } from 'solid-js'
import { Loading } from '../../components/loading'

const SwitchBaseLazy = lazy(() => import('./switch-base-lazy'))

export const SwitchBaseUsage = () => {
  return (
    <Loading>
      <SwitchBaseLazy />
    </Loading>
  )
}

