import type { JSX } from 'solid-js'

export function InfoCircleFilled(props: JSX.IntrinsicElements['svg']) {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 16 17' {...props}>
      <path fill='currentColor' fill-opacity='0.85' fill-rule='evenodd' clip-rule='evenodd' d='M1 8.59998C1 4.73398 4.13401 1.59998 8 1.59998C11.866 1.59998 15 4.73398 15 8.59998C15 12.466 11.866 15.6 8 15.6C4.13401 15.6 1 12.466 1 8.59998ZM8 12.35C8.41421 12.35 8.75 12.0142 8.75 11.6V8.59998C8.75 8.18576 8.41421 7.84998 8 7.84998C7.58579 7.84998 7.25 8.18576 7.25 8.59998V11.6C7.25 12.0142 7.58579 12.35 8 12.35ZM8 4.84998C8.55228 4.84998 9 5.29769 9 5.84998C9 6.40226 8.55228 6.84998 8 6.84998C7.44772 6.84998 7 6.40226 7 5.84998C7 5.29769 7.44772 4.84998 8 4.84998Z' />
    </svg>
  )
}