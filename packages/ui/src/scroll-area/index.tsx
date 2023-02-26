import { GScrollArea, GScrollAreaProps, ScrollDetail } from './ScrollArea'
import { customElement } from 'solid-element'
import uno from 'uno.css?inline'
import style from './styles.css?inline'
import 'uno.css'
import './styles.css'
customElement<Partial<GScrollAreaProps>>(
  'g-scroll-area',
  {
    scrollX: 0,
    scrollY: 0,
    type: 'auto',
  },
  (props: Partial<GScrollAreaProps>, { element }) => {
    const onScroll = (detail: ScrollDetail) => {
      element.dispatchEvent(new CustomEvent('onChange', { detail }))
    }
    return (
      <>
        <style>
          {uno} {style}
        </style>
        <GScrollArea
          scrollX={props.scrollX}
          scrollY={props.scrollY}
          type={props.type}
          onScroll={onScroll}
        ></GScrollArea>
      </>
    )
  }
)

export { GScrollArea }
