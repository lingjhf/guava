import { lazy } from 'solid-js'
import { Loading } from '../../components/loading'

const CascaderPanelLazy = lazy(() => import('./cascader-panel-lazy'))

export const CascaderPanelUsage = () => {
  return (
    <Loading>
      <CascaderPanelLazy />
    </Loading>
  )
}
