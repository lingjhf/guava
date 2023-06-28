import { JSX, Show, createEffect, createSignal } from 'solid-js'
import { Portal } from 'solid-js/web'
import { GuavaParentProps } from '../types'
import { generateSplitEventHandlersProps } from '../utils'
import styles from './dialog.module.css'

export interface DialogProps extends GuavaParentProps<HTMLDivElement> {
  visible: boolean
  fullscreen: boolean
  draggable: boolean
  header?: JSX.Element
  footer?: JSX.Element

}

export const Dialog = (propsRaw: Partial<DialogProps>) => {
  const [splitted, props] = generateSplitEventHandlersProps(
    propsRaw,
    {
      visible: false,
      fullscreen: false,
      draggable: false
    },
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
          <div class={styles.gDialog} {...splitted} ref={props.ref}>
            <div class={styles.gDialogHeader}></div>
            <div class={styles.gDialogContent}></div>
            <div class={styles.gDialogFooter}></div>
          </div>
        </div>
      </Portal>
    </Show>
  )
}