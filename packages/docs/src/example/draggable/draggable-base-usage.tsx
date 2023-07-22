import { lazy } from 'solid-js'
import { Loading } from '../../components/loading'

const DraggableBaseLazy = lazy(() => import('./draggable-base-lazy'))

export const DraggableBaseUsage = () => {
  return (
    <Loading>
      <DraggableBaseLazy />
    </Loading>
  )
}

