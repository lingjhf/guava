import { lazy } from 'solid-js'
import { Loading } from '../../components/loading'

const ColorSliderLazy = lazy(() => import('./color-slider-lazy'))

export const ColorSliderUsage = () => {

  return (
    <Loading>
      <ColorSliderLazy />
    </Loading>
  )
}

