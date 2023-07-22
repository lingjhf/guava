import { lazy } from 'solid-js'
import { Loading } from '../../components/loading'

const InputSizeLazy = lazy(() => import('./input-size-lazy'))

export const InputSizeUsage = () => {
  return (
    <Loading>
      <InputSizeLazy />
    </Loading>
  )
}

