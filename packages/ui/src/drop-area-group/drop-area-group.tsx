import type { JSX } from 'solid-js'
import type { Position } from '../utils/types'
import { createContext, useContext } from 'solid-js'
import { customElement } from 'solid-element'
import { checkCrossEdge, moveItem } from '../utils'
import { ItemData } from '../drop-area'

interface AreaFunc {
  get: () => ItemData[]
  set: (callback: (state: ItemData[]) => void) => void
}

interface DropAreaGroupProviderValue {
  addArea: (el: HTMLElement, areaFunc: AreaFunc) => void
  enterOtherArea: (
    mousePosition: Position,
    currentArea: HTMLElement,
    currentIndex: number,
    currentItem: ItemData
  ) => void
}

export interface GDropAreaGroupProps {
  children: JSX.Element | JSX.Element[]
}

const DropAreaGroupContext = createContext<DropAreaGroupProviderValue>()

export const useDropAreaGroupContext = () => useContext(DropAreaGroupContext)

customElement<Partial<GDropAreaGroupProps>>('g-drop-area-group', () => {
  return (
    <GDropAreaGroup>
      <slot></slot>
    </GDropAreaGroup>
  )
})

const GDropAreaGroup = (props: Partial<GDropAreaGroupProps>) => {
  const areaElementMap = new Map<HTMLElement, AreaFunc>()

  const itemUpadteInfo: {
    add?: { area: HTMLElement; index: number }
    remove?: { area: HTMLElement; index: number }
  } = {}

  function addArea(el: HTMLElement, areaFunc: AreaFunc) {
    areaElementMap.set(el, areaFunc)
  }

  function dragEnd() {
    if (itemUpadteInfo.remove) {
      areaElementMap.get(itemUpadteInfo.remove.area)?.set((items) => {
        items.splice(itemUpadteInfo.remove!.index, 1)
      })
      itemUpadteInfo.remove = undefined
    }
    if (itemUpadteInfo.add) {
      areaElementMap.get(itemUpadteInfo.add.area)?.set((items) => {
        items[itemUpadteInfo.add!.index].placeholder = false
      })
      itemUpadteInfo.add = undefined
    }
    window.removeEventListener('mouseup', dragEnd)
  }

  function enterOtherArea(
    mousePosition: Position,
    currentArea: HTMLElement,
    currentIndex: number,
    currentItem: ItemData
  ) {
    window.addEventListener('mouseup', dragEnd)
    let outside = true
    for (const [otherArea, otherAreaFunc] of areaElementMap.entries()) {
      if (checkCrossEdge(mousePosition, otherArea.getBoundingClientRect())) {
        outside = false
        const areaItems = otherAreaFunc.get()
        for (const [otherIndex, otherItem] of areaItems.entries()) {
          if (
            currentArea === otherArea &&
            otherIndex !== currentIndex &&
            checkCrossEdge(mousePosition, otherItem.el!.getBoundingClientRect())
          ) {
            otherAreaFunc.set((items) => {
              moveItem(currentIndex, otherIndex, items)
            })
            return
          }
          if (
            currentArea !== otherArea &&
            checkCrossEdge(mousePosition, otherItem.el!.getBoundingClientRect())
          ) {
            if (!itemUpadteInfo.add) {
              otherAreaFunc.set((items) => {
                items.splice(otherIndex, 0, currentItem)
                items[otherIndex].placeholder = true
              })
            } else {
              otherAreaFunc.set((items) => {
                moveItem(itemUpadteInfo.add!.index, otherIndex, items)
              })
            }
            itemUpadteInfo.remove = { area: currentArea, index: currentIndex }
            itemUpadteInfo.add = { area: otherArea, index: otherIndex }
            return
          }
        }
      }
    }
    if (outside) {
      if (itemUpadteInfo.add) {
        areaElementMap.get(itemUpadteInfo.add.area)?.set((items) => {
          items.splice(itemUpadteInfo.add!.index, 1)
        })
        itemUpadteInfo.add = undefined
      }
      if (itemUpadteInfo.remove) {
        itemUpadteInfo.remove = undefined
      }
    }
  }

  const providerValue: DropAreaGroupProviderValue = {
    addArea,
    enterOtherArea,
  }

  return (
    <DropAreaGroupContext.Provider value={providerValue}>
      {props.children}
    </DropAreaGroupContext.Provider>
  )
}

declare module 'solid-js' {
  namespace JSX {
    interface IntrinsicElements {
      'g-drop-area-group': Partial<GDropAreaGroupProps>
    }
  }
}
