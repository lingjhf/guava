import { For } from 'solid-js'
import { GScrollbar, GList, GListGroup, GListItem } from '@lingjhf/guava'

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
              <GListItem link value={item.url}>
                {item.title}
              </GListItem>
            )
          }
        }
      </For>
    )
  }

  return (
    <GScrollbar class='h-full'>
      <GList value={props.value} nav>
        {generateNavigation(props.items)}
      </GList>
    </GScrollbar>
  )
}