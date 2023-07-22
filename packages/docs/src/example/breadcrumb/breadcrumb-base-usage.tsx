import { lazy } from 'solid-js'
import { Loading } from '../../components/loading'

const BreadcrumbBaseLazy = lazy(() => import('./breadcrumb-base-lazy'))

export const BreadcrumbBaseUsage = () => {
  return (
    <Loading>
      <BreadcrumbBaseLazy />
    </Loading>
  )
}
