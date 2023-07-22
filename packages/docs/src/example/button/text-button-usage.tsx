import { lazy } from 'solid-js'
import { Loading } from '../../components/loading'

const TextButtonLazy = lazy(() => import('./text-button-lazy'))

export const TextButtonUsage = () => {
  return (
    <Loading>
      <TextButtonLazy />
    </Loading>
  )
}

