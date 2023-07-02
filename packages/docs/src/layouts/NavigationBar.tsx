import { For } from 'solid-js'
import { GScrollbar, GList, GListItem } from '@lingjhf/guava'

export interface NavigationBarItem {
  title: string
  url: string
}

interface NavigationBarProps {
  value: string
  items: NavigationBarItem[]
}

export const NavigationBar = (props: NavigationBarProps) => {

  return (
    <GScrollbar class='h-full'>
      <GList value={props.value} nav>
        <For each={props.items}>
          {
            (item) => {
              return (
                <a class='decoration-none' href={item.url ?? ''}>
                  <GListItem value={item.url}>
                    {item.title}
                  </GListItem>
                </a>
              )
            }
          }
        </For>
      </GList>
    </GScrollbar>
  )
}