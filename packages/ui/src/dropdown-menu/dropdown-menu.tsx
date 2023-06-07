import { Accessor, JSX, createContext, createSignal, mergeProps, useContext, Show, } from 'solid-js'
import { Portal } from 'solid-js/web'
import type { ValueChanged, Inset } from '../utils/types'
import { GButton } from '../button'
import './dropdown-menu.css'

export type DropdownTriggerType = 'hover' | 'click' | 'contextmenu'

export type DropdownPlacement = 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end'

export interface EDropdownMenuProps {
  triggerType: DropdownTriggerType
  placement: DropdownPlacement
  hideOnClick: boolean
  // 显示下拉菜单的延时
  showTimeout: number
  hideTimeout: number
  trigger?: JSX.Element
  children?: JSX.Element | JSX.Element[]
}

export interface DropdownMenuProviderValue {
  isTrigger: Accessor<boolean>
  trigger: ValueChanged<boolean>
}

const DropdownContext = createContext<DropdownMenuProviderValue>()

export const useDropdownMenu = () => useContext(DropdownContext)

export const EDropdownMenu = (props: Partial<EDropdownMenuProps>) => {
  const defaultProps = mergeProps<[EDropdownMenuProps, ...Partial<EDropdownMenuProps>[]]>(
    {
      triggerType: 'hover',
      placement: 'bottom',
      hideOnClick: true,
      showTimeout: 300,
      hideTimeout: 300,
    },
    props,
  )
  let conainerRef: HTMLDivElement | undefined
  let triggerRef: HTMLButtonElement | undefined
  let menuRef: HTMLDivElement | undefined
  const [isTrigger, setIsTrigger] = createSignal(false)
  const [placementInset, setPlacementInset] = createSignal<Inset>({ top: 'auto', right: 'auto', bottom: 'auto', left: 'auto' })

  const dropdownMenuStyles = () => {
    const inset = placementInset()
    return `inset: ${inset.top} ${inset.right} ${inset.bottom} ${inset.left};`
  }

  function trigger(value: boolean) {
    setIsTrigger(value)
  }

  function onTriggerClick() {
    showMenu()
  }

  function onTriggerEnter() {
    //
  }

  function onTriggerLeave() {
    //
  }

  function showMenu() {
    setIsTrigger(true)
    const documentScrollLeft = document.documentElement.scrollLeft
    const documentScrollTop = document.documentElement.scrollTop
    const clientWidth = document.documentElement.clientWidth
    const clientHeight = document.documentElement.clientHeight
    const triggerRect = triggerRef?.getBoundingClientRect()
    if (!triggerRect) return
    const menuRect = menuRef?.getBoundingClientRect()
    if (!menuRect) return
    triggerRect.x += documentScrollLeft
    triggerRect.y += documentScrollTop
    let inset = getBottomPlacement(triggerRect, menuRect)
    switch (defaultProps.placement) {
      case 'top':
        inset = getTopPlacement(triggerRect, menuRect, clientHeight)
        break
      case 'top-start':
        inset = getTopStartPlacement(triggerRect, menuRect, clientHeight)
        break
      case 'top-end':
        inset = getTopEndPlacement(triggerRect, menuRect, clientHeight)
        break
      case 'bottom-start':
        inset = getBottomStartPlacement(triggerRect, menuRect)
        break
      case 'bottom-end':
        inset = getBottomEndPlacement(triggerRect, menuRect)
        break
    }
    setPlacementInset({ top: inset.top, right: inset.right, bottom: inset.bottom, left: inset.left })
  }

  function getTopPlacement(triggerRect: DOMRect, menuRect: DOMRect, clientHeight: number): Inset {
    const left = (triggerRect.left + triggerRect.width / 2) - menuRect.width / 2
    return { top: 'auto', right: 'auto', bottom: `${clientHeight - triggerRect.top}px`, left: `${left}px` }
  }

  function getTopStartPlacement(triggerRect: DOMRect, menuRect: DOMRect, clientHeight: number): Inset {
    const top = getTopPlacement(triggerRect, menuRect, clientHeight)
    const left = (triggerRect.left + triggerRect.width / 2) - menuRect.width
    top.left = `${left}px`
    return top
  }

  function getTopEndPlacement(triggerRect: DOMRect, menuRect: DOMRect, clientHeight: number): Inset {
    const top = getTopPlacement(triggerRect, menuRect, clientHeight)
    const left = (triggerRect.left + triggerRect.width / 2)
    top.left = `${left}px`
    return top
  }

  function getBottomPlacement(triggerRect: DOMRect, menuRect: DOMRect): Inset {
    const left = (triggerRect.left + triggerRect.width / 2) - menuRect.width / 2
    return { top: `${triggerRect.bottom}px`, right: 'auto', bottom: 'auto', left: `${left}px` }
  }

  function getBottomStartPlacement(triggerRect: DOMRect, menuRect: DOMRect): Inset {
    const bottom = getBottomPlacement(triggerRect, menuRect)
    const left = (triggerRect.left + triggerRect.width / 2) - menuRect.width
    bottom.left = `${left}px`
    return bottom
  }

  function getBottomEndPlacement(triggerRect: DOMRect, menuRect: DOMRect): Inset {
    const bottom = getBottomPlacement(triggerRect, menuRect)
    const left = (triggerRect.left + triggerRect.width / 2)
    bottom.left = `${left}px`
    return bottom
  }

  const providerValue: DropdownMenuProviderValue = { trigger, isTrigger }

  return (
    <DropdownContext.Provider value={providerValue}>
      <GButton
        ref={triggerRef}
        onClick={onTriggerClick}
        onMouseEnter={onTriggerEnter}
        onMouseLeave={onTriggerLeave}
      >
        {defaultProps.trigger}
      </GButton>
      <Portal ref={conainerRef}>
        <Show when={isTrigger()}>
          <div class='dropdown-menu' style={dropdownMenuStyles()} ref={menuRef}>
            {defaultProps.children}
          </div>
        </Show>
      </Portal>
    </DropdownContext.Provider>
  )
}