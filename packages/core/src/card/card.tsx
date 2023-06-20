import { Show, JSX } from 'solid-js'
import { ComponentPropsWithChildren } from '../types'
import { customEventHandlersName, generateProps } from '../utils'
import styles from './card.module.css'

export interface CardProps extends ComponentPropsWithChildren<HTMLDivElement> {
  header?: JSX.Element
  footer?: JSX.Element
}

export const Card = (propsRaw: Partial<CardProps>) => {
  const [eventHandlers, props] = generateProps(propsRaw, {}, customEventHandlersName)
  return (
    <div class={styles.card} {...eventHandlers}>
      <Show when={props.header}>
        <div class={styles.cardHeader}>{props.header}</div>
      </Show>
      <div class={styles.cardContent}>{props.children}</div>
    </div>
  )
}