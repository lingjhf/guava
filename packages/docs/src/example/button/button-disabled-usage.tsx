import { lazy } from 'solid-js'
import { Loading } from '../../components/loading'

const ButtonDisabledLazy = lazy(() => import('./button-disabled-lazy'))

export const ButtonDisabledUsage = () => {
  return (
    <Loading>
      <ButtonDisabledLazy />
    </Loading>
  )
}

