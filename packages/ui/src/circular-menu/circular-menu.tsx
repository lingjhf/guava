import type { JSX } from 'solid-js'
import { createEffect, createSignal, mergeProps, Index } from 'solid-js'
import { customElement } from 'solid-element'
import { CircularMenu, CircularMenuController, CircularMenuPath } from './controller'
import { getTreeDeep } from '../utils'
import styles from './styles.css?inline'

export interface GCircularMenuProps {
  menus: CircularMenu[]
  x: number
  y: number
  radius: number
  menuWidth: number
  trigger: 'hover' | 'click' | 'visible'
  renderItem?: (key: string) => JSX.Element
  change?: (key: string) => void
}

customElement(
  'g-circular-menu',
  {
    menus: undefined,
    x: undefined,
    y: undefined,
    radius: undefined,
    menuWidth: undefined,
    renderItem: undefined,
    change: undefined,
  },
  (props) => {
    return (
      <>
        <style>{styles}</style>
        <GCircularMenu
          menus={props.menus}
          x={props.x}
          y={props.y}
          radius={props.radius}
          menuWidth={props.menuWidth}
          renderItem={props.renderItem}
          change={props.change}
        ></GCircularMenu>
      </>
    )
  }
)

const GCircularMenu = (props: Partial<GCircularMenuProps>) => {
  const controller = new CircularMenuController()
  const defaultProps = mergeProps<[GCircularMenuProps, ...Partial<GCircularMenuProps>[]]>(
    { menus: [], x: 0, y: 0, radius: 20, menuWidth: 30, trigger: 'hover' },
    props
  )

  const [x, setX] = createSignal(defaultProps.x)
  const [y, setY] = createSignal(defaultProps.y)
  const [size, setSize] = createSignal(0)
  const [menuPaths, setMenuPaths] = createSignal<CircularMenuPath[]>([])

  createEffect(() => {
    const s = defaultProps.radius * 2 + getTreeDeep(defaultProps.menus) * defaultProps.menuWidth * 2
    setSize(s)
    controller
      .setX(s / 2)
      .setY(s / 2)
      .setMenus(defaultProps.menus)
      .setRadius(defaultProps.radius)
      .setMenuWidth(defaultProps.menuWidth)
    setX(defaultProps.x)
    setY(defaultProps.y)
    setMenuPaths(controller.menuPaths)
  })

  const menuContainerstyles = () =>
    `left:${x()}px;top:${y()}px;width:${size()}px;height:${size()}px;`

  function onEnterMenu(menu: CircularMenuPath) {
    if (menu.children && menu.children.length > 0) {
      setMenuPaths((v) => [...v, ...menu.children])
    }
  }

  function onClickMenu(menu: CircularMenuPath) {
    defaultProps.change?.(menu.key)
  }

  return (
    <div class='circular-menu' style={menuContainerstyles()}>
      <Index each={menuPaths()}>
        {(item) => {
          return (
            <div
              class='menu'
              style={`left:${item().origin.x}px;top:${item().origin.y}px`}
              onMouseEnter={[onEnterMenu, item()]}
              onClick={[onClickMenu, item()]}
            >
              {defaultProps.renderItem?.(item().key)}
            </div>
          )
        }}
      </Index>
      <svg width='100%' height='100%'>
        <Index each={menuPaths()}>
          {(item) => {
            return (
              <g>
                <path d={item().path} fill='skyblue'></path>
              </g>
            )
          }}
        </Index>
      </svg>
    </div>
  )
}

declare module 'solid-js' {
  namespace JSX {
    interface IntrinsicElements {
      'g-circular-menu': Partial<GCircularMenuProps>
    }
  }
}
