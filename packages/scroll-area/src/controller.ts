import { calcSliderWidth, scrollXToSliderX, sliderXToScrollX } from './utils'
import { Position, Size } from '@guava/utils'

interface Options {
  viewSize: Size
  contentSize: Size
  scrollPosition?: Position
}

interface HorizontalSlider {
  x: number
  width: number
  minWidth: number
}

interface VerticalSlider {
  y: number
  height: number
  minHeight: number
}

export class ScrollController {
  //可见区域大小
  private viewSize: Size

  //内容大小
  private contentSize: Size

  //垂直滑块
  private verticalSlider: VerticalSlider

  //水平滑块
  private horizontalSlider: HorizontalSlider

  //实际滚动位置
  private scrollPosition: Position

  constructor(options: Options) {
    this.viewSize = options.viewSize
    this.contentSize = options.contentSize
    this.scrollPosition = options.scrollPosition ?? { x: 0, y: 0 }
    this.verticalSlider = { y: 0, height: 0, minHeight: 40 }
    this.horizontalSlider = { x: 0, width: 0, minWidth: 40 }
    this.verticalSlider.height = this.getVerticalSliderHeight()
    this.horizontalSlider.width = this.getHorizontalSliderWidth()
    if (this.scrollPosition.y) {
      this.setVerticalSliderYWithScrollY(this.scrollPosition.y)
    }
    if (this.scrollPosition.x) {
      this.setHorizontalSliderXWithScrollX(this.scrollPosition.x)
    }
  }

  get horizontalSliderX() {
    return this.horizontalSlider.x
  }

  get horizontalSliderWidth() {
    return this.horizontalSlider.width
  }

  get verticalSliderY() {
    return this.verticalSlider.y
  }

  get verticalSliderHeight() {
    return this.verticalSlider.height
  }

  get scrollX(): number {
    return this.scrollPosition.x
  }

  get scrollY(): number {
    return this.scrollPosition.y
  }

  /**设置可见区域大小
   *
   * @param size 接受一个可见区域大小参数
   * @returns 返回当前对象
   */
  setViewSize(size: Partial<Size>): ScrollController {
    if (size.width && size.width !== this.viewSize.width) {
      this.viewSize.width = size.width
      this.horizontalSlider.width = this.getHorizontalSliderWidth()
      this.setHorizontalSliderXWithScrollX(this.scrollPosition.x)
    }
    if (size.height && size.height !== this.viewSize.height) {
      this.viewSize.height = size.height
      this.verticalSlider.height = this.getVerticalSliderHeight()
      this.setVerticalSliderYWithScrollY(this.scrollPosition.y)
    }
    return this
  }

  /**设置内容大小
   *
   * @param size 接受一个内容大小参数
   * @returns 返回当前对象
   */
  setContentSize(size: Partial<Size>): ScrollController {
    if (size.width && size.width !== this.contentSize.width) {
      this.contentSize.width = size.width
      this.horizontalSlider.width = this.getHorizontalSliderWidth()
      this.setHorizontalSliderXWithScrollX(this.scrollPosition.x)
    }
    if (size.height && size.height !== this.contentSize.height) {
      this.contentSize.height = size.height
      this.verticalSlider.height = this.getVerticalSliderHeight()
      this.setVerticalSliderYWithScrollY(this.scrollPosition.y)
    }
    return this
  }

  /**设置水平和垂直滑块位置
   *
   * @param position 接受一个位置信息，x为水平滑块在x轴的位置，y为垂直滑块在y轴的位置
   * @returns 返回当前对象
   */
  setSlider(position: Partial<Position>): ScrollController {
    if (position.x && position.x !== this.horizontalSlider.x) {
      this.horizontalSlider.x = this.getValidHorizontalSliderX(position.x)
      this.scrollPosition.x = sliderXToScrollX(
        this.horizontalSlider.x,
        this.horizontalSlider.width,
        this.viewSize.width,
        this.contentSize.width
      )
    }
    if (position.y && position.y !== this.verticalSlider.y) {
      this.verticalSlider.y = this.getValidVerticalSliderY(position.y)
      this.scrollPosition.y = sliderXToScrollX(
        this.verticalSlider.y,
        this.verticalSlider.height,
        this.viewSize.height,
        this.contentSize.height
      )
    }
    return this
  }

