import { For } from 'solid-js'
import { GScrollbar, GList, GListItem } from '@lingjhf/guava'

export interface NavigationBarItem {
  title: string,
  items?: NavigationBarItem[]
}

interface NavigationBarProps {
  items: NavigationBarItem[]
}

export const NavigationBar = (props: NavigationBarProps) => {

  return (
    <GScrollbar class='h-full'>
      <GList nav>
        <For each={props.items}>
          {
            (item) => {
              return (
                <GListItem>{item.title}</GListItem>
              )
            }
          }
        </For>
      </GList>
    </GScrollbar>
  )
}