import { type JSX, type Accessor, createContext, createSignal, useContext, onMount, createEffect } from 'solid-js'
import type { VirtualScrollController } from './controller'
import { generateSplitEventHandlersProps } from '../utils'
import { GScrollbar } from '../scrollbar'
import styles from './virtual-scroll.module.css'

export interface VirtualScrollProps {
  horizontal: boolean
  scrollChange?: (scrollTop: number) => void
  children?: JSX.Element
}

interface RegisterControllerOptions {
  controller: VirtualScrollController
  change: () => void
}

interface VirtualScrollProviderValue {
  horizontal: Accessor<boolean>
  registerController: (options: RegisterControllerOptions) => void
  setVirtualScrollHeight: (value: number) => void
  getViewHeight: () => number
}

const VirtualScrollContext = createContext<VirtualScrollProviderValue>()

export const useVirtualScrollContext = () => useContext(VirtualScrollContext)

export const VirtualScroll = (propsRaw: Partial<VirtualScrollProps>) => {

  const [eventHandlers, props] = generateSplitEventHandlersProps(
    propsRaw,
    {
      horizontal: false,
    },
  )

  let containerRef: HTMLElement
  const setContainerRef = (el: HTMLElement) => (containerRef = el)
  let viewHeight = 0
  const [horizontal, setHorizontal] = createSignal(props.horizontal)
  const [height, setHeight] = createSignal(0)

  createEffect(() => {
    setHorizontal(props.horizontal)
  })

  const virtualScrollClasses = () =>
    props.horizontal ? styles.virtualScrollHorizontal : styles.virtualScrollVertical

  const virtualScrollStyles = () =>
    `${props.horizontal ? `width:${height()}px` : `height:${height()}px`}`

  const controllers: RegisterControllerOptions[] = []

  function registerController(controller: RegisterControllerOptions) {
    controllers.push(controller)
  }
  function setVirtualScrollHeight(value: number) {
    if (value > height()) {
      setHeight(value)
    }
  }
  function getViewHeight() {
    return viewHeight
  }

  function setViewHeight() {
    viewHeight = props.horizontal ? containerRef.offsetWidth : containerRef.offsetHeight
  }

  const providerValue: VirtualScrollProviderValue = {
    horizontal,
    registerController,
    setVirtualScrollHeight,
    getViewHeight,
  }

  function watchContainerResize() {
    const resizeObserver = new ResizeObserver((entries) => {
      for (let i = 0; i < entries.length; i++) {
        setViewHeight()
        controllers.forEach((item) => {
          item.controller.setViewHeight(viewHeight)
          item.change()
        })
      }
    })
    resizeObserver.observe(containerRef)
  }

  function onScrollChange({ scrollX, scrollY }) {
    const scrollTop = props.horizontal ? scrollX : scrollY
    props.scrollChange?.(scrollTop)
    controllers.forEach((item) => {
      item.controller.setScrollTop(scrollTop)
      item.change()
    })
  }

  onMount(() => {
    setViewHeight()
    watchContainerResize()
  })

  return (
    <VirtualScrollContext.Provider value={providerValue}>
      <GScrollbar ref={setContainerRef} scrollChange={onScrollChange}>
        <div class={virtualScrollClasses()} style={virtualScrollStyles()}>
          {props.children}
        </div>
      </GScrollbar>
    </VirtualScrollContext.Provider>
  )
}
