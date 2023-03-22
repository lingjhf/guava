import type { JSX } from 'solid-js'
import {
  createContext,
  createSignal,
  JSXElement,
  useContext,
  onMount,
  mergeProps,
  createEffect,
  Accessor,
} from 'solid-js'
import { customElement } from 'solid-element'
import { VirtualScrollController } from '../virtual-scroll-column'
import styles from './styles.css?inline'
import '../scroll-area'
export interface GVirtualScrollProps {
  horizontal: boolean
  scrollChange?: (scrollTop: number) => void
  children?: JSX.Element | JSXElement[]
}

interface RegisterControllerOptions {
  controller: VirtualScrollController
  change: () => void
}

interface VirtualScrollProviderValue {
  horizontal: Accessor<boolean>
  registerController: (options: RegisterControllerOptions) => void
  setVirtualScrollHeight: (value: number) => void
}

const VirtualScrollContext = createContext<VirtualScrollProviderValue>()

export const useVirtualScrollContext = () => useContext(VirtualScrollContext)

customElement('g-virtual-scroll', { horizontal: undefined, scrollChange: undefined }, (props) => {
  return (
    <>
      <style>{styles}</style>
      <GVirtualScroll horizontal={props.horizontal} scrollChange={props.scrollChange}>
        <slot></slot>
      </GVirtualScroll>
    </>
  )
})

const GVirtualScroll = (props: Partial<GVirtualScrollProps>) => {
  let containerRef: HTMLElement
  const setContainerRef = (el: HTMLElement) => (containerRef = el)

  const defaultProps = mergeProps<[GVirtualScrollProps, ...Partial<GVirtualScrollProps>[]]>(
    {
      horizontal: false,
    },
    props
  )
  const [horizontal, setHorizontal] = createSignal(defaultProps.horizontal)
  const [height, setHeight] = createSignal(0)

  createEffect(() => {
    setHorizontal(defaultProps.horizontal)
  })

  const virtualScrollClasses = () =>
    `${defaultProps.horizontal ? 'virtual-scroll-horizontal' : 'virtual-scroll-vertical'}`

  const virtualScrollStyles = () =>
    `${defaultProps.horizontal ? `width:${height()}px` : `height:${height()}px`}`

  const controllers: RegisterControllerOptions[] = []

  function registerController(controller: RegisterControllerOptions) {
    controllers.push(controller)
  }
  function setVirtualScrollHeight(value: number) {
    if (value > height()) {
      setHeight(value)
    }
  }

  const providerValue: VirtualScrollProviderValue = {
    horizontal,
    registerController,
    setVirtualScrollHeight,
  }

  function initViewHeight() {
    controllers.forEach((item) => {
      item.controller.setViewHeight(
        defaultProps.horizontal ? containerRef.offsetWidth : containerRef.offsetHeight
      )
      item.change()
    })
  }

  function watchContainerResize() {
    const resizeObserver = new ResizeObserver((entries) => {
      for (let i = 0; i < entries.length; i++) {
        initViewHeight()
      }
    })
    resizeObserver.observe(containerRef)
  }

  function onScrollChange({ scrollX, scrollY }) {
    const scrollTop = defaultProps.horizontal ? scrollX : scrollY
    defaultProps.scrollChange?.(scrollTop)
    controllers.forEach((item) => {
      item.controller.setScrollTop(scrollTop)
      item.change()
    })
  }

  onMount(() => {
    watchContainerResize()
  })

  return (
    <VirtualScrollContext.Provider value={providerValue}>
      <g-scroll-area ref={setContainerRef} scroll-change={onScrollChange}>
        <div class={virtualScrollClasses()} style={virtualScrollStyles()}>
          {defaultProps.children}
        </div>
      </g-scroll-area>
    </VirtualScrollContext.Provider>
  )
}

declare module 'solid-js' {
  namespace JSX {
    interface IntrinsicElements {
      'g-virtual-scroll': Partial<GVirtualScrollProps>
    }
  }
}
