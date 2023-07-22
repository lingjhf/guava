import { lazy } from 'solid-js'
import { Loading } from '../../components/loading'

const TabsBaseLazy = lazy(() => import('./tabs-base-lazy'))

export const TabsBaseUsage = () => {
  return (
    <Loading>
      <TabsBaseLazy />
    </Loading>
  )
}