  /**设置实际滚动位置
   *
   * @param position 接受一个位置信息，x为实际水平滚动位置，y为实际垂直滚动位置
   * @returns 返回当前对象
   */
  setScroll(position: Partial<Position>): ScrollController {
    if (position.x && position.x !== this.scrollPosition.x) {
      this.setHorizontalSliderXWithScrollX(position.x)
    }
    if (position.y && position.y !== this.scrollPosition.y) {
      this.setVerticalSliderYWithScrollY(position.y)
    }
    return this
  }

  /**设置垂直滑块x轴位置和实际x轴滚动位置
   *
   * @param scrollX 接受一个x轴滚动位置
   */
  private setHorizontalSliderXWithScrollX(scrollX: number) {
    this.horizontalSlider.x = this.getHorizontalSliderX(scrollX)
    const tempScrollX = sliderXToScrollX(
      this.horizontalSlider.x,
      this.horizontalSlider.width,
      this.viewSize.width,
      this.contentSize.width
    )
    this.scrollPosition.x = tempScrollX !== scrollX ? tempScrollX : scrollX
  }

  /**设置垂直滑块y轴位置和实际y轴滚动位置
   *
   * @param scrollY 接受一个y轴滚动位置
   */
  private setVerticalSliderYWithScrollY(scrollY: number) {
    this.verticalSlider.y = this.getVerticalSliderY(scrollY)
    const tempScrollY = sliderXToScrollX(
      this.verticalSlider.y,
      this.verticalSlider.height,
      this.viewSize.height,
      this.contentSize.height
    )
    this.scrollPosition.y = tempScrollY !== scrollY ? tempScrollY : scrollY
  }

  /**获取水平滑块的宽度
   *
   * @returns 返回一个宽度
   */
  private getHorizontalSliderWidth() {
    return this.getValidHorizontalSliderWidth(
      calcSliderWidth(this.viewSize.width, this.contentSize.width)
    )
  }

  /**获取垂直滑块的高度
   *
   * @returns 返回一个高度
   */
  private getVerticalSliderHeight() {
    return this.getValidVerticalSliderHeight(
      calcSliderWidth(this.viewSize.height, this.contentSize.height)
    )
  }

  /**获取滑块在x轴的有效位置
   *
   * @param scrollX 接受一个x轴滚动位置
   * @returns 返回一个x轴有效位置
   */
  private getHorizontalSliderX(scrollX: number): number {
    return this.getValidHorizontalSliderX(
      scrollXToSliderX(
        scrollX,
        this.horizontalSlider.width,
        this.viewSize.width,
        this.contentSize.width
      )
    )
  }

  /**获取滑块在y轴的有效位置
   *
   * @param scrollY 接受一个y轴滚动位置
   * @returns 返回一个y轴有效位置
   */
  private getVerticalSliderY(scrollY: number): number {
    return this.getValidVerticalSliderY(
      scrollXToSliderX(
        scrollY,
        this.verticalSlider.height,
        this.viewSize.height,
        this.contentSize.height
      )
    )
  }

  /**获取滑块在x轴的有效位置
   *
   * @param x 接受一个未校验的x轴位置
   * @returns 返回一个有效的x轴位置
   */
  private getValidHorizontalSliderX(x: number): number {
    if (x < 0) {
      x = 0
    } else if (x + this.horizontalSlider.width > this.viewSize.width) {
      x = this.viewSize.width - this.horizontalSlider.width
    }
    return x
  }

  /**获取滑块在y轴的有效位置
   *
   * @param y 接受一个未校验的y轴位置
   * @returns 返回一个有效的y轴位置
   */
  private getValidVerticalSliderY(y: number): number {
    if (y < 0) {
      y = 0
    } else if (y + this.verticalSlider.height > this.viewSize.height) {
      y = this.viewSize.height - this.verticalSlider.height
    }
    return y
  }

  /**获取水平滑块的有效宽度
   *
   * @param width 接受一个未校验的宽度
   * @returns 返回一个有效的宽度
   */
  private getValidHorizontalSliderWidth(width: number): number {
    if (this.viewSize.width >= this.contentSize.width) return 0
    if (width < this.horizontalSlider.minWidth) {
      width = this.horizontalSlider.minWidth
    }
    return width
  }

  /**获取垂直滑块的有效高度
   *
   * @param height 接受一个未校验的高度
   * @returns 返回一个有效的高度
   */
  private getValidVerticalSliderHeight(height: number): number {
    if (this.viewSize.height >= this.contentSize.height) return 0
    if (height < this.verticalSlider.minHeight) {
      height = this.verticalSlider.minHeight
    }
    return height
  }
}
