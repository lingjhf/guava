import { JSX, createMemo } from 'solid-js'
import { Show, createSignal } from 'solid-js'
import { ComponentPropsWithChildren, VoidCallback } from '../types'
import { customEventHandlersName, generateProps } from '../utils'
import { WarnCircleFilled } from '../icon/warn-circle-filled'
import { CheckCircleFilled } from '../icon/check-circle-filled'
import { CloseFilled } from '../icon/close-filled'
import styles from './alert.module.css'

export type AlertType = 'info' | 'success' | 'warn' | 'danger'
export interface AlertProps extends ComponentPropsWithChildren<HTMLDivElement> {
  title?: JSX.Element
  type: AlertType
  center: boolean
  closable: boolean
  close?: VoidCallback
}

export const Alert = (propsRaw: Partial<AlertProps>) => {
  const [splitted, props] = generateProps(
    propsRaw,
    { type: 'info', center: false, closable: true },
    customEventHandlersName
  )

  const typeClasses: Record<AlertType, string> = {
    'info': styles.gAlertInfo,
    'success': styles.gAlertSuccess,
    'warn': styles.gAlertWarn,
    'danger': styles.gAlertDanger
  }

  const iconTypeClasses: Record<AlertType, string> = {
    'info': styles.gAlertIconInfo,
    'success': styles.gAlertIconSuccess,
    'warn': styles.gAlertIconWarn,
    'danger': styles.gAlertIconDanger
  }

  const [visible, setVisible] = createSignal(true)

  const alertClasses = () => {
    return `${styles.gAlert} ${typeClasses[props.type]}`
  }

  const alertIconClasses = createMemo(() => {
    return `${styles.gAlertIcon} ${iconTypeClasses[props.type]}`
  })

  const alertWithContentClasses = () => {
    return `${styles.gAlertContent} ${typeClasses[props.type]}`
  }

  function alertClose() {
    setVisible(false)
    props.close?.()
  }

  return (
    <Show when={visible()}>
      <Show
        when={props.children}
        fallback={
          <div class={alertClasses()} {...splitted} ref={props.ref}>
            <Show when={props.type === 'success'} fallback={<WarnCircleFilled class={alertIconClasses()} />}>
              <CheckCircleFilled class={alertIconClasses()} />
            </Show>
            <div class={styles.gAlertTitle}>{props.title}</div>
            <Show when={props.closable}>
              <div class={styles.gAlertCloseWrap} onClick={alertClose}>
                <CloseFilled class={styles.gAlertClose}></CloseFilled>
              </div>
            </Show>
          </div>
        }
      >
        <div class={alertWithContentClasses()} {...splitted} ref={props.ref}>
          <div>
            <div class={styles.gAlertContentHeader}>
              <Show when={props.type === 'success'} fallback={<WarnCircleFilled class={alertIconClasses()} />}>
                <CheckCircleFilled class={alertIconClasses()} />
              </Show>
              <div class={styles.gAlertTitle}>{props.title}</div>
            </div>
            <div class={styles.gAlertContentContent}>{props.children}</div>
          </div>
          <Show when={props.closable}>
            <div class={styles.gAlertCloseWrap} onClick={alertClose}>
              <CloseFilled class={styles.gAlertClose}></CloseFilled>
            </div>
          </Show>
        </div>
      </Show>
    </Show>
  )
}