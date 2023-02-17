import { createSignal, JSX, mergeProps, Show, onMount, createEffect } from 'solid-js'
import { ScrollController } from './controller'
import { createPressedDrag } from './utils'

type ScrollAreaType = 'auto' | 'visible' | 'invisible'

interface scrollDetail {
  scrollX: number
  scrollY: number
}

interface Props {
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
  onScroll?: (detail: scrollDetail) => void
}

const defaultPropsData: Props = {
  scrollX: 0,
  scrollY: 0,
  type: 'auto',
}

export const GScrollArea = (props: Partial<Props>) => {
  let isAction = false
  let isLeave = false
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

  const defaultProps = mergeProps<[Props, ...Partial<Props>[]]>(defaultPropsData, props)

  const [verticalSlider, setVerticalSlider] = createSignal({ top: 0, height: 0 })
  const [horizontalSlider, setHorizontalSlider] = createSignal({ left: 0, width: 0 })
  const [visibleHorizontalScrollbar, setVisibleHorizontalScrollbar] = createSignal(false)
  const [visibleVerticalScrollbar, setVisibleVerticalScrollbar] = createSignal(false)

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
        setVisibleHorizontalScrollbar(true)
        setVisibleVerticalScrollbar(true)
        break

      case 'invisible':
        setVisibleHorizontalScrollbar(false)
        setVisibleVerticalScrollbar(false)
        break
    }
  })

  const horizontalSliderStyles = () =>
    `width:${horizontalSlider().width}px;left:${horizontalSlider().left}px`

  const verticalSliderStyles = () =>
    `height:${verticalSlider().height}px;top:${verticalSlider().top}px`

  function emitScroll() {
    defaultProps.onScroll?.({
      scrollX: scrollController.scrollX,
      scrollY: scrollController.scrollY,
    })
  }

  //判断是否水平溢出
  function isHorizontalOverflow() {
    return contentRef.offsetWidth > viewRef.offsetWidth
  }

  //判断是否垂直溢出
  function isVerticalOverflow() {
    return contentRef.offsetHeight > viewRef.offsetHeight
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

  //监听可见区域大小对滚动条进行变化
  function watchViewResize() {
    const resizeObserver = new ResizeObserver((entries) => {
      for (let i = 0; i < entries.length; i++) {
        if (isVerticalOverflow()) {
          scrollController.setViewSize({ height: viewRef.offsetHeight })
          setVerticalAndScrollY()
        }
        if (isHorizontalOverflow()) {
          scrollController.setViewSize({ width: viewRef.offsetWidth })
          setHorizontalAndScrollX()
        }
      }
    })
    resizeObserver.observe(viewRef)
  }

  //监听内容大小对滚动条进行改变
  function watchContentResize() {
    const resizeObserver = new ResizeObserver((entries) => {
      for (let i = 0; i < entries.length; i++) {
        if (isVerticalOverflow()) {
          scrollController.setContentSize({ height: contentRef.offsetHeight })
          setVerticalAndScrollY()
        }
        if (isHorizontalOverflow()) {
          scrollController.setContentSize({ width: contentRef.offsetWidth })
          setHorizontalAndScrollX()
        }
      }
    })
    resizeObserver.observe(contentRef)
  }

  //鼠标进入滚动区域显示滚动条
  function onEnterScrollArea() {
    isLeave = false
    if (defaultProps.type === 'auto') {
      setVisibleHorizontalScrollbar(true)
      setVisibleVerticalScrollbar(true)
    }
  }

  //鼠标离开滚动区域隐藏滚动条
  function onLeaveScrollArea() {
    isLeave = true
    if (defaultProps.type === 'auto' && !isAction) {
      setVisibleHorizontalScrollbar(false)
      setVisibleVerticalScrollbar(false)
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
      setVisibleHorizontalScrollbar(false)
      setVisibleVerticalScrollbar(false)
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
    scrollController = new ScrollController({
      viewSize: { width: viewRef.offsetWidth, height: viewRef.offsetHeight },
      contentSize: { width: contentRef.offsetWidth, height: contentRef.offsetHeight },
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
      <Show when={visibleVerticalScrollbar()}>
        <div
          ref={setVerticalScrollbarRef}
          class="g-scroll-vertical-bar"
          onMouseDown={onVerticalBarPressed}
        ></div>
        <div
          ref={setVerticalSliderRef}
          style={verticalSliderStyles()}
          class="g-scroll-vertical-slider"
          onMouseDown={onVerticalSliderDrag}
        ></div>
      </Show>
      <Show when={visibleHorizontalScrollbar()}>
        <div
          ref={setHorizontalScrollbarRef}
          class="g-scroll-horizontal-bar"
          onMouseDown={onHorizontalBarPressed}
        ></div>
        <div
          ref={setHorizontalSliderRef}
          style={horizontalSliderStyles()}
          class="g-scroll-horizontal-slider"
          onMouseDown={onHorizontalSliderDrag}
        ></div>
      </Show>
    </div>
  )
}
