import { Portal, Show } from 'solid-js/web'
import { GuavaParentProps } from '../types'
import { generateSplitEventHandlersProps } from '../utils'
import { createSignal } from 'solid-js'

export type MessageType = 'info' | 'success' | 'warn' | 'danger'
export interface MessageProps extends GuavaParentProps<HTMLDivElement> {
  type: MessageType
}

export const Message = (propsRaw: Partial<MessageProps>) => {

  const [eventHandlers, props] = generateSplitEventHandlersProps(
    propsRaw,
    {
      type: 'info'
    }
  )

  const [visible, setVisible] = createSignal(false)

  return (
    <Show when={visible()}>
      <Portal>
        <div></div>
      </Portal>
    </Show>
  )
}