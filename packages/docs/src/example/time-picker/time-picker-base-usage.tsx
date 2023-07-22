import { lazy } from 'solid-js'
import { Loading } from '../../components/loading'

const TimePickerBaseLazy = lazy(() => import('./time-picker-base-lazy'))

export const TimePickerBaseUsage = () => {
  return (
    <Loading>
      <TimePickerBaseLazy />
    </Loading>
  )
}

