import { lazy } from 'solid-js'
import { Loading } from '../../components/loading'

const InputBaseLazy = lazy(() => import('./input-base-lazy'))

export const InputBaseUsage = () => {
  return (
    <Loading>
      <InputBaseLazy />
    </Loading>
  )
}

