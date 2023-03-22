import type { JSX } from 'solid-js'
import { createSignal, mergeProps, onMount, createEffect } from 'solid-js'
import { customElement } from 'solid-element'
import { ScrollController } from './controller'
import { createPressedDrag } from '../utils'
import styles from './styles.css?inline'

type ScrollAreaType = 'auto' | 'visible' | 'invisible'

export interface ScrollDetail {
  scrollX: number
  scrollY: number
}

export interface GScrollAreaProps {
  //滚动条x轴位置
  scrollX: number

  //滚动条y轴位置
  scrollY: number

  //auto: 自动显示隐藏
  //visible: 一直显示
  //invisible: 一直隐藏
  //默认值是auto
  type: ScrollAreaType
  children?: JSX.Element | JSX.Element[]
  scrollChange?: (detail: ScrollDetail) => void
}

customElement<Partial<GScrollAreaProps>>(
  'g-scroll-area',
  { scrollX: undefined, scrollY: undefined, type: undefined, scrollChange: undefined },
  (props) => {
    return (
      <>
        <style>{styles}</style>
        <GScrollArea
          scrollX={props.scrollX}
          scrollY={props.scrollY}
          type={props.type}
          scrollChange={props.scrollChange}
        >
          <slot></slot>
        </GScrollArea>
      </>
    )
  }
)

