export interface VirtualScrollItem {
  index: number
  y: number
  height: number
}

export interface VirtualScrollOptions {
  viewHeight?: number
  scrollTop?: number
  defaultItems?: number[]
}

export class VirtualScrollController {
  private _viewHeight: number
  private _items: VirtualScrollItem[] = []
  private _totalHeight = 0
  private _offsetTop = 0
  private _scrollTop = 0
  private _currentItems: VirtualScrollItem[] = []

  constructor({ viewHeight = 0, scrollTop = 0, defaultItems = [] }: VirtualScrollOptions = {}) {
    this._viewHeight = viewHeight
    this._scrollTop = scrollTop
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
   * 初始化默认items
   * @param items 一个高度数组，每一项代表一个高度
   * @returns 返回当前实例
   */
  initDefaultItems(items: number[]) {
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
    this._scrollTop = value
    return this
  }

  /**
   * 设置当前可见的items
   */
  private setCurrentItems() {
    if (this._items.length === 0) {
      this._currentItems = []
      return
    }
    const startIndex = this.findStartIndex(this._items, 0, this._items.length, this._scrollTop)
    if (startIndex > -1) {
      const startItem = this._items[startIndex]
      this._offsetTop = startItem.y
      const tempCurrentItems: VirtualScrollItem[] = []
      for (let i = startIndex; i < this._items.length; i++) {
        const item = this._items[i]
        tempCurrentItems.push(item)
        if (item.y + item.height > this._scrollTop + this._viewHeight) {
          break
        }
      }
      this._currentItems = tempCurrentItems
    }
  }

  /**
   *在items里面找到可见区域第一个item，使用二分查找
   * @param items 需要查找的items
   * @param startIndex 查找范围开始索引
   * @param endIndex 查找范围的结束索引
   * @param scrollTop y轴滚动距离
   * @returns 返回一个索引，找不到返回-1
   */
  private findStartIndex(
    items: VirtualScrollItem[],
    startIndex: number,
    endIndex: number,
    scrollTop: number
  ): number {
    if (startIndex > endIndex) {
      return -1
    }
    const middleIndex = Math.floor((startIndex + endIndex) / 2)
    const middleItem = items[middleIndex]
    const viewSum = scrollTop + this._viewHeight
    const middleItemSum = middleItem.y + middleItem.height
    if (
      viewSum < middleItem.y ||
      (middleItem.y > scrollTop && viewSum >= middleItemSum) ||
      (middleItem.y > scrollTop && middleItemSum > viewSum)
    ) {
      return this.findStartIndex(items, startIndex, middleIndex - 1, scrollTop)
    }
    if (scrollTop >= middleItemSum) {
      return this.findStartIndex(items, middleIndex + 1, endIndex, scrollTop)
    }
    if (middleItem.y <= scrollTop && middleItemSum > scrollTop) {
      return middleIndex
    }
    return -1
  }
}
