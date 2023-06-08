import { JSX, Show, createEffect, createSignal } from 'solid-js'
import { Portal } from 'solid-js/web'
import { ComponentPropsWithChildren } from '../types'
import { customEventHandlersName, generateProps } from '../utils'
import styles from './dialog.module.css'

export interface DialogProps extends ComponentPropsWithChildren<HTMLDivElement> {
  visible: boolean
  fullscreen: boolean
  draggable: boolean
  header?: JSX.Element
  footer?: JSX.Element

}

export const Dialog = (propsRaw: Partial<DialogProps>) => {
  const [splitted, props] = generateProps(
    propsRaw,
    {
      visible: false,
      fullscreen: false,
      draggable: false
    },
    customEventHandlersName,
  )
  const [visible, setVisible] = createSignal(false)

  createEffect(() => {
    if (props.visible) {
      setVisible(props.visible)
    }
  })
  return (
    <Show when={visible()}>
      <Portal>
        <div class={styles.gOverlayDialog}>
          <div class={styles.gDialog}  {...splitted} ref={props.ref}>
            <div class={styles.gDialogHeader}></div>
            <div class={styles.gDialogContent}></div>
            <div class={styles.gDialogFooter}></div>
          </div>
        </div>
      </Portal>
    </Show>
  )
}