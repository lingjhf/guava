import { createSignal, createEffect, onMount } from 'solid-js'
import { ScrollController } from './controller'
import { GuavaParentProps } from '../types'
import { createPressedDrag, generateSplitEventHandlersProps, mergeClassList, mergeClasses, mergeStyles } from '../utils'
import styles from './scrollbar.module.css'

export type ScrollbarType = 'auto' | 'visible' | 'invisible'

export interface ScrollDetail {
  scrollX: number
  scrollY: number
}

export interface ScrollbarProps extends GuavaParentProps<HTMLDivElement> {
  //滚动条x轴位置
  scrollX: number

  //滚动条y轴位置
  scrollY: number

  //auto: 自动显示隐藏
  //visible: 一直显示
  //invisible: 一直隐藏
  //默认值是auto
  type: ScrollbarType
  scrollChange?: (detail: ScrollDetail) => void
}

export const Scrollbar = (propsRaw: Partial<ScrollbarProps>) => {

  const [eventHandlers, props] = generateSplitEventHandlersProps(
    propsRaw,
    {
      scrollX: 0,
      scrollY: 0,
      type: 'auto',
    },
  )

  let viewRef: HTMLElement
  let contentRef: HTMLElement
  let horizontalScrollbarRef: HTMLElement
  let verticalScrollbarRef: HTMLElement
  let horizontalSliderRef: HTMLElement
  let verticalSliderRef: HTMLElement
  let isAction = false
  let isLeave = false
  let isVisibleHorizontalScroll = false
  let isVisibleVerticalScroll = false
  let scrollController: ScrollController
  const [verticalSlider, setVerticalSlider] = createSignal({ top: 0, height: 0 })
  const [horizontalSlider, setHorizontalSlider] = createSignal({ left: 0, width: 0 })

  const setViewRef = (el: HTMLElement) => (viewRef = el)
  const setContentRef = (el: HTMLElement) => (contentRef = el)
  const setHorizontalScrollbarRef = (el: HTMLElement) => (horizontalScrollbarRef = el)
  const setVerticalScrollbarRef = (el: HTMLElement) => (verticalScrollbarRef = el)
  const setHorizontalSliderRef = (el: HTMLElement) => (horizontalSliderRef = el)
  const setVerticalSliderRef = (el: HTMLElement) => (verticalSliderRef = el)

  //监听滚动位置
  createEffect(() => {
    const scrollX = props.scrollX
    const scrollY = props.scrollY
    if (scrollController) {
      scrollController.setScroll({ x: scrollX, y: scrollY })
      setHorizontalAndScrollX()
      setVerticalAndScrollY()
    }
  })

  createEffect(() => {
    switch (props.type) {
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
    props.scrollChange?.({
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
      left: scrollController.horizontalSliderX + scrollController.scrollX,
      width: scrollController.horizontalSliderWidth,
    })
    viewRef.scrollLeft = scrollController.scrollX
  }

  //设置垂直滑块位置大小和滚动位置
  function setVerticalAndScrollY() {
    setVerticalSlider({
      top: scrollController.verticalSliderY + scrollController.scrollY,
      height: scrollController.verticalSliderHeight,
    })
    viewRef.scrollTop = scrollController.scrollY
  }

  function visibleScroll() {
    if (isHorizontalOverflow() && !isVisibleHorizontalScroll) {
      isVisibleHorizontalScroll = true
      horizontalScrollbarRef.classList.replace(styles.invisible, styles.scrollbarVisible)
      horizontalSliderRef.classList.replace(styles.invisible, styles.sliderVisible)
    }
    if (isVerticalOverflow() && !isVisibleVerticalScroll) {
      isVisibleVerticalScroll = true
      verticalScrollbarRef.classList.replace(styles.invisible, styles.scrollbarVisible)
      verticalSliderRef.classList.replace(styles.invisible, styles.sliderVisible)
    }
  }

  function invisibleScroll() {
    if (isHorizontalOverflow() && isVisibleHorizontalScroll) {
      isVisibleHorizontalScroll = false
      horizontalScrollbarRef.classList.replace(styles.scrollbarVisible, styles.invisible)
      horizontalSliderRef.classList.replace(styles.sliderVisible, styles.invisible)
    }
    if (isVerticalOverflow() && isVisibleVerticalScroll) {
      isVisibleVerticalScroll = false
      verticalScrollbarRef.classList.replace(styles.scrollbarVisible, styles.invisible)
      verticalSliderRef.classList.replace(styles.sliderVisible, styles.invisible)
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
      horizontalScrollbarRef.classList.remove(styles.scrollbarInvisibleAnimation)
      horizontalScrollbarRef.classList.add(styles.scrollbarVisibleAnimation)
      horizontalScrollbarRef.addEventListener('animationend', () => {
        horizontalScrollbarRef.classList.replace(styles.invisible, styles.scrollbarVisible)
      })
      horizontalSliderRef.classList.remove(styles.sliderInvisibleAnimation)
      horizontalSliderRef.classList.add(styles.sliderVisibleAnimation)
      horizontalSliderRef.addEventListener('animationend', () => {
        horizontalSliderRef.classList.replace(styles.invisible, styles.sliderVisible)
      })
    }
  }

  function visibleVerticalScrollAnimation() {
    if (!isVisibleVerticalScroll) {
      isVisibleVerticalScroll = true
      verticalScrollbarRef.classList.remove(styles.scrollbarInvisibleAnimation)
      verticalScrollbarRef.classList.add(styles.scrollbarVisibleAnimation)
      verticalScrollbarRef.addEventListener('animationend', () => {
        verticalScrollbarRef.classList.replace(styles.invisible, styles.scrollbarVisible)
      })
      verticalSliderRef.classList.remove(styles.sliderInvisibleAnimation)
      verticalSliderRef.classList.add(styles.sliderVisibleAnimation)
      verticalSliderRef.addEventListener('animationend', () => {
        verticalSliderRef.classList.replace(styles.invisible, styles.sliderVisible)
      })
    }
  }

  function invisibleHorizontalScrollAnimation() {
    if (isVisibleHorizontalScroll) {
      isVisibleHorizontalScroll = false
      horizontalScrollbarRef.classList.remove(styles.scrollbarVisibleAnimation)
      horizontalScrollbarRef.classList.add(styles.scrollbarInvisibleAnimation)
      horizontalScrollbarRef.addEventListener('animationend', () => {
        horizontalScrollbarRef.classList.replace(styles.scrollbarVisible, styles.invisible)
      })
      horizontalSliderRef.classList.remove(styles.sliderVisibleAnimation)
      horizontalSliderRef.classList.add(styles.sliderInvisibleAnimation)
      horizontalSliderRef.addEventListener('animationend', () => {
        horizontalSliderRef.classList.replace(styles.sliderVisible, styles.invisible)
      })
    }
  }

  function invisibleVerticalScrollAnimation() {
    if (isVisibleVerticalScroll) {
      isVisibleVerticalScroll = false
      verticalScrollbarRef.classList.remove(styles.scrollbarVisibleAnimation)
      verticalScrollbarRef.classList.add(styles.scrollbarInvisibleAnimation)
      verticalScrollbarRef.addEventListener('animationend', () => {
        verticalScrollbarRef.classList.replace(styles.scrollbarVisible, styles.invisible)
      })
      verticalSliderRef.classList.remove(styles.sliderVisibleAnimation)
      verticalSliderRef.classList.add(styles.sliderInvisibleAnimation)
      verticalSliderRef.addEventListener('animationend', () => {
        verticalSliderRef.classList.replace(styles.sliderVisible, styles.invisible)
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
          if (props.type === 'visible') {
            visibleVerticalScrollAnimation()
          }
        } else if (props.type === 'visible') {
          invisibleVerticalScrollAnimation()
        }
        if (isHorizontalOverflow()) {
          scrollController.setViewSize({ width })
          setHorizontalAndScrollX()
          if (props.type === 'visible') {
            visibleHorizontalScrollAnimation()
          }
        } else if (props.type === 'visible') {
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
          if (props.type === 'visible') {
            visibleVerticalScrollAnimation()
          }
        } else if (props.type === 'visible') {
          invisibleVerticalScrollAnimation()
        }
        if (isHorizontalOverflow()) {
          scrollController.setContentSize({ width })
          setHorizontalAndScrollX()
          if (props.type === 'visible') {
            visibleHorizontalScrollAnimation()
          }
        } else if (props.type === 'visible') {
          invisibleHorizontalScrollAnimation()
        }
      }
    })
    resizeObserver.observe(contentRef)
  }

  //鼠标进入滚动区域显示滚动条
  function onEnterScrollArea() {
    isLeave = false
    if (props.type === 'auto') {
      visibleScrollbarAnimation()
    }
  }

  //鼠标离开滚动区域隐藏滚动条
  function onLeaveScrollArea() {
    isLeave = true
    if (props.type === 'auto' && !isAction) {
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
    if (props.type === 'auto' && isLeave) {
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
      if (viewRef.scrollTop > 0) {
        scrollController.setScroll({ y: viewRef.scrollTop })
        setVerticalAndScrollY()
        emitScroll()
      }
    })
  }

  onMount(() => {
    const { width: viewWidth, height: viewHeight } = viewRef.getBoundingClientRect()
    const { width: contentWidth, height: contentHeight } = contentRef.getBoundingClientRect()
    scrollController = new ScrollController({
      viewSize: { width: viewWidth, height: viewHeight },
      contentSize: { width: contentWidth, height: contentHeight },
      scrollPosition: { x: props.scrollX, y: props.scrollY },
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
    <div
      ref={setViewRef}
      style={mergeStyles([], props.style)}
      class={mergeClasses([styles.scrollView], props.class)}
      classList={mergeClassList({}, props.classList)}
      onMouseEnter={onEnterScrollArea}
      onMouseLeave={onLeaveScrollArea}>
      <div ref={setContentRef}>
        {props.children}
      </div>
      <div
        ref={setVerticalScrollbarRef}
        class={`${styles.scrollVerticalBar} ${styles.invisible}`}
        onMouseDown={onVerticalBarPressed}
      ></div>
      <div
        ref={setVerticalSliderRef}
        style={verticalSliderStyles()}
        class={`${styles.scrollVerticalSlider} ${styles.invisible}`}
        onMouseDown={onVerticalSliderDrag}
      ></div>
      <div
        ref={setHorizontalScrollbarRef}
        class={`${styles.scrollHorizontalBar} ${styles.invisible}`}
        onMouseDown={onHorizontalBarPressed}
      ></div>
      <div
        ref={setHorizontalSliderRef}
        style={horizontalSliderStyles()}
        class={`${styles.scrollHorizontalSlider} ${styles.invisible}`}
        onMouseDown={onHorizontalSliderDrag}
      ></div>
    </div>
  )
}