import { lazy } from 'solid-js'
import { Loading } from '../../components/loading'

const InputNumberStepLazy = lazy(() => import('./input-number-step-lazy'))

export const InputNumberStepUsage = () => {
  return (
    <Loading>
      <InputNumberStepLazy />
    </Loading>
  )
}

