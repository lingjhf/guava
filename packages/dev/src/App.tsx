
import { GConfigProvider, GDrawer, GButton, GBreadcrumb, GBreadcrumbItem } from '@lingjhf/guava'
import { For, createSignal } from 'solid-js'

import 'virtual:uno.css'
const App = () => {
  const [items, setItems] = createSignal(['Breadcrumb node1', 'Breadcrumb node2', 'Breadcrumb node3', 'Breadcrumb node4'])
  function change() {
    setItems(v => {
      const n = [...v]
      n[2] = 'xxxx'
      return n
    })
  }
  return (
    <div class=' h-screen bg-#1A1A1A w-screen'>
      <GConfigProvider dark>
        <div class=' px-100px'>
          <GButton onClick={change}>change</GButton>
          <GBreadcrumb>
            <For each={items()}>
              {
                (item) => {
                  return (
                    <GBreadcrumbItem>{item}</GBreadcrumbItem>
                  )
                }
              }
            </For>
          </GBreadcrumb>
        </div>
      </GConfigProvider>
    </div>
  )
}

export default App
