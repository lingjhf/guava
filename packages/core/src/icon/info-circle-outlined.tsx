import type { JSX } from 'solid-js'

export function InfoCircleOutlined(props: JSX.IntrinsicElements['svg']) {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 16 17' {...props}>
      <path fill='currentColor' fill-opacity='0.85' d='M8 12.35C8.41421 12.35 8.75 12.0142 8.75 11.6V8.59998C8.75 8.18576 8.41421 7.84998 8 7.84998C7.58579 7.84998 7.25 8.18576 7.25 8.59998V11.6C7.25 12.0142 7.58579 12.35 8 12.35Z' />
      <path fill='currentColor' fill-opacity='0.85' d='M8 4.84998C8.55228 4.84998 9 5.29769 9 5.84998C9 6.40226 8.55228 6.84998 8 6.84998C7.44772 6.84998 7 6.40226 7 5.84998C7 5.29769 7.44772 4.84998 8 4.84998Z' />
      <path fill='currentColor' fill-opacity='0.85' fill-rule='evenodd' clip-rule='evenodd' d='M8 1.59998C4.13401 1.59998 1 4.73398 1 8.59998C1 12.466 4.13401 15.6 8 15.6C11.866 15.6 15 12.466 15 8.59998C15 4.73398 11.866 1.59998 8 1.59998ZM2.5 8.59998C2.5 5.56241 4.96243 3.09998 8 3.09998C11.0376 3.09998 13.5 5.56241 13.5 8.59998C13.5 11.6375 11.0376 14.1 8 14.1C4.96243 14.1 2.5 11.6375 2.5 8.59998Z' />
    </svg>
  )
}