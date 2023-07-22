import { lazy } from 'solid-js'
import { Loading } from '../../components/loading'

const ColorHueSliderLazy = lazy(() => import('./color-hue-slider-lazy'))

export const ColorHueSliderUsage = () => {

  return (
    <Loading>
      <ColorHueSliderLazy />
    </Loading>
  )
}

