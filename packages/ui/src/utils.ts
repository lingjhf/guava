import { onCleanup } from 'solid-js'
import { VoidCallback } from './types'

export default function clickOutside(el: HTMLElement, accessor?: VoidCallback) {
  const onClick = (e: MouseEvent) => {
    !el.contains(e.target as Node) && accessor?.()
  }
  document.body.addEventListener('click', onClick)

  onCleanup(() => document.body.removeEventListener('click', onClick))
}