const GScrollArea = (props: Partial<GScrollAreaProps>) => {
  let isAction = false
  let isLeave = false
  let isVisibleHorizontalScroll = false
  let isVisibleVerticalScroll = false
  let scrollController: ScrollController
  let viewRef: HTMLElement
  let contentRef: HTMLElement
  let horizontalScrollbarRef: HTMLElement
  let verticalScrollbarRef: HTMLElement
  let horizontalSliderRef: HTMLElement
  let verticalSliderRef: HTMLElement

  const setViewRef = (el: HTMLElement) => (viewRef = el)
  const setContentRef = (el: HTMLElement) => (contentRef = el)
  const setHorizontalScrollbarRef = (el: HTMLElement) => (horizontalScrollbarRef = el)
  const setVerticalScrollbarRef = (el: HTMLElement) => (verticalScrollbarRef = el)
  const setHorizontalSliderRef = (el: HTMLElement) => (horizontalSliderRef = el)
  const setVerticalSliderRef = (el: HTMLElement) => (verticalSliderRef = el)

  const defaultProps = mergeProps<[GScrollAreaProps, ...Partial<GScrollAreaProps>[]]>(
    {
      scrollX: 0,
      scrollY: 0,
      type: 'auto',
    },
    props
  )

  const [verticalSlider, setVerticalSlider] = createSignal({ top: 0, height: 0 })
  const [horizontalSlider, setHorizontalSlider] = createSignal({ left: 0, width: 0 })

  //监听滚动位置
  createEffect(() => {
    if (scrollController) {
      scrollController.setScroll({ x: defaultProps.scrollX, y: defaultProps.scrollY })
      setHorizontalAndScrollX()
      setVerticalAndScrollY()
    }
  })

  createEffect(() => {
    switch (defaultProps.type) {
      case 'visible':
        visibleScroll()
        break
      case 'invisible':
        invisibleScroll()
        break
      case 'auto':
        invisibleScroll()
        break
    }
  })

  const horizontalSliderStyles = () =>
    `width:${horizontalSlider().width}px;left:${horizontalSlider().left}px`

  const verticalSliderStyles = () =>
    `height:${verticalSlider().height}px;top:${verticalSlider().top}px`

  function emitScroll() {
    defaultProps.scrollChange?.({
      scrollX: scrollController.scrollX,
      scrollY: scrollController.scrollY,
    })
  }

  //判断是否水平溢出
  function isHorizontalOverflow() {
    return contentRef.getBoundingClientRect().width > viewRef.getBoundingClientRect().width
  }

  //判断是否垂直溢出
  function isVerticalOverflow() {
    return contentRef.getBoundingClientRect().height > viewRef.getBoundingClientRect().height
  }

  //设置水平滑块位置大小和滚动位置
  function setHorizontalAndScrollX() {
    setHorizontalSlider({
      left: scrollController.horizontalSliderX,
      width: scrollController.horizontalSliderWidth,
    })
    viewRef.scrollLeft = scrollController.scrollX
  }

  //设置垂直滑块位置大小和滚动位置
  function setVerticalAndScrollY() {
    setVerticalSlider({
      top: scrollController.verticalSliderY,
      height: scrollController.verticalSliderHeight,
    })
    viewRef.scrollTop = scrollController.scrollY
  }

  function visibleScroll() {
    if (isHorizontalOverflow() && !isVisibleHorizontalScroll) {
      isVisibleHorizontalScroll = true
      horizontalScrollbarRef.classList.replace('g-invisible', 'g-scrollbar-visible')
      horizontalSliderRef.classList.replace('g-invisible', 'g-slider-visible')
    }
    if (isVerticalOverflow() && !isVisibleVerticalScroll) {
      isVisibleVerticalScroll = true
      verticalScrollbarRef.classList.replace('g-invisible', 'g-scrollbar-visible')
      verticalSliderRef.classList.replace('g-invisible', 'g-slider-visible')
    }
  }

  function invisibleScroll() {
    if (isHorizontalOverflow() && isVisibleHorizontalScroll) {
      isVisibleHorizontalScroll = false
      horizontalScrollbarRef.classList.replace('g-scrollbar-visible', 'g-invisible')
      horizontalSliderRef.classList.replace('g-slider-visible', 'g-invisible')
    }
    if (isVerticalOverflow() && isVisibleVerticalScroll) {
      isVisibleVerticalScroll = false
      verticalScrollbarRef.classList.replace('g-scrollbar-visible', 'g-invisible')
      verticalSliderRef.classList.replace('g-slider-visible', 'g-invisible')
    }
  }

  //显示滚动条动画
  function visibleScrollbarAnimation() {
    if (isHorizontalOverflow()) {
      visibleHorizontalScrollAnimation()
    }
    if (isVerticalOverflow()) {
      visibleVerticalScrollAnimation()
    }
  }

  //隐藏滚动条动画
  function invisibleScrollbarAnimation() {
    if (isHorizontalOverflow()) {
      invisibleHorizontalScrollAnimation()
    }
    if (isVerticalOverflow()) {
      invisibleVerticalScrollAnimation()
    }
  }

  function visibleHorizontalScrollAnimation() {
    if (!isVisibleHorizontalScroll) {
      isVisibleHorizontalScroll = true
      horizontalScrollbarRef.classList.remove('g-scrollbar-invisible-animation')
      horizontalScrollbarRef.classList.add('g-scrollbar-visible-animation')
      horizontalScrollbarRef.addEventListener('animationend', () => {
        horizontalScrollbarRef.classList.replace('g-invisible', 'g-scrollbar-visible')
      })
      horizontalSliderRef.classList.remove('g-slider-invisible-animation')
      horizontalSliderRef.classList.add('g-slider-visible-animation')
      horizontalSliderRef.addEventListener('animationend', () => {
        horizontalSliderRef.classList.replace('g-invisible', 'g-slider-visible')
      })
    }
  }

  function visibleVerticalScrollAnimation() {
    if (!isVisibleVerticalScroll) {
      isVisibleVerticalScroll = true
      verticalScrollbarRef.classList.remove('g-scrollbar-invisible-animation')
      verticalScrollbarRef.classList.add('g-scrollbar-visible-animation')
      verticalScrollbarRef.addEventListener('animationend', () => {
        verticalScrollbarRef.classList.replace('g-invisible', 'g-scrollbar-visible')
      })
      verticalSliderRef.classList.remove('g-slider-invisible-animation')
      verticalSliderRef.classList.add('g-slider-visible-animation')
      verticalSliderRef.addEventListener('animationend', () => {
        verticalSliderRef.classList.replace('g-invisible', 'g-slider-visible')
      })
    }
  }

  function invisibleHorizontalScrollAnimation() {
    if (isVisibleHorizontalScroll) {
      isVisibleHorizontalScroll = false
      horizontalScrollbarRef.classList.remove('g-scrollbar-visible-animation')
      horizontalScrollbarRef.classList.add('g-scrollbar-invisible-animation')
      horizontalScrollbarRef.addEventListener('animationend', () => {
        horizontalScrollbarRef.classList.replace('g-scrollbar-visible', 'g-invisible')
      })
      horizontalSliderRef.classList.remove('g-slider-visible-animation')
      horizontalSliderRef.classList.add('g-slider-invisible-animation')
      horizontalSliderRef.addEventListener('animationend', () => {
        horizontalSliderRef.classList.replace('g-slider-visible', 'g-invisible')
      })
    }
  }

  function invisibleVerticalScrollAnimation() {
    if (isVisibleVerticalScroll) {
      isVisibleVerticalScroll = false
      verticalScrollbarRef.classList.remove('g-scrollbar-visible-animation')
      verticalScrollbarRef.classList.add('g-scrollbar-invisible-animation')
      verticalScrollbarRef.addEventListener('animationend', () => {
        verticalScrollbarRef.classList.replace('g-scrollbar-visible', 'g-invisible')
      })
      verticalSliderRef.classList.remove('g-slider-visible-animation')
      verticalSliderRef.classList.add('g-slider-invisible-animation')
      verticalSliderRef.addEventListener('animationend', () => {
        verticalSliderRef.classList.replace('g-slider-visible', 'g-invisible')
      })
    }
  }

  //监听可见区域大小对滚动条进行变化
  function watchViewResize() {
    const resizeObserver = new ResizeObserver((entries) => {
      const { width, height } = viewRef.getBoundingClientRect()
      for (let i = 0; i < entries.length; i++) {
        if (isVerticalOverflow()) {
          scrollController.setViewSize({ height })
          setVerticalAndScrollY()
          if (defaultProps.type === 'visible') {
            visibleVerticalScrollAnimation()
          }
        } else if (defaultProps.type === 'visible') {
          invisibleVerticalScrollAnimation()
        }
        if (isHorizontalOverflow()) {
          scrollController.setViewSize({ width })
          setHorizontalAndScrollX()
          if (defaultProps.type === 'visible') {
            visibleHorizontalScrollAnimation()
          }
        } else if (defaultProps.type === 'visible') {
          invisibleHorizontalScrollAnimation()
        }
      }
    })
    resizeObserver.observe(viewRef)
  }

  //监听内容大小对滚动条进行改变
  function watchContentResize() {
    const resizeObserver = new ResizeObserver((entries) => {
      const { width, height } = contentRef.getBoundingClientRect()
      for (let i = 0; i < entries.length; i++) {
        if (isVerticalOverflow()) {
          scrollController.setContentSize({ height })
          setVerticalAndScrollY()
          if (defaultProps.type === 'visible') {
            visibleVerticalScrollAnimation()
          }
        } else if (defaultProps.type === 'visible') {
          invisibleVerticalScrollAnimation()
        }
        if (isHorizontalOverflow()) {
          scrollController.setContentSize({ width })
          setHorizontalAndScrollX()
          if (defaultProps.type === 'visible') {
            visibleHorizontalScrollAnimation()
          }
        } else if (defaultProps.type === 'visible') {
          invisibleHorizontalScrollAnimation()
        }
      }
    })
    resizeObserver.observe(contentRef)
  }

  //鼠标进入滚动区域显示滚动条
  function onEnterScrollArea() {
    isLeave = false
    if (defaultProps.type === 'auto') {
      visibleScrollbarAnimation()
    }
  }

  //鼠标离开滚动区域隐藏滚动条
  function onLeaveScrollArea() {
    isLeave = true
    if (defaultProps.type === 'auto' && !isAction) {
      invisibleScrollbarAnimation()
    }
  }

  //开始操作
  function onAction() {
    isAction = true
  }

  //操作结束后离开滚动区域
  function onActionEndLeaveScrollArea() {
    isAction = false
    if (defaultProps.type === 'auto' && isLeave) {
      invisibleScrollbarAnimation()
    }
  }

  //鼠标点击水平滚动栏跳转到指定位置
  function onHorizontalBarPressed(e: MouseEvent) {
    scrollController.setSlider({
      x:
        e.pageX -
        horizontalScrollbarRef.getBoundingClientRect().x -
        scrollController.horizontalSliderWidth / 2,
    })
    setHorizontalAndScrollX()
  }

  //鼠标点击垂直滚动栏跳转到指定位置
  function onVerticalBarPressed(e: MouseEvent) {
    scrollController.setSlider({
      y:
        e.pageY -
        verticalScrollbarRef.getBoundingClientRect().y -
        scrollController.verticalSliderHeight / 2,
    })
    setVerticalAndScrollY()
  }

  //鼠标拖拽水平滑块滚动
  function onHorizontalSliderDrag() {
    let startEvent: MouseEvent
    const sliderX = scrollController.horizontalSliderX
    createPressedDrag()
      .onStart((e) => {
        onAction()
        startEvent = e
      })
      .onUpdate((e) => {
        scrollController.setSlider({
          x: sliderX + e.pageX - startEvent.pageX,
        })
        setHorizontalAndScrollX()
      })
      .onEnd(onActionEndLeaveScrollArea)
      .action()
  }

  //鼠标拖拽垂直滑块滚动
  function onVerticalSliderDrag() {
    let startEvent: MouseEvent
    const sliderY = scrollController.verticalSliderY
    createPressedDrag()
      .onStart((e) => {
        onAction()
        startEvent = e
      })
      .onUpdate((e) => {
        scrollController.setSlider({
          y: sliderY + e.pageY - startEvent.pageY,
        })
        setVerticalAndScrollY()
      })
      .onEnd(onActionEndLeaveScrollArea)
      .action()
  }

  //滚轮滚动
  function onWheelScroll() {
    viewRef.addEventListener('scroll', () => {
      scrollController.setScroll({ y: viewRef.scrollTop })
      setVerticalAndScrollY()
      emitScroll()
    })
  }

  onMount(() => {
    const { width: viewWidth, height: viewHeight } = viewRef.getBoundingClientRect()
    const { width: contentWidth, height: contentHeight } = contentRef.getBoundingClientRect()
    scrollController = new ScrollController({
      viewSize: { width: viewWidth, height: viewHeight },
      contentSize: { width: contentWidth, height: contentHeight },
      scrollPosition: { x: defaultProps.scrollX, y: defaultProps.scrollY },
    })
    setVerticalSlider({
      top: scrollController.verticalSliderY,
      height: scrollController.verticalSliderHeight,
    })
    setHorizontalSlider({
      left: scrollController.horizontalSliderX,
      width: scrollController.horizontalSliderWidth,
    })
    onWheelScroll()
    watchViewResize()
    watchContentResize()
  })

  return (
    <div class="g-scrollArea" onMouseEnter={onEnterScrollArea} onMouseLeave={onLeaveScrollArea}>
      <div ref={setViewRef} class="g-scrollArea-view">
        <div ref={setContentRef} class="g-scrollArea-content">
          {props.children}
        </div>
      </div>
      <div
        ref={setVerticalScrollbarRef}
        class="g-scroll-vertical-bar g-invisible"
        onMouseDown={onVerticalBarPressed}
      ></div>
      <div
        ref={setVerticalSliderRef}
        style={verticalSliderStyles()}
        class="g-scroll-vertical-slider g-invisible"
        onMouseDown={onVerticalSliderDrag}
      ></div>

      <div
        ref={setHorizontalScrollbarRef}
        class="g-scroll-horizontal-bar g-invisible"
        onMouseDown={onHorizontalBarPressed}
      ></div>
      <div
        ref={setHorizontalSliderRef}
        style={horizontalSliderStyles()}
        class="g-scroll-horizontal-slider g-invisible"
        onMouseDown={onHorizontalSliderDrag}
      ></div>
    </div>
  )
}

declare module 'solid-js' {
  namespace JSX {
    interface IntrinsicElements {
      'g-scroll-area': Partial<GScrollAreaProps> & IntrinsicAttributes
    }
  }
}
