import type { JSX } from 'solid-js'

export function WarnCircleFilled(props: JSX.IntrinsicElements['svg']) {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 16 17' {...props}>
      <path fill='currentColor' fill-opacity='0.85' fill-rule='evenodd' clip-rule='evenodd' d='M15 8.59998C15 12.466 11.866 15.6 8 15.6C4.13401 15.6 1 12.466 1 8.59998C1 4.73398 4.13401 1.59998 8 1.59998C11.866 1.59998 15 4.73398 15 8.59998ZM8 4.84998C8.41421 4.84998 8.75 5.18576 8.75 5.59998V8.59998C8.75 9.01419 8.41421 9.34998 8 9.34998C7.58579 9.34998 7.25 9.01419 7.25 8.59998V5.59998C7.25 5.18576 7.58579 4.84998 8 4.84998ZM8 12.35C8.55228 12.35 9 11.9023 9 11.35C9 10.7977 8.55228 10.35 8 10.35C7.44772 10.35 7 10.7977 7 11.35C7 11.9023 7.44772 12.35 8 12.35Z' />
    </svg>
  )
}