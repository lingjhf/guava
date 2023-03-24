import { Position } from '../utils/types'

export interface CircularMenu {
  key: string
  precentage: number
  children?: CircularMenu[]
}

export interface CircularMenuPath {
  key: string
  path: string
  origin: Position
  children: CircularMenuPath[]
}

export interface CircularMenuOptions {
  menus?: CircularMenu[]
  x?: number
  y?: number
  radius?: number
  menuWidth?: number
}

export class CircularMenuController {
  private _menus: CircularMenu[]
  private _x: number
  private _y: number
  private _radius: number
  private _menuWidth: number

  constructor({ menus = [], x = 0, y = 0, radius = 20, menuWidth = 30 }: CircularMenuOptions = {}) {
    this._menus = menus
    this._x = x
    this._y = y
    this._radius = radius
    this._menuWidth = menuWidth
  }

  /**
   * 设置x轴
   * @param value
   * @returns
   */
  setX(value: number): CircularMenuController {
    this._x = value
    return this
  }

  /**
   * 设置y轴
   * @param value
   * @returns
   */
  setY(value: number): CircularMenuController {
    this._y = value
    return this
  }

  /**
   * 设置半径
   * @param value
   * @returns
   */
  setRadius(value: number): CircularMenuController {
    this._radius = value
    return this
  }

  /**
   * 设置菜单宽度
   * @param value
   * @returns
   */
  setMenuWidth(value: number): CircularMenuController {
    this._menuWidth = value
    return this
  }

  /**
   * 设置菜单列表
   * @param value
   * @returns
   */
  setMenus(value: CircularMenu[]): CircularMenuController {
    this._menus = value
    return this
  }

  /**
   * 返回菜单路径列表
   */
  get menuPaths(): CircularMenuPath[] {
    return this.generateMenuPaths(this._menus, this._radius)
  }

  /**
   * 递归生成菜单路径
   * @param menus 菜单列表
   * @param parentRadius 父菜单半径
   * @param parentAngle 父菜单角度
   * @returns 菜单路径列表
   */
  private generateMenuPaths(
    menus: CircularMenu[],
    parentRadius: number,
    parentAngle = 0
  ): CircularMenuPath[] {
    const paths: CircularMenuPath[] = []
    const insideRadius = parentRadius
    const outsideRadius = insideRadius + this._menuWidth
    let totalAngle = 0
    let startAngle = parentAngle
    let p1 = this.generatePointPosition(insideRadius, parentAngle)
    let p2 = this.generatePointPosition(outsideRadius, parentAngle)
    for (const menu of menus) {
      if (totalAngle === 360) break
      const menuAngle = this.getAngleByPrecentage(menu.precentage)
      totalAngle = menuAngle + totalAngle > 360 ? 360 : totalAngle + menuAngle
      parentAngle += menuAngle
      const p3 = this.generatePointPosition(outsideRadius, parentAngle)
      const p4 = this.generatePointPosition(insideRadius, parentAngle)
      const path = this.generatePath(p1, p2, p3, p4, insideRadius, outsideRadius)
      const menuPath: CircularMenuPath = {
        key: menu.key,
        path,
        origin: this.generatePointPosition(
          insideRadius + this._menuWidth / 2,
          parentAngle - menuAngle / 2
        ),
        children: [],
      }
      p1 = p4
      p2 = p3
      if (menu.children && menu.children.length > 0) {
        menuPath.children = this.generateMenuPaths(menu.children, outsideRadius, startAngle)
      }
      startAngle = parentAngle
      paths.push(menuPath)
    }
    return paths
  }

  /**
   * 根据百分比计算角度
   * @param precentage 百分比
   * @returns 返回一个角度
   */
  private getAngleByPrecentage(precentage: number): number {
    const angel = (precentage / 100) * 360
    return angel
  }

  /**
   * 根据4个点的位置，内环半径和外环半径生成路径
   * @param p1
   * @param p2
   * @param p3
   * @param p4
   * @param insideRadius
   * @param outsideRadius
   */
  private generatePath(
    p1: Position,
    p2: Position,
    p3: Position,
    p4: Position,
    insideRadius: number,
    outsideRadius: number
  ) {
    return `M ${p1.x} ${p1.y} L ${p2.x} ${p2.y}  A ${outsideRadius} ${outsideRadius} 0 0 1 ${p3.x} ${p3.y} L ${p4.x} ${p4.y} A ${insideRadius} ${insideRadius} 0 0 0 ${p1.x} ${p1.y} z`
  }

  /**
   * 根据半径和角度计算坐标位置
   * @param r 半径
   * @param angle 角度
   */
  private generatePointPosition(r: number, angle: number) {
    const rad = (angle / 180) * Math.PI
    return {
      x: this._x + Math.sin(rad) * r,
      y: this._y - Math.cos(rad) * r,
    }
  }
}
