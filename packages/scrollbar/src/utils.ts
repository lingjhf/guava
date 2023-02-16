/**
 * 计算滑块的大小
 *
 * @param viewW 可见区域的宽度或者高度
 * @param contentW 内容的宽度或者高度
 */
export function calcSliderWidth(viewW: number, contentW: number): number {
  return viewW ** 2 / contentW
}

/**
 *根据实际滚动位置计算自定义滑块位置
 *
 * @param scrollX 实际滚动距离
 * @param sliderW 自定义滑块的宽度或者高度
 * @param viewW 可见区域的宽度或者高度
 * @param contentW 内容的宽度或者高度
 */
export function scrollXToSliderX(
  scrollX: number,
  sliderW: number,
  viewW: number,
  contentW: number
): number {
  return scrollX * ((viewW - sliderW) / (contentW - viewW))
}

/**
 *根据自定义滑块位置计算实际滚动位置
 *
 * @param sliderX 自定义滑块位置
 * @param sliderW 自定义滑块的宽度或者高度
 * @param viewW 可见区域的宽度或者高度
 * @param contentW 内容的宽度或者高度
 */
export function sliderXToScrollX(
  sliderX: number,
  sliderW: number,
  viewW: number,
  contentW: number
): number {
  return sliderX * ((contentW - viewW) / (viewW - sliderW))
}

class PressedDrag {
  events = new Map()

  onStart(handler: (e: MouseEvent) => void): PressedDrag {
    this.events.set('onStart', handler)
    return this
  }

  onUpdate(handler: (e: MouseEvent) => void): PressedDrag {
    this.events.set('onUpdate', handler)
    return this
  }

  onEnd(handler: (e: MouseEvent) => void): PressedDrag {
    this.events.set('onEnd', handler)
    return this
  }

  action() {
    const onStart = this.events.get('onStart')
    const onUpdate = this.events.get('onUpdate')
    const onEnd = this.events.get('onEnd')

    const onUp = (e: MouseEvent) => {
      onEnd?.(e)
      window.removeEventListener('mousedown', onStart)
      window.removeEventListener('mousemove', onUpdate)
      window.removeEventListener('mouseup', onUp)
    }

    window.addEventListener('mousedown', onStart)
    window.addEventListener('mousemove', onUpdate)
    window.addEventListener('mouseup', onUp)
  }
}

export function createPressedDrag() {
  return new PressedDrag()
}
