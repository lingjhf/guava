import { GConfigProvider, GVirtualScroll, GVirtualList } from '@lingjhf/guava'
import { For, createSignal } from 'solid-js'

import 'virtual:uno.css'
const App = () => {
  const items = Array.from({ length: 10000 }).map((_, index) => ({ key: `${index + 1}`, height: 40 }))
  console.log(items.length)
  return (
    <div class=' h-screen bg-#1A1A1A w-screen'>
      <GConfigProvider dark>
        <div class=' px-100px'>
          <div class='h-300px'>
            <GVirtualScroll>
              <GVirtualList items={items}>{
                (key) => {
                  return <div class='bg-[var(--bg-brand-light-default)] h-full box-border h-32px  flex items-center justify-center'>{key}</div>
                }
              }</GVirtualList>
            </GVirtualScroll>
          </div>
        </div>
      </GConfigProvider>
    </div>
  )
}

export default App
