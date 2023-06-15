import type { Component } from 'solid-js'
import { GConfigProvider, GSwitch } from '@lingjhf/guava'
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
        <div class='p-2 w-300px'>
          <GSwitch size='large' loading={ok}></GSwitch>
        </div>
      </GConfigProvider>
    </div>
  )
}

export default App
