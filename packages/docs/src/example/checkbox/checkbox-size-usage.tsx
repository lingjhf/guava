import { lazy } from 'solid-js'
import { Loading } from '../../components/loading'

const CheckboxSizeLazy = lazy(() => import('./checkbox-size-lazy'))

export const CheckboxSizeUsage = () => {
  return (
    <Loading>
      <CheckboxSizeLazy />
    </Loading>
  )
}
