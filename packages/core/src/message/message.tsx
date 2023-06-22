import { Portal, Show } from 'solid-js/web'
import { GuavaParentProps, ValueChanged } from '../types'
import { generateSplitEventHandlersProps, mergeStyles } from '../utils'
import { Match, Switch, createEffect, createSignal, onMount } from 'solid-js'
import { InfoCircleOutlined } from '../icon/info-circle-outlined'
import { CheckCircleOutlined } from '../icon/check-circle-outlined'
import { WarnCircleOutlined } from '../icon/warn-circle-outlined'
import { CloseCircleOutlined } from '../icon/close-circle-outlined'
import { CloseFilled } from '../icon/close-filled'
import styles from './message.module.css'
import { createStore, produce } from 'solid-js/store'

export type MessageType = 'default' | 'success' | 'warn' | 'danger'
export interface MessageProps extends GuavaParentProps<HTMLDivElement> {
  message: string
  visible: boolean
  type: MessageType
  closable: boolean
  duration: number
  closed?: VoidFunction
}

const [messages, setMessages] = createStore<{ top: number, setIndex: ValueChanged<number> }[]>([])

const messageTypeClasses: Record<MessageType, string> = {
  'default': styles.messageDefault,
  'success': styles.messageSuccess,
  'warn': styles.messageWarn,
  'danger': styles.messageDanger,
}

export const Message = (propsRaw: Partial<MessageProps>) => {

  const [eventHandlers, props] = generateSplitEventHandlersProps(
    propsRaw,
    {
      message: '',
      visible: false,
      type: 'default',
      closable: false,
      duration: 3000,
    }
  )
  let messageRef: HTMLDivElement
  let currentIndex = 0
  const [visible, setVisible] = createSignal(false)

  setMessages(produce(v => {
    currentIndex = v.length
    let top = currentIndex * 40 + 16
    if (currentIndex > 0) {
      top += currentIndex * 20
    }
    v.push({ top, setIndex })
  }))

  const setMessageRef = (el: HTMLDivElement) => {
    messageRef = el
    messageRef.classList.add(styles.message, messageTypeClasses[props.type])
    const message = messages[currentIndex]
    if (message) {
      messageRef.style.setProperty('top', `${message.top}px`)
    }
  }

  createEffect(() => {
    setVisible(props.visible)
  })

  createEffect(() => {
    const type = props.type
    if (messageRef) {
      messageRef.classList.add(messageTypeClasses[type])
    }
  })

  createEffect(() => {
    if (visible()) {
      if (props.duration > 0) {
        setTimeout(() => {
          setVisible(false)
          props.closed?.()
        }, props.duration)
      }
    }
  })

  function setIndex(index: number) {
    currentIndex = index
  }

  function close() {
    setMessages(produce((v) => {
      for (let i = v.length - 1; i > currentIndex; i--) {
        v[i].top = v[i - 1].top
        v[i].setIndex(i - 1)
      }
      v.splice(currentIndex, 1)
    }))
    setVisible(false)
    props.closed?.()
  }

  const MessageIcon = () => {
    return (
      <Switch fallback={<InfoCircleOutlined class={styles.messageIcon} />}>
        <Match when={props.type === 'success'}>
          <CheckCircleOutlined class={styles.messageIcon} />
        </Match>
        <Match when={props.type === 'warn'}>
          <WarnCircleOutlined class={styles.messageIcon} />
        </Match>
        <Match when={props.type === 'danger'}>
          <CloseCircleOutlined class={styles.messageIcon} />
        </Match>
      </Switch>
    )
  }

  return (
    <Show when={visible()}>
      <Portal ref={setMessageRef}>
        <div class={styles.messageContent} >
          <MessageIcon />
          <div>{props.message}</div>
          <Show when={props.closable}>
            <CloseFilled class={styles.messageClosable} onClick={close} />
          </Show>
        </div>
      </Portal>
    </Show>
  )
}

export function showMessage(propsRaw?: Partial<MessageProps>) {
  const props = propsRaw ?? {}
  props.visible = true
  Message(props)
}

