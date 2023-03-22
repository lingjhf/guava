export interface VirtualScrollItem {
  index: number
  y: number
  height: number
}

export interface VirtualScrollOptions {
  viewHeight?: number
  scrollTop?: number
  defaultItems?: number[]
  buffer?: number
}

export class VirtualScrollController {
  private _viewHeight: number
  private _items: VirtualScrollItem[] = []
  private _totalHeight = 0
  private _offsetTop = 0
  private _scrollTop = 0
  private _currentItems: VirtualScrollItem[] = []
  private _buffer = 10
  private scrollDirection = 0
  private beforeBuffer: VirtualScrollItem[] = []
  private afterBuffer: VirtualScrollItem[] = []
  private _startIndex = 0
  private _endIndex = 0
  constructor({
    viewHeight = 0,
    scrollTop = 0,
    defaultItems = [],
    buffer = 10,
  }: VirtualScrollOptions = {}) {
    this._viewHeight = viewHeight
    this._scrollTop = scrollTop
    this._buffer = buffer < 0 ? this._buffer : buffer
    this.initDefaultItems(defaultItems)
  }
  /**
   * 返回当前可见高度
   */
  get viewHeight(): number {
    return this._viewHeight
  }

  /**
   * 返回y轴滚动距离
   */
  get scrollTop(): number {
    return this._scrollTop
  }

  /**
   * 返回所有items
   */
  get items(): VirtualScrollItem[] {
    return this._items
  }

  /**
   * 返回内容相对高度
   */
  get offsetTop(): number {
    return this._offsetTop
  }

  /**
   * 返回总高度
   */
  get totalHeight(): number {
    return this._totalHeight
  }

  /**
   * 返回当前items
   */
  get currentItems(): VirtualScrollItem[] {
    this.setCurrentItems()
    return this._currentItems
  }

  /**
   * 返回可见范围第一个索引
   */
  get startIndex(): number {
    return this._startIndex
  }

  /**
   * 返回可见范围最后一个索引
   */
  get endIndex(): number {
    return this._endIndex
  }

  /**
   * 初始化默认items
   * @param items 一个高度数组，每一项代表一个高度
   * @returns 返回当前实例
   */
  initDefaultItems(items: number[]) {
    this._currentItems = []
    this._items = []
    this.beforeBuffer = []
    this.afterBuffer = []
    let totalHeight = 0
    for (let i = 0; i < items.length; i++) {
      const item = items[i]
      this._items.push({ index: i, height: item, y: totalHeight })
      totalHeight += item
    }
    this._totalHeight = totalHeight
    return this
  }

  /**
   * 设置buffer
   * @param value buffer值
   * @returns
   */
  setBuffer(value: number) {
    if (value < 0) return
    this._buffer = value
  }

  /**
   * 设置可见区域高度
   * @param value 可见区域高度
   * @returns 返回当前实例
   */
  setViewHeight(value: number) {
    this._viewHeight = value
    return this
  }

  /**
   *设置y轴滚动距离
   * @param value y轴滚动距离
   * @returns 返回当前实例
   */
  setScrollTop(value: number) {
    this.scrollDirection = value - this._scrollTop
    this._scrollTop = value
    return this
  }

  /**
   * 设置当前可见的items
   */
  private setCurrentItems() {
    this._startIndex = this.findStartIndex(0, this._items.length - 1)
    if (this._startIndex === -1) return
    const viewItems = this.generateViewItems(this._startIndex)
    this._endIndex = this._startIndex + viewItems.length - 1
    //判断是否需要生成新的items
    let render = true
    if (this.scrollDirection > 0) {
      if (this.afterBuffer.length > 0) {
        const lastItem = this.afterBuffer[this.afterBuffer.length - 1]
        if (lastItem.y < this._scrollTop + this._viewHeight) {
          render = true
        } else {
          render = false
        }
      }
    } else {
      if (this.beforeBuffer.length > 0) {
        const firstItem = this.beforeBuffer[0]
        if (firstItem.y + firstItem.height > this._scrollTop) {
          render = true
        } else {
          render = false
        }
      }
    }
    if (render) {
      const beforeBufferItems = this.generateBeforeBufferItems(this._startIndex)
      const afterBufferItems = this.generateAfterBufferItems(this._endIndex)
      this.beforeBuffer = beforeBufferItems
      this.afterBuffer = afterBufferItems
      this._currentItems = [...beforeBufferItems, ...viewItems, ...afterBufferItems]
      this._offsetTop = this._currentItems[0].y
    }
  }

  /**
   * 生成前置缓冲items
   * @param startIndex 开始索引
   * @returns
   */
  private generateBeforeBufferItems(startIndex: number): VirtualScrollItem[] {
    if (startIndex > 0) {
      const startBuffer = startIndex - this._buffer
      return this._items.slice(startBuffer < 0 ? 0 : startBuffer, startIndex)
    }
    return []
  }

  /**
   * 生成后置缓冲items
   * @param endIndex 结束索引
   * @returns
   */
  private generateAfterBufferItems(endIndex: number): VirtualScrollItem[] {
    if (endIndex < this._items.length - 1) {
      const bufferStartIndex = endIndex + 1
      const bufferEndIndex = bufferStartIndex + this._buffer
      return this._items.slice(bufferStartIndex, bufferEndIndex)
    }
    return []
  }

  private generateViewItems(startIndex: number): VirtualScrollItem[] {
    const items: VirtualScrollItem[] = []
    for (let i = startIndex; i < this._items.length; i++) {
      const item = this._items[i]
      items.push(item)
      if (item.y + item.height >= this._scrollTop + this._viewHeight) {
        break
      }
    }
    return items
  }

  /**
   *在items里面找到可见区域第一个item，使用二分查找
   * @param items 需要查找的items
   * @param startIndex 查找范围开始索引
   * @param endIndex 查找范围的结束索引
   * @param scrollTop y轴滚动距离
   * @returns 返回一个索引，找不到返回-1
   */
  private findStartIndex(startIndex: number, endIndex: number): number {
    if (startIndex > endIndex) {
      return -1
    }
    const middleIndex = Math.floor((startIndex + endIndex) / 2)
    const middleItem = this._items[middleIndex]
    const viewSum = this._scrollTop + this._viewHeight
    const middleItemSum = middleItem.y + middleItem.height
    if (
      viewSum < middleItem.y ||
      (middleItem.y > this._scrollTop && viewSum >= middleItemSum) ||
      (middleItem.y > this._scrollTop && middleItemSum > viewSum)
    ) {
      return this.findStartIndex(startIndex, middleIndex - 1)
    }
    if (this._scrollTop >= middleItemSum) {
      return this.findStartIndex(middleIndex + 1, endIndex)
    }
    if (middleItem.y <= this._scrollTop && middleItemSum > this.scrollTop) {
      return middleIndex
    }
    return -1
  }
}
