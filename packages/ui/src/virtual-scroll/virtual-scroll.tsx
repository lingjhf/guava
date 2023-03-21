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

export interface GVirtualScrollProps {
  horizontal: boolean
  change?: (scrollTop: number) => void
  children?: JSX.Element | JSXElement[]
}

interface RegisterControllerOptions {
  controller: VirtualScrollController
  change: () => void
}

interface VirtualScrollProviderValue {
  horizontal: Accessor<boolean>
  registerController: (options: RegisterControllerOptions) => void
}

const VirtualScrollContext = createContext<VirtualScrollProviderValue>()

export const useVirtualScrollContext = () => useContext(VirtualScrollContext)

customElement('g-virtual-scroll', { horizontal: undefined }, (props) => {
  return (
    <>
      <style>{styles}</style>
      <GVirtualScroll horizontal={props.horizontal}>
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

  createEffect(() => {
    setHorizontal(defaultProps.horizontal)
  })

  const virtualScrollClasses = () =>
    `${defaultProps.horizontal ? 'virtual-scroll-horizontal' : 'virtual-scroll-vertical'}`

  const controllers: RegisterControllerOptions[] = []

  function registerController(controller: RegisterControllerOptions) {
    controllers.push(controller)
  }

  const providerValue: VirtualScrollProviderValue = {
    horizontal,
    registerController,
  }

  function initCurrentItems() {
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
        initCurrentItems()
      }
    })
    resizeObserver.observe(containerRef)
  }

  onMount(() => {
    watchContainerResize()
    containerRef.addEventListener('scroll', () => {
      const scrollTop = defaultProps.horizontal ? containerRef.scrollLeft : containerRef.scrollTop
      defaultProps.change?.(scrollTop)
      controllers.forEach((item) => {
        item.controller.setScrollTop(scrollTop)
        item.change()
      })
    })
  })

  return (
    <VirtualScrollContext.Provider value={providerValue}>
      <div class={virtualScrollClasses()} ref={setContainerRef}>
        {defaultProps.children}
      </div>
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
