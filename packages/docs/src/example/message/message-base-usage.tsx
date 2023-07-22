import { lazy } from 'solid-js'
import { Loading } from '../../components/loading'

const MessageBaseLazy = lazy(() => import('./message-base-lazy'))

export const MessageBaseUsage = () => {
  return (
    <Loading>
      <MessageBaseLazy />
    </Loading>
  )
}

