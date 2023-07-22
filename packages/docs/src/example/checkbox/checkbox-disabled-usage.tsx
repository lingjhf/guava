import { lazy } from 'solid-js'
import { Loading } from '../../components/loading'

const CheckboxDisabledLazy = lazy(() => import('./checkbox-disabled-lazy'))

export const CheckboxDisabledUsage = () => {
  return (
    <Loading>
      <CheckboxDisabledLazy />
    </Loading>
  )
}
