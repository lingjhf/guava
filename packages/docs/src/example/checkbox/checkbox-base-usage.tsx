import { lazy } from 'solid-js'
import { Loading } from '../../components/loading'

const CheckboxBaseLazy = lazy(() => import('./checkbox-base-lazy'))

export const CheckboxBaseUsage = () => {
  return (
    <Loading>
      <CheckboxBaseLazy />
    </Loading>
  )
}
