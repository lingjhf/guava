import { lazy } from 'solid-js'
import { Loading } from '../../components/loading'

const AlertClosableLazy = lazy(() => import('./alert-closable-lazy'))

export const AlertClosableUsage = () => {

  return (
    <Loading>
      <AlertClosableLazy />
    </Loading>
  )
}
