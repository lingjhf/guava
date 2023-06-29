import { For } from 'solid-js'
import { GScrollbar, GList, GListItem, GListSubheader } from '@lingjhf/guava'

export interface NavigationBarItem {
  title: string,
  items: NavigationBarItem[]
}

interface NavigationBarProps {
  items: NavigationBarItem[]
}

export const NavigationBar = (props: NavigationBarProps) => {

  return (
    <GScrollbar>
      <GList>
        <For each={props.items}>
          {
            (item) => {
              return (
                <>
                  <GListSubheader>{item.title}</GListSubheader>
                  <For each={item.items}>
                    {
                      (item) => {
                        return (
                          <GListItem>{item.title}</GListItem>
                        )
                      }
                    }
                  </For>
                </>
              )
            }
          }
        </For>
      </GList>
    </GScrollbar>
  )
}