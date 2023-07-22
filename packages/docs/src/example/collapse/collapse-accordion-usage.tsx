import { lazy } from 'solid-js'
import { Loading } from '../../components/loading'

const CollapseAccordionLazy = lazy(() => import('./collapse-accordion-lazy'))

export const CollapseAccordionUsage = () => {

  return (
    <Loading>
      <CollapseAccordionLazy />
    </Loading>
  )
}

