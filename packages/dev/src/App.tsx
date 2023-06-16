import type { Component } from 'solid-js'
import { GConfigProvider, GSwitch, GScrollbar } from '@lingjhf/guava'
import 'virtual:uno.css'

const App: Component = () => {
  async function ok() {
    await new Promise((resolve) => {
      setTimeout(() => {
        console.log('ok')
        resolve(0)
      }, 3000)
    })
  }
  return (
    <div class=' h-screen bg-#1A1A1A w-screen'>
      <GConfigProvider dark>
        <div class='w-500px h-500px'>
          <GScrollbar type='visible'>
            <div class='w-2000px h-2000px'></div>
          </GScrollbar>
        </div>
      </GConfigProvider>
    </div>
  )
}

export default App
