
import { createEffect, createSignal, Show, type JSX } from 'solid-js'
import type { GuavaParentProps, VoidCallback } from '../types'
import { generateSplitEventHandlersProps, mergeClasses } from '../utils'
import styles from './drawer.module.css'
import { GButton } from '../button'
import { CloseFilled } from '../icon/close-filled'

export type DrawerPosition = 'top' | 'right' | 'bottom' | 'left'
export interface DrawerProps extends GuavaParentProps<HTMLDivElement> {
  visible: boolean
  position: DrawerPosition
  size: string
  showClose: boolean
  header?: JSX.Element
  footer?: JSX.Element
  close?: VoidCallback
}

const positionClasses: Record<DrawerPosition, string> = {
  'top': styles.drawerTop,
  'right': styles.drawerRight,
  'bottom': styles.drawerBottom,
  'left': styles.drawerLeft,
}

export const Drawer = (propsRaw: Partial<DrawerProps>) => {
  const [eventHandlers, props] = generateSplitEventHandlersProps(
    propsRaw,
    { visible: false, position: 'left', size: '30%', showClose: true }
  )

  const [visible, setVisible] = createSignal(false)

  createEffect(() => {
    setVisible(props.visible)
  })

  const overlayStyles = () => {
    const styles: Record<string, string> = {}
    if (!visible()) {
      styles.display = 'none'
    }
    return styles
  }

  const drawerClasses = () => {
    const classes = [styles.drawer, positionClasses[props.position]]
    return mergeClasses(classes)
  }

  const drawerStyles = () => {
    const styles: Record<string, string> = {}
    if (props.position === 'left' || props.position === 'right') {
      styles.width = props.size
    } else if (props.position === 'top' || props.position === 'bottom') {
      styles.height = props.size
    }
    return styles
  }

  function close() {
    setVisible(false)
    props.close?.()
  }

  function clickDrawer(e: MouseEvent) {
    e.stopPropagation()
  }

  return (
    <div class={styles.drawerOverlay} style={overlayStyles()} onClick={close}>
      <div class={drawerClasses()} style={drawerStyles()} onClick={clickDrawer}>
        <div class={styles.drawerHeader}>
          <div class={styles.drawerHeaderContent}>
            {props.header}
          </div>
          <Show when={props.showClose}>
            <GButton variant='text' size='medium' onClick={close}>
              <CloseFilled class={styles.drawerHeaderClose} />
            </GButton>
          </Show>
        </div>
        <div class={styles.drawerContent} >
          {props.children}
        </div>
        <Show when={props.footer}>
          <div class={styles.drawerFooter}>{props.footer}</div>
        </Show>
      </div>
    </div>
  )
}