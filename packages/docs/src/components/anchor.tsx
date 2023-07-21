import { onMount, type JSX } from 'solid-js'

export interface AnchorProps {
  name: string
}

export const Anchor = (props: AnchorProps) => {
  let anchorRef: HTMLAnchorElement
  onMount(() => {
    const splitted = window.location.href.match(/#(.*)/)
    if (splitted) {
      if (splitted[1] === props.name) {
        anchorRef?.click()
      }
    }
  })
  return (
    <a ref={anchorRef!} href={`#${props.name}`} id={props.name}>#</a>
  )
}