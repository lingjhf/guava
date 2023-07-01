import type { JSX } from 'solid-js'

export function CopyOutlined(props: JSX.IntrinsicElements['svg']) {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 16 16' {...props}>
      <path fill='currentColor' fill-opacity='0.85' fill-rule='evenodd' clip-rule='evenodd' d='M5 11.25H2.75C2.05964 11.25 1.5 10.6904 1.5 9.99999L1.50004 2.74999C1.50004 2.05964 2.05968 1.5 2.75004 1.5H8.75C9.44035 1.5 10 2.05964 10 2.75V4H13.25C13.9404 4 14.5 4.55964 14.5 5.25V13.25C14.5 13.9404 13.9404 14.5 13.25 14.5H6.25C5.55964 14.5 5 13.9404 5 13.25V11.25ZM3 9.75L3.00004 3H8.5V4H6.25C5.55964 4 5 4.55964 5 5.25V9.75H3ZM6.5 13V5.5H13V13H6.5Z' />
    </svg>
  )
}