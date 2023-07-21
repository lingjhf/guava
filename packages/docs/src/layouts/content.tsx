import type { FlowProps } from 'solid-js'
import { store } from '../store/store'

export const Content = (props: FlowProps) => {
  const styles = () => {
    return `width: calc(100% - ${store.drawer ? 0 : 300}px)`
  }
  return (
    <div class='h-full' style={styles()}>
      {props.children}
    </div>
  )
}