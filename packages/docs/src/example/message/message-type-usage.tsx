import { lazy } from 'solid-js'
import { Loading } from '../../components/loading'

const MessageTypeLazy = lazy(() => import('./message-type-lazy'))

export const MessageTypeUsage = () => {
  return (
    <Loading>
      <MessageTypeLazy />
    </Loading>
  )
}

