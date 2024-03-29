import type { JSX } from 'solid-js'
import { createEffect } from 'solid-js'
import { mergeProps, createSignal, children, onMount } from 'solid-js'
import { customElement } from 'solid-element'
import { useVirtualScrollContext } from '../virtual-scroll'
import { VirtualScrollController } from './controller'
import styles from './styles.css?inline'

export interface GVirtualScrollItem {
  key: string
  value: number
}

interface GVirtualScrollItemWithIndex extends GVirtualScrollItem {
  index: number
}

export interface GVirutalScrollColumnprops {
  items: GVirtualScrollItem[]
  buffer: number
  indexRange?: (startIndex: number, endIndex: number) => void
  firstItem?: () => void
  lastItem?: () => void
  renderItem?: (key: string, index: number) => JSX.Element
}

customElement(
  'g-virtual-scroll-column',
  {
    items: undefined,
    buffer: undefined,
    renderItem: undefined,
    indexRange: undefined,
    firstItem: undefined,
    lastItem: undefined,
  },
  (props) => {
    return (
      <>
        <style>{styles}</style>
        <GVirutalScrollColumn
          items={props.items}
          buffer={props.buffer}
          indexRange={props.indexRange}
          firstItem={props.firstItem}
          lastItem={props.lastItem}
          renderItem={props.renderItem}
        ></GVirutalScrollColumn>
      </>
    )
  }
)

const GVirutalScrollColumn = (props: Partial<GVirutalScrollColumnprops>) => {
  const controller = new VirtualScrollController()
  const context = useVirtualScrollContext()
  context?.registerController({ controller, change: virtualScrollChange })
  const defaultProps = mergeProps<
    [GVirutalScrollColumnprops, ...Partial<GVirutalScrollColumnprops>[]]
  >(
    {
      items: [],
      buffer: 10,
    },
    props
  )

  const [contentHeight, setContentHeight] = createSignal(0)
  const [contentOffsetTop, setContentOffsetTop] = createSignal(0)
  const [currentItems, setCurrentItems] = createSignal<GVirtualScrollItemWithIndex[]>([])
  let currentItemsCopy: GVirtualScrollItemWithIndex[] = []

  createEffect(() => {
    controller.initDefaultItems(defaultProps.items.map((item) => item.value))
    setContentHeight(controller.totalHeight)
    context?.setVirtualScrollHeight(controller.totalHeight)
    virtualScrollChange()
  })

  const placeholderClasses = () =>
    `${
      context?.horizontal()
        ? 'virtual-scroll-placeholder-horizontal'
        : 'virtual-scroll-placeholder-vertical'
    }`

  const contentClasses = () =>
    `${
      context?.horizontal()
        ? 'virtual-scroll-content-horizontal'
        : 'virtual-scroll-content-vertical'
    }`

  const containerStyles = () => `${context?.horizontal() ? 'height:100%' : 'width:100%'};`

  const placeholderStyles = () =>
    `${context?.horizontal() ? `width:${contentHeight()}px` : `height:${contentHeight()}px`};`

  const contentStyles = () =>
    `transform:${
      context?.horizontal()
        ? `translateX(${contentOffsetTop()}px)`
        : `translateY(${contentOffsetTop()}px)`
    };`
  function virtualScrollChange() {
    const tempItems = controller.currentItems.map((item) => ({
      ...defaultProps.items[item.index],
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
      defaultProps.firstItem?.()
    }
    if (controller.endIndex === defaultProps.items.length - 1) {
      defaultProps.lastItem?.()
    }
    defaultProps.indexRange?.(controller.startIndex, controller.endIndex)
  }
  const renderItems = children(() =>
    currentItems().map((item) => (
      <div style={context?.horizontal() ? `width:${item.value}px` : `height:${item.value}px`}>
        {defaultProps.renderItem?.(item.key, item.index)}
      </div>
    ))
  )
  onMount(() => {
    controller.setViewHeight(context?.getViewHeight() ?? 0)
    virtualScrollChange()
  })
  return (
    <div class="virtual-scroll-column" style={containerStyles()}>
      <div class={placeholderClasses()} style={placeholderStyles()}></div>
      <div class={contentClasses()} style={contentStyles()}>
        {renderItems()}
      </div>
    </div>
  )
}

declare module 'solid-js' {
  namespace JSX {
    interface IntrinsicElements {
      'g-virtual-scroll-column': Partial<GVirutalScrollColumnprops>
    }
  }
}
