import { Position } from '@lingjhf/utils'
import { createContext, JSX, useContext, Accessor, Setter } from 'solid-js'
import { checkCrossEdge, moveItem } from './utils'
import { ItemData } from './DropArea'
import { produce } from 'solid-js/store'

interface AreaFunc {
  get: () => ItemData[]
  set: (callback: (state: ItemData[]) => void) => void
}

interface multiDropAreaProviderValue {
  addArea: (el: HTMLElement, areaFunc: AreaFunc) => void
  enterOtherArea: (mousePosition: Position, currentEl: HTMLElement, currentIndex: number) => void
}

interface Props {
  children: JSX.Element | JSX.Element[]
}

const MultiDropAreaContext = createContext<multiDropAreaProviderValue>()

export const useMultiDropAreaContext = () => useContext(MultiDropAreaContext)

export const GMultiDropArea = (props: Partial<Props>) => {
  const areaElementMap = new Map<HTMLElement, AreaFunc>()
  const removeItemInfo: {
    areaEl?: HTMLElement
    itemIndex?: number
  } = {}
  const addItemInfo: {
    areaEl?: HTMLElement
    itemIndex?: number
  } = {}

  function addArea(el: HTMLElement, areaFunc: AreaFunc) {
    areaElementMap.set(el, areaFunc)
  }

  function dragEnd() {
    if (removeItemInfo.areaEl) {
      areaElementMap.get(removeItemInfo.areaEl)?.set((items) => {
        items.splice(removeItemInfo.itemIndex!, 1)
      })
      removeItemInfo.areaEl = undefined
      removeItemInfo.itemIndex = undefined
    }
    if (addItemInfo.areaEl) {
      areaElementMap.get(addItemInfo.areaEl)?.set((items) => {
        items[addItemInfo.itemIndex!].placeholder = false
      })
      addItemInfo.areaEl = undefined
      addItemInfo.itemIndex = undefined
    }

    window.removeEventListener('mouseup', dragEnd)
  }

  function enterOtherArea(mousePosition: Position, currentEl: HTMLElement, currentIndex: number) {
    window.addEventListener('mouseup', dragEnd)
    const currentItem = areaElementMap.get(currentEl)!.get()[currentIndex]
    let outside = true
    for (const [areaEl, areaFunc] of areaElementMap.entries()) {
      if (checkCrossEdge(mousePosition, areaEl.getBoundingClientRect())) {
        outside = false
        const areaItems = areaFunc.get()
        for (const [areaItemIndex, areaItem] of areaItems.entries()) {
          if (
            areaEl !== currentEl &&
            checkCrossEdge(mousePosition, areaItem.el!.getBoundingClientRect())
          ) {
            if (!addItemInfo.areaEl) {
              areaFunc.set((items) => {
                items.splice(areaItemIndex, 0, currentItem)
                items[areaItemIndex].placeholder = true
              })
              addItemInfo.areaEl = areaEl
              addItemInfo.itemIndex = areaItemIndex
              removeItemInfo.areaEl = currentEl
              removeItemInfo.itemIndex = currentIndex
              return
            }
            if (addItemInfo.areaEl !== areaEl) {
              areaElementMap.get(addItemInfo.areaEl)?.set((items) => {
                items.splice(addItemInfo.itemIndex!, 1)
              })
              areaFunc.set((items) => {
                items.splice(areaItemIndex, 0, currentItem)
                items[areaItemIndex].placeholder = true
              })
              addItemInfo.areaEl = areaEl
              addItemInfo.itemIndex = areaItemIndex
            }
            areaFunc.set((items) => {
              moveItem(addItemInfo.itemIndex!, areaItemIndex, items)
            })
            addItemInfo.itemIndex = areaItemIndex
            return
          }
          if (areaEl === currentEl && areaItemIndex !== currentIndex) {
            if (checkCrossEdge(mousePosition, areaItem.el!.getBoundingClientRect())) {
              areaFunc.set((items) => {
                moveItem(currentIndex, areaItemIndex, items)
              })
              return
            }
          }
        }
      }
    }
    if (outside) {
      if (addItemInfo.areaEl) {
        areaElementMap.get(addItemInfo.areaEl!)?.set((items) => {
          items.splice(addItemInfo.itemIndex!, 1)
        })
        addItemInfo.areaEl = undefined
        addItemInfo.itemIndex = undefined
      }
    }
  }

  const store: multiDropAreaProviderValue = {
    addArea,
    enterOtherArea,
  }

  return (
    <MultiDropAreaContext.Provider value={store}>{props.children}</MultiDropAreaContext.Provider>
  )
}
