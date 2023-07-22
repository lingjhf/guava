import { lazy } from 'solid-js'
import { Loading } from '../../components/loading'

const InputClearableLazy = lazy(() => import('./input-clearable-lazy'))

export const InputClearableUsage = () => {
  return (
    <Loading>
      <InputClearableLazy />
    </Loading>
  )
}

