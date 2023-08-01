import { lazy } from 'solid-js'
import { Loading } from '../../components/loading'

const TableBaseLazy = lazy(() => import('./table-base-lazy'))

export const TabsBaseUsage = () => {
  return (
    <Loading>
      <TableBaseLazy />
    </Loading>
  )
}

