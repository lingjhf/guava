import type { JSX } from 'solid-js'
import type { Position } from '../utils/types'
import { mergeProps, createContext, useContext, For, createEffect } from 'solid-js'
import { createStore, produce } from 'solid-js/store'
import { customElement } from 'solid-element'
import '../drop-item'
import { useMultiDropAreaContext } from '../drop-area-group'
import { checkCrossEdge, checkCrossWidthHalf, checkCrossHeightHalf, moveItem } from '../utils'

export interface ItemData {
  data: unknown
  placeholder?: boolean
  el?: HTMLElement
}

interface DropAreaProviderValue {
  addItem: (index: number, el: HTMLElement) => void
  switchItem: (index: number, mousePosition: Position) => void
}

export interface GDropAreaProps {
  items: unknown[]
  switchWhileCrossEdge: boolean
  horizontal: boolean
  originPlaceholder?: () => JSX.Element
  dropItem?: (item: unknown, index: number) => JSX.Element
}

const DropAreaContext = createContext<DropAreaProviderValue>()

export const useDropArea = () => useContext(DropAreaContext)

customElement<Partial<GDropAreaProps>>(
  'g-drop-area',
  {
    items: undefined,
    switchWhileCrossEdge: undefined,
    horizontal: undefined,
    originPlaceholder: undefined,
    dropItem: undefined,
  },
  (props) => {
    return (
      <GDropArea
        items={props.items}
        switchWhileCrossEdge={props.switchWhileCrossEdge}
        horizontal={props.horizontal}
        originPlaceholder={props.originPlaceholder}
        dropItem={props.dropItem}
      ></GDropArea>
    )
  }
)

const GDropArea = (props: Partial<GDropAreaProps>) => {
  const context = useMultiDropAreaContext()
  let areaRef: HTMLElement
  const setAreaRef = (el: HTMLElement) => {
    areaRef = el
    context?.addArea(el, { get: getItems, set: setItems })
  }

  const defaultProps = mergeProps<[GDropAreaProps, ...Partial<GDropAreaProps>[]]>(
    {
      items: [],
      switchWhileCrossEdge: false,
      horizontal: false,
    },
    props
  )
  const [store, setStore] = createStore<{ items: ItemData[] }>({ items: [] })

  createEffect(() => {
    const newItems: ItemData[] = []
    for (const data of defaultProps.items) {
      newItems.push({ data: data })
    }
    setStore('items', newItems)
  })

  const areaStyles = () => `${defaultProps.horizontal ? 'display:flex' : ''};`

  function getItems() {
    return store.items
  }

  function setItems(callback: (state: ItemData[]) => void) {
    setStore(
      'items',
      produce((items) => {
        callback(items)
      })
    )
  }

  //提供给拖拽项把自己注册到放置区域
  function addItem(index: number, el: HTMLElement): void {
    setStore(
      'items',
      produce((items) => {
        items[index].el = el
      })
    )
  }

  //交换拖拽项
  function switchItem(index: number, mousePosition: Position) {
    if (context?.enterOtherArea) {
      context.enterOtherArea(mousePosition, areaRef, index, store.items[index])
      return
    }
    for (const [itemIndex, item] of store.items.entries()) {
      if (itemIndex !== index) {
        const { x, y, width, height } = item.el!.getBoundingClientRect()
        if (defaultProps.switchWhileCrossEdge) {
          if (checkCrossEdge(mousePosition, { x, y, width, height })) {
            setStore(
              'items',
              produce((items) => {
                moveItem(index, itemIndex, items)
              })
            )
            break
          }
        } else {
          const direction = defaultProps.horizontal
            ? checkCrossWidthHalf(mousePosition, { x, y, width, height })
            : checkCrossHeightHalf(mousePosition, { x, y, width, height })
          if (direction > -1) {
            setStore(
              'items',
              produce((items) => {
                if (direction === 1 && itemIndex - 1 !== index) {
                  moveItem(index, itemIndex, items)
                }
                if (direction === 0 && itemIndex + 1 !== index) {
                  moveItem(index, itemIndex, items)
                }
              })
            )
            break
          }
        }
      }
    }
  }

  const providerValue: DropAreaProviderValue = {
    addItem,
    switchItem,
  }

  return (
    <DropAreaContext.Provider value={providerValue}>
      <div ref={setAreaRef} style={areaStyles()}>
        <For each={store.items}>
          {(item, index) => {
            return (
              <g-drop-item
                placeholder={item.placeholder}
                index={index()}
                render={() => defaultProps.dropItem?.(item.data, index())}
              ></g-drop-item>
            )
          }}
        </For>
      </div>
    </DropAreaContext.Provider>
  )
}

declare module 'solid-js' {
  namespace JSX {
    interface IntrinsicElements {
      'g-drop-area': Partial<GDropAreaProps>
    }
  }
}
