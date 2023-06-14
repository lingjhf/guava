import type { Component } from 'solid-js'
import { GConfigProvider, GInput, GPagination } from '@lingjhf/guava'
import 'virtual:uno.css'

const App: Component = () => {
  function ok(v: string) {
    console.log(v)
  }
  return (
    <div class=' h-screen bg-#1A1A1A w-screen'>
      <GConfigProvider dark>
        <div class='p-2 w-300px'>
          <GPagination total={30} maxPager={11}></GPagination>
        </div>
      </GConfigProvider>
    </div>
  )
}

export default App
