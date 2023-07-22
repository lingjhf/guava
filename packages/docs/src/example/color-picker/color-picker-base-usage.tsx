import { lazy } from 'solid-js'
import { Loading } from '../../components/loading'

const ColorPickerBaseLazy = lazy(() => import('./color-picker-base-lazy'))

export const ColorPickerBaseUsage = () => {

  return (
    <Loading>
      <ColorPickerBaseLazy />
    </Loading>
  )
}

