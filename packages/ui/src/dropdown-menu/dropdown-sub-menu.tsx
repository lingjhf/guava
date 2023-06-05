import { JSX, mergeProps, onMount, useContext, createContext, createSignal, Show } from 'solid-js'
import { Portal } from 'solid-js/web'
import { EDropdownMenuItem } from './dropdown-menu-item'
import { Inset } from '../types'

export type DropdownSubMenuTriggerType = 'hover' | 'click'

export interface EDropdownSubMenuProps {
  triggerType: DropdownSubMenuTriggerType
  title?: JSX.Element
  children?: JSX.Element | JSX.Element[]
}

export interface DropdownSubMenuProviderValue {

}
const DropDownSubMenuContext = createContext<DropdownSubMenuProviderValue>()

export const useDropDownSubMenu = () => useContext(DropDownSubMenuContext)

export const EDropdownSubMenu = (props: Partial<EDropdownSubMenuProps>) => {
  const defaultProps = mergeProps<[EDropdownSubMenuProps, ...Partial<EDropdownSubMenuProps>[]]>(
    {
      triggerType: 'hover'
    },
    props,
  )

  let triggerRef: HTMLButtonElement | undefined
  let menuRef: HTMLDivElement | undefined
  const [isTrigger, setIsTrigger] = createSignal(false)
  const [placementInset, setPlacementInset] = createSignal<Inset>({ top: 'auto', right: 'auto', bottom: 'auto', left: 'auto' })

  const dropdownSubMenuStyles = () => {
    const inset = placementInset()
    return `inset: ${inset.top} ${inset.right} ${inset.bottom} ${inset.left};`
  }

  const provider = useDropDownSubMenu()
  const providerValue: DropdownSubMenuProviderValue = {}

  function onTriggerClick() {
    setIsTrigger(true)
  }

  return (
    <DropDownSubMenuContext.Provider value={providerValue}>
      <EDropdownMenuItem onClick={onTriggerClick}>
        {defaultProps.title}
      </EDropdownMenuItem>
      <Portal>
        <Show when={isTrigger()}>
          <div class='dropdown-sub-menu' style={dropdownSubMenuStyles()} ref={menuRef}>
            {defaultProps.children}
          </div>
        </Show>
      </Portal>
    </DropDownSubMenuContext.Provider>
  )
}