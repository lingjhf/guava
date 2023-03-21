import type { JSX } from 'solid-js'
import { createEffect } from 'solid-js'
import { mergeProps, Index, createSignal } from 'solid-js'
import { customElement } from 'solid-element'
import { useVirtualScrollContext } from '../virtual-scroll'
import { VirtualScrollController } from './controller'
import styles from './styles.css?inline'

export interface GVirtualScrollItem {
  key: string
  value: number
}

export interface GVirutalScrollColumnprops {
  items: GVirtualScrollItem[]
  buffer: number
  renderItem?: (key: string) => JSX.Element
}

customElement(
  'g-virtual-scroll-column',
  { items: undefined, buffer: undefined, renderItem: undefined },
  (props) => {
    return (
      <>
        <style>{styles}</style>
        <GVirutalScrollColumn
          items={props.items}
          buffer={props.buffer}
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
  const [currentItems, setCurrentItems] = createSignal<GVirtualScrollItem[]>([])

  createEffect(() => {
    controller.initDefaultItems(defaultProps.items.map((item) => item.value))
    setContentHeight(controller.totalHeight)
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
    const tempItems = controller.currentItems.map((item) => defaultProps.items[item.index])
    setContentOffsetTop(controller.offsetTop)
    setCurrentItems(tempItems)
  }
  return (
    <div class="virtual-scroll-column" style={containerStyles()}>
      <div class={placeholderClasses()} style={placeholderStyles()}></div>
      <div class={contentClasses()} style={contentStyles()}>
        <Index each={currentItems()}>
          {(item) => (
            <div
              style={context?.horizontal() ? `width:${item().value}px` : `height:${item().value}px`}
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
      'g-virtual-scroll-column': Partial<GVirutalScrollColumnprops>
    }
  }
}
