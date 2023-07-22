import { lazy } from 'solid-js'
import { Loading } from '../../components/loading'

const InputNumberBaseLazy = lazy(() => import('./input-number-base-lazy'))

export const InputNumberBaseUsage = () => {
  return (
    <Loading>
      <InputNumberBaseLazy />
    </Loading>
  )
}

