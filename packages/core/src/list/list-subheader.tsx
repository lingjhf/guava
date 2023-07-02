import type { GuavaParentProps } from '../types'
import styles from './list-subheader.module.css'

export const ListSubheader = (props: GuavaParentProps<HTMLDivElement>) => {
  return (
    <div class={styles.listSubheader}>{props.children}</div>
  )
}