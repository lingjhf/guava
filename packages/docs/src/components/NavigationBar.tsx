import { For, Show, createSignal } from 'solid-js'
import { GScrollbar, GList, GListGroup, GListItem, GDrawer } from '@lingjhf/guava'

export interface NavigationBarItem {
  title: string
  url: string
  children?: NavigationBarItem[]
}

interface NavigationBarProps {
  value: string
  items: NavigationBarItem[]
}

export const NavigationBar = (props: NavigationBarProps) => {

  const [visibleDrawer, setVisibleDrawer] = createSignal(false)
  let ltMd = false
  function watchResize() {
    if (window.innerWidth < 768) {
      if (!ltMd) {
        setVisibleDrawer(true)
      }
      ltMd = true
    } else {
      if (ltMd) {
        setVisibleDrawer(false)
      }
      ltMd = false
    }
  }
  window.addEventListener('resize', watchResize)

  function generateNavigation(items: NavigationBarItem[]) {
    return (
      <For each={items}>
        {
          (item) => {
            if (item.children && item.children.length > 0) {
              return (
                <GListGroup header={item.title}>
                  {generateNavigation(item.children)}
                </GListGroup>
              )
            }
            return (
              <GListItem link={item.url} value={item.url}>
                {item.title}
              </GListItem>
            )
          }
        }
      </For>
    )
  }

  function navigation() {
    return (
      <GScrollbar class='h-full'>
        <GList value={props.value} nav>
          {generateNavigation(props.items)}
        </GList>
      </GScrollbar>
    )
  }

  return (
    <Show when={visibleDrawer()} fallback={navigation()}>
      <GDrawer>
        {navigation()}
      </GDrawer>
    </Show>

  )
}