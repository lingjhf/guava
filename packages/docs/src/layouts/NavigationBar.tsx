import { For } from 'solid-js'
import { GScrollbar, GList, GListItem } from '@lingjhf/guava'

export interface NavigationBarItem {
  title: string
  url?: string
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
                <a class='decoration-none' href={item.url ?? ''}>
                  <GListItem>
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