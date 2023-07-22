import { lazy } from 'solid-js'
import { Loading } from '../../components/loading'

const TimePickerPanelLazy = lazy(() => import('./time-picker-panel-lazy'))

export const TimePickerPanelUsage = () => {
  return (
    <Loading>
      <TimePickerPanelLazy />
    </Loading>
  )
}

