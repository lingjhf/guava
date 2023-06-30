import { Show, type JSX } from 'solid-js'
import { type GuavaParentProps } from '../types'
import { generateSplitEventHandlersProps } from '../utils'
import styles from './card.module.css'

export interface CardProps extends GuavaParentProps<HTMLDivElement> {
  header?: JSX.Element
  footer?: JSX.Element
}

export const Card = (propsRaw: Partial<CardProps>) => {
  const [eventHandlers, props] = generateSplitEventHandlersProps(propsRaw, {})
  return (
    <div class={styles.card} {...eventHandlers}>
      <Show when={props.header}>
        <div class={styles.cardHeader}>{props.header}</div>
      </Show>
      <div class={styles.cardContent}>{props.children}</div>
    </div>
  )
}