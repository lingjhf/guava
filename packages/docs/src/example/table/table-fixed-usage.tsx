import { lazy } from 'solid-js'
import { Loading } from '../../components/loading'

const TableFixedLazy = lazy(() => import('./table-fixed-lazy'))

export const TableFixedUsage = () => {
  return (
    <Loading>
      <TableFixedLazy />
    </Loading>
  )
}

