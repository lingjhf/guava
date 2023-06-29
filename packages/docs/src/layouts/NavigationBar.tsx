import {For} from 'solid-js'
import { GScrollbar, GList, GListItem, GListSubheader } from '@lingjhf/guava'

interface NavigationBarItem {
  title: '',
  items: [{ title: '' }]
}

interface NavigationBarProps {
  items: NavigationBarItem[]
}

export const NavigationBar = (props: NavigationBarProps) => {

  return (
    <GScrollbar>
      <GList>
<For each={}></For>
      </GList>
    </GScrollbar>
  )
}