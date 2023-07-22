import { lazy } from 'solid-js'
import { Loading } from '../../components/loading'

const CollapseBaseLazy = lazy(() => import('./collapse-base-lazy'))

export const CollapseBaseUsage = () => {

  return (
    <Loading>
      <CollapseBaseLazy />
    </Loading>
  )
}

