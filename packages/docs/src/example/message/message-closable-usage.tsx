import { lazy } from 'solid-js'
import { Loading } from '../../components/loading'

const MessageClosableLazy = lazy(() => import('./message-closable-lazy'))

export const MessageClosableUsage = () => {
  return (
    <Loading>
      <MessageClosableLazy />
    </Loading>
  )
}

