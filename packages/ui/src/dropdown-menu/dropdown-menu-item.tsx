import { JSX, onMount, splitProps, mergeProps } from 'solid-js'
import { CustomEventHandlersName } from '../utils/constants'
import './dropdown-menu-item.css'

export interface EDropdownMenuItemProps extends JSX.CustomEventHandlersCamelCase<HTMLDivElement> {
  disabled: boolean
  ref?: HTMLDivElement
  children?: JSX.Element | JSX.Element[]
}

export const EDropdownMenuItem = (props: Partial<EDropdownMenuItemProps>) => {

  const [splitted, defaultProps] = splitProps(mergeProps<[EDropdownMenuItemProps, ...Partial<EDropdownMenuItemProps>[]]>(
    {
      disabled: false
    },
    props,
  ),
  CustomEventHandlersName,
  )

  return (
    <div
      class='dropdown-menu-item'
      ref={defaultProps.ref}
      {...splitted}
    >
      {defaultProps.children}
    </div>
  )
}