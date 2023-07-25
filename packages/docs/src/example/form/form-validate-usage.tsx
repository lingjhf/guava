import { lazy } from 'solid-js'
import { Loading } from '../../components/loading'

const FormValidateLazy = lazy(() => import('./form-validate-lazy'))

export const FormValidateUsage = () => {
  return (
    <Loading>
      <FormValidateLazy />
    </Loading>
  )
}

