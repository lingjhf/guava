import { createSignal, type Component, For } from 'solid-js'
import { GConfigProvider, GCopy, GHightlight, GAlert, GSwitch, GScrollbar, GCascaderPanel, GCard, GTimePickerPanel, GInput, GInputNumber, GRate, GButton, GList, GListGroup, GListItem, GListSubheader } from '@lingjhf/guava'

import 'virtual:uno.css'
const App: Component = () => {

  return (
    <div class=' h-screen bg-#1A1A1A w-screen'>
      <GConfigProvider dark>
        <div class=' px-100px'>
          <GList >
            <GListGroup header={'1'}>
              <GListGroup header={'1-1'}>
                <GListItem>1-1-1</GListItem>
                <GListItem>1-1-2</GListItem>
                <GListItem>1-1-3</GListItem>
              </GListGroup>
            </GListGroup>
            <GListGroup header={'2'}>
              <GListGroup header={'2-1'}>
                <GListItem>2-1-1</GListItem>
              </GListGroup>
            </GListGroup>

          </GList>
        </div>
      </GConfigProvider>
    </div>
  )
}

export default App
