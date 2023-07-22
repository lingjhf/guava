import { lazy } from 'solid-js'
import { Loading } from '../../components/loading'

const CascaderBaseLazy = lazy(() => import('./cascader-base-lazy'))

export const CascaderBaseUsage = () => {
  return (
    <Loading>
      <CascaderBaseLazy />
    </Loading>
  )
}
