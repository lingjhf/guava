import type { JSX } from 'solid-js'
import { createSignal, onMount, Index, mergeProps, createEffect } from 'solid-js'
import { customElement } from 'solid-element'
import { VirtualScrollController } from './controller'
import styles from './styles.css?inline'

export interface GVirtualScrollItem {
  key: string
  value: number
}

export interface GVirtualScrollProps {
  items: GVirtualScrollItem[]
  horizontal: boolean
  renderItem?: (key: string) => JSX.Element
}

customElement(
  'g-virtual-scroll',
  { items: undefined, horizontal: undefined, renderItem: undefined },
  (props) => {
    return (
      <>
        <style>{styles}</style>
        <GVirtualScroll
          items={props.items}
          horizontal={props.horizontal}
          renderItem={props.renderItem}
        ></GVirtualScroll>
      </>
    )
  }
)

const GVirtualScroll = (props: Partial<GVirtualScrollProps>) => {
  let containerRef: HTMLElement
  const setContainerRef = (el: HTMLElement) => (containerRef = el)
  const controller = new VirtualScrollController()

  const defaultProps = mergeProps<[GVirtualScrollProps, ...Partial<GVirtualScrollProps>[]]>(
    {
      items: [],
      horizontal: false,
    },
    props
  )

  const [contentHeight, setContentHeight] = createSignal(0)
  const [contentOffsetTop, setContentOffsetTop] = createSignal(0)
  const [currentItems, setCurrentItems] = createSignal<GVirtualScrollItem[]>([])

  createEffect(() => {
    if (controller.viewHeight) {
      const tempItems = controller
        .initDefaultItems(defaultProps.items.map((item) => item.value))
        .currentItems.map((item) => defaultProps.items[item.index])
      setCurrentItems(tempItems)
      setContentHeight(controller.totalHeight)
    }
  })

  const virtualScrollClasses = () =>
    `${defaultProps.horizontal ? 'virtual-scroll-horizontal' : 'virtual-scroll-vertical'}`

  const placeholderClasses = () =>
    `${
      defaultProps.horizontal
        ? 'virtual-scroll-placeholder-horizontal'
        : 'virtual-scroll-placeholder-vertical'
    }`

  const contentClasses = () =>
    `${
      defaultProps.horizontal
        ? 'virtual-scroll-content-horizontal'
        : 'virtual-scroll-content-vertical'
    }`

  const placeholderStyles = () =>
    `${defaultProps.horizontal ? `width:${contentHeight()}px` : `height:${contentHeight()}px`};`

  const contentStyles = () =>
    `transform:${
      defaultProps.horizontal
        ? `translateX(${contentOffsetTop()}px)`
        : `translateY(${contentOffsetTop()}px)`
    };`

  function initCurrentItems() {
    const tempItems = controller
      .setViewHeight(defaultProps.horizontal ? containerRef.offsetWidth : containerRef.offsetHeight)
      .initDefaultItems(defaultProps.items.map((item) => item.value))
      .currentItems.map((item) => defaultProps.items[item.index])
    setCurrentItems(tempItems)
    setContentHeight(controller.totalHeight)
  }

  function watchContainerResize() {
    const resizeObserver = new ResizeObserver((entries) => {
      for (let i = 0; i < entries.length; i++) {
        initCurrentItems()
      }
    })
    resizeObserver.observe(containerRef)
  }

  onMount(() => {
    watchContainerResize()
    containerRef.addEventListener('scroll', () => {
      const tempItems = controller
        .setScrollTop(defaultProps.horizontal ? containerRef.scrollLeft : containerRef.scrollTop)
        .currentItems.map((item) => defaultProps.items[item.index])
      setContentOffsetTop(controller.offsetTop)
      setCurrentItems(tempItems)
    })
  })

  return (
    <div class={virtualScrollClasses()} ref={setContainerRef}>
      <div class={placeholderClasses()} style={placeholderStyles()}></div>
      <div class={contentClasses()} style={contentStyles()}>
        <Index each={currentItems()}>
          {(item) => (
            <div
              style={
                defaultProps.horizontal ? `width:${item().value}px` : `height:${item().value}px`
              }
            >
              {defaultProps.renderItem?.(item().key)}
            </div>
          )}
        </Index>
      </div>
    </div>
  )
}

declare module 'solid-js' {
  namespace JSX {
    interface IntrinsicElements {
      'g-virtual-scroll ': Partial<GVirtualScrollProps>
    }
  }
}
