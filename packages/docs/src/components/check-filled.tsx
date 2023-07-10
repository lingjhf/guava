import type { JSX } from 'solid-js'

export function CheckFilled(props: JSX.IntrinsicElements['svg']) {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 16 16' {...props}>
      <path fill='currentColor' fill-opacity='0.85' d='M14.805 4.50451C15.0836 4.19802 15.061 3.72368 14.7545 3.44505C14.448 3.16642 13.9737 3.18901 13.6951 3.4955L6.72412 11.1635L2.28033 6.71966C1.98744 6.42677 1.51257 6.42677 1.21967 6.71966C0.926777 7.01255 0.926776 7.48742 1.21967 7.78032L6.21964 12.7803C6.36467 12.9253 6.56276 13.0047 6.76781 12.9998C6.97285 12.9949 7.16695 12.9063 7.30492 12.7545L14.805 4.50451Z' />
    </svg>
  )
}