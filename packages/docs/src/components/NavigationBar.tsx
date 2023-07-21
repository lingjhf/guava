import { For, Show } from 'solid-js'
import { GScrollbar, GList, GListGroup, GListItem, GDrawer } from '@lingjhf/guava'
import { store, setStore } from '../store/store'

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

  let ltMd = false
  if (window.innerWidth < 768) {
    if (!ltMd) {
      setStore('drawer', true)
    }
    ltMd = true
  }
  function watchResize() {
    if (window.innerWidth < 768) {
      if (!ltMd) {
        setStore('drawer', true)
      }
      ltMd = true
    } else {
      if (ltMd) {
        setStore('drawer', false)
      }
      ltMd = false
    }
  }
  window.addEventListener('resize', watchResize)

  function drawerClose() {
    setStore('visible', false)
  }

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

  function drawerNavigation() {
    return (
      <GDrawer style='--drawer-content-padding:0px' showHeader={false} visible={store.visible} size='300px' close={drawerClose}>
        <div class='h-full bg-[var(--bg-common-highest)]'>{navigation()}</div>
      </GDrawer>
    )
  }

  return (
    <Show when={store.drawer} fallback={<div class='w-300px h-full bg-[var(--bg-common-highest)]'>{navigation()}</div>}>
      {drawerNavigation()}
    </Show>

  )
}