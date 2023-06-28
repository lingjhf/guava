import { JSX, Match, Switch } from 'solid-js'
import { Show, createSignal } from 'solid-js'
import { GuavaParentProps, VoidCallback } from '../types'
import { generateSplitEventHandlersProps } from '../utils'
import { WarnCircleFilled } from '../icon/warn-circle-filled'
import { CheckCircleFilled } from '../icon/check-circle-filled'
import { CloseCircleFilled } from '../icon/close-circle-filled'
import { CloseFilled } from '../icon/close-filled'
import styles from './alert.module.css'

export type AlertType = 'info' | 'success' | 'warn' | 'danger'
export interface AlertProps extends GuavaParentProps<HTMLDivElement> {
  title?: JSX.Element
  type: AlertType
  center: boolean
  closable: boolean
  close?: VoidCallback
}

export const Alert = (propsRaw: Partial<AlertProps>) => {
  const [eventHandlers, props] = generateSplitEventHandlersProps(
    propsRaw,
    { type: 'info', center: false, closable: true }
  )

  const typeClasses: Record<AlertType, string> = {
    'info': styles.gAlertInfo,
    'success': styles.gAlertSuccess,
    'warn': styles.gAlertWarn,
    'danger': styles.gAlertDanger
  }

  const [visible, setVisible] = createSignal(true)

  const alertClasses = () => {
    let classes = `${styles.gAlert} ${typeClasses[props.type]}`
    if (props.center) {
      classes += ` ${styles.center}`
    }
    if (props.class) {
      classes += ` ${props.class}`
    }
    return classes
  }

  const alertWithContentClasses = () => {
    let classes = `${styles.gAlertContent} ${typeClasses[props.type]}`
    if (props.center) {
      classes += ` ${styles.center}`
    }
    if (props.class) {
      classes += ` ${props.class}`
    }
    return classes
  }

  function alertClose() {
    setVisible(false)
    props.close?.()
  }

  const AlertIcon = () => (
    <Switch fallback={<WarnCircleFilled class={`${styles.gAlertIcon} ${styles.gAlertIconInfo}`} />}>
      <Match when={props.type === 'success'}>
        <CheckCircleFilled class={`${styles.gAlertIcon} ${styles.gAlertIconSuccess}`} />
      </Match>
      <Match when={props.type === 'warn'}>
        <WarnCircleFilled class={`${styles.gAlertIcon} ${styles.gAlertIconWarn}`} />
      </Match>
      <Match when={props.type === 'danger'}>
        <CloseCircleFilled class={`${styles.gAlertIcon} ${styles.gAlertIconDanger}`} />
      </Match>
    </Switch>
  )

  return (
    <Show when={visible()}>
      <Show
        when={props.children}
        fallback={
          <div class={alertClasses()} classList={props.classList} style={props.style} ref={props.ref} {...eventHandlers}>
            <AlertIcon />
            <div class={styles.gAlertTitle}>{props.title}</div>
            <Show when={props.closable}>
              <div class={styles.gAlertCloseWrap} onClick={alertClose}>
                <CloseFilled class={styles.gAlertClose} />
              </div>
            </Show>
          </div>
        }
      >
        <div class={alertWithContentClasses()} classList={props.classList} style={props.style} ref={props.ref} {...eventHandlers}>
          <div>
            <div class={styles.gAlertContentHeader}>
              <AlertIcon />
              <div class={styles.gAlertTitle}>{props.title}</div>
            </div>
            <div class={styles.gAlertContentContent}>{props.children}</div>
          </div>
          <Show when={props.closable}>
            <div class={styles.gAlertContentCloseWrap} onClick={alertClose}>
              <CloseFilled class={styles.gAlertClose} />
            </div>
          </Show>
        </div>
      </Show>
    </Show>
  )
}