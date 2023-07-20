import { type JSX, createEffect, createSignal, children, onMount } from 'solid-js'
import { useVirtualScrollContext } from './virtual-scroll'
import { VirtualScrollController } from './controller'
import type { GuavaParentProps, GuavaProps } from '../types'
import { generateSplitEventHandlersProps, mergeClasses } from '../utils'
import styles from './virtual-list.module.css'

export interface VirtualListItem {
  key: string
  height: number
}

interface VirtualListItemWithIndex extends VirtualListItem {
  index: number
}

export interface VirtualListProps extends GuavaProps<HTMLDivElement> {
  items: VirtualListItem[]
  buffer: number
  indexRange?: (startIndex: number, endIndex: number) => void
  firstItem?: () => void
  lastItem?: () => void
  children?: (key: string, index: number) => JSX.Element
}

export const VirtualList = (propsRaw: Partial<VirtualListProps>) => {

  const [eventHandlers, props] = generateSplitEventHandlersProps(
    propsRaw,
    { items: [], buffer: 10 },
  )

  let currentItemsCopy: VirtualListItemWithIndex[] = []
  const [contentHeight, setContentHeight] = createSignal(0)
  const [contentOffsetTop, setContentOffsetTop] = createSignal(0)
  const [currentItems, setCurrentItems] = createSignal<VirtualListItemWithIndex[]>([])
  const controller = new VirtualScrollController()
  const context = useVirtualScrollContext()
  context?.registerController({ controller, change: virtualScrollChange })

  createEffect(() => {
    controller.initDefaultItems(props.items.map((item) => item.value))
    setContentHeight(controller.totalHeight)
    context?.setVirtualScrollHeight(controller.totalHeight)
    virtualScrollChange()
  })

  const placeholderClasses = () =>
    `${context?.horizontal()
      ? styles.virtualListPlaceholderHorizontal
      : styles.virtualListPlaceholderVertical
    }`

  const contentClasses = () =>
    `${context?.horizontal()
      ? styles.virtualListContentHorizontal
      : styles.virtualListContentVertical
    }`

  const containerClasses = () => {
    const classes = [styles.virtualList, context?.horizontal() ? styles.virtualListHorizontal : styles.virtualListVertical]

    return mergeClasses(classes)
  }

  const placeholderStyles = () =>
    `${context?.horizontal() ? `width:${contentHeight()}px` : `height:${contentHeight()}px`};`

  const contentStyles = () =>
    `transform:${context?.horizontal()
      ? `translateX(${contentOffsetTop()}px)`
      : `translateY(${contentOffsetTop()}px)`
    };`

  function virtualScrollChange() {
    const tempItems = controller.currentItems.map((item) => ({
      ...props.items[item.index],
      index: item.index,
    }))
    setContentOffsetTop(controller.offsetTop)
    if (tempItems.length > 0 && currentItemsCopy.length > 0) {
      if (
        tempItems[0].index === currentItemsCopy[0].index &&
        tempItems[tempItems.length - 1].index ===
        currentItemsCopy[currentItemsCopy.length - 1].index
      ) {
        return
      }
    }
    currentItemsCopy = tempItems
    setCurrentItems(tempItems)
    if (controller.startIndex === 0) {
      props.firstItem?.()
    }
    if (controller.endIndex === props.items.length - 1) {
      props.lastItem?.()
    }
    props.indexRange?.(controller.startIndex, controller.endIndex)
  }

  const renderItems = children(() =>
    currentItems().map((item) => (
      <div style={context?.horizontal() ? `width:${item.height}px` : `height:${item.height}px`}>
        {props.children?.(item.key, item.index)}
      </div>
    ))
  )

  onMount(() => {
    controller.setViewHeight(context?.getViewHeight() ?? 0)
    virtualScrollChange()
  })

  return (
    <div class={containerClasses()}>
      <div class={placeholderClasses()} style={placeholderStyles()}></div>
      <div class={contentClasses()} style={contentStyles()}>
        {renderItems()}
      </div>
    </div>
  )
}