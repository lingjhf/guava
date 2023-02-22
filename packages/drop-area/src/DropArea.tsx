import { Position } from '@lingjhf/utils'
import { mergeProps, JSX, createContext, useContext, For, createEffect } from 'solid-js'
import { createStore, produce } from 'solid-js/store'
import { GDragItem } from './DragItem'
import { useMultiDropAreaContext } from './MultiDropArea'
import { checkCrossEdge, checkCrossWidthHalf, checkCrossHeightHalf, moveItem } from './utils'

export interface ItemData {
  data: unknown
  placeholder?: boolean
  el?: HTMLElement
}

interface DropAreaProviderValue {
  addItem: (index: number, el: HTMLElement) => void
  switchItem: (index: number, mousePosition: Position) => void
}

interface Props {
  each: unknown[]
  switchWhileCrossEdge: boolean
  horizontal: boolean
  originPlaceholder?: () => JSX.Element
  children?: (item: unknown, index: number) => JSX.Element
}

const DropAreaContext = createContext<DropAreaProviderValue>()

export const useDropArea = () => useContext(DropAreaContext)

export const GDropArea = (props: Partial<Props>) => {
  const context = useMultiDropAreaContext()
  let areaRef: HTMLElement
  const setAreaRef = (el: HTMLElement) => {
    areaRef = el
    context?.addArea(el, { get: getItems, set: setItems })
  }

  const defaultProps = mergeProps<[Props, ...Partial<Props>[]]>(
    {
      each: [],
      switchWhileCrossEdge: false,
      horizontal: false,
    },
    props
  )
  const [store, setStore] = createStore<{ items: ItemData[] }>({ items: [] })

  createEffect(() => {
    const newItems: ItemData[] = []
    for (const data of defaultProps.each) {
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
      <div ref={setAreaRef} class="g-drop-area" style={areaStyles()}>
        <For each={store.items}>
          {(item, index) => {
            return (
              <GDragItem placeholder={item.placeholder} index={index()}>
                {defaultProps.children?.(item.data, index())}
              </GDragItem>
            )
          }}
        </For>
      </div>
    </DropAreaContext.Provider>
  )
}
