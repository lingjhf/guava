import { lazy } from 'solid-js'
import { Loading } from '../../components/loading'

const CheckboxIndeterminateLazy = lazy(() => import('./checkbox-indeterminate-lazy'))

export const CheckboxIndeterminateUsage = () => {
  return (
    <Loading>
      <CheckboxIndeterminateLazy />
    </Loading>
  )
}
