import { lazy } from 'solid-js'
import { Loading } from '../../components/loading'

const FormBaseLazy = lazy(() => import('./form-base-lazy'))

export const FormBaseUsage = () => {
  return (
    <Loading>
      <FormBaseLazy />
    </Loading>
  )
}

