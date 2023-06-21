import { GuavaEvent, GuavaProps } from '../types'
import { eventHandlerCall, mergeClasses, generateSplitEventHandlersProps, mergeClassList, mergeStyles } from '../utils'

export interface TimePickerPanelProps extends GuavaProps<HTMLDivElement> {
  click?: (v: string, e: GuavaEvent<HTMLDivElement, MouseEvent>) => void
}

export const TimePickerPanel = (propsRaw: Partial<TimePickerPanelProps>) => {
  const [eventHandlers, props] = generateSplitEventHandlersProps(
    propsRaw,
    {},
  )

  function onClick(e: GuavaEvent<HTMLDivElement, MouseEvent>) {
    props.click?.('123', e)
    eventHandlers.onClick && eventHandlerCall(eventHandlers.onClick, e)
  }

  return (
    <div
      ref={props.ref}
      style={mergeStyles([], props.style)}
      class={mergeClasses([], props.class)}
      classList={mergeClassList({}, props.classList)}
      {...eventHandlers}
      onClick={onClick}
    >
    </div>
  )
}