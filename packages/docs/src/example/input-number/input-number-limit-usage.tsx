import { lazy } from 'solid-js'
import { Loading } from '../../components/loading'

const InputNumberLimitLazy = lazy(() => import('./input-number-limit-lazy'))

export const InputNumberLimitUsage = () => {
  return (
    <Loading>
      <InputNumberLimitLazy />
    </Loading>
  )
}

