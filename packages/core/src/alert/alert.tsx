import { JSX } from 'solid-js/jsx-runtime'
import { ComponentPropsWithChildren, VoidCallback } from '../types'
import { customEventHandlersName, generateProps } from '../utils'
import { WarnCircleFilled } from '../icon/warn-circle-filled'
import styles from './alert.module.css'
import { Show } from 'solid-js'

export interface AlertProps extends ComponentPropsWithChildren<HTMLHtmlElement> {
  title?: JSX.Element | JSX.Element
  type: 'info' | 'success' | 'warn' | 'danger'
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
  return (
    <div class={styles.gAlert}>
      <div class={styles.gAlertTitle}>
        <WarnCircleFilled color='blue'></WarnCircleFilled>
        <div>{props.title}</div>
      </div>
      <Show when={props.children}>
        <div>
          {props.children}
        </div>
      </Show>
    </div>
  )
}