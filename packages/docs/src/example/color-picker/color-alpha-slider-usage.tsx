import { lazy } from 'solid-js'
import { Loading } from '../../components/loading'

const ColorAphaSliderLazy = lazy(() => import('./color-alpha-slider-lazy'))

export const ColorAphaSliderUsage = () => {

  return (
    <Loading>
      <ColorAphaSliderLazy />
    </Loading>
  )
}

