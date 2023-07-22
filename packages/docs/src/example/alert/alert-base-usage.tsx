
import { lazy } from 'solid-js'
import { Loading } from '../../components/loading'

const AlertBaseLazy = lazy(() => import('./alert-base-lazy'))

export const AlertBaseUsage = () => {
  return (
    <Loading>
      <AlertBaseLazy />
    </Loading>
  )
}