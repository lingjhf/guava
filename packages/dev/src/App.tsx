import type { Component } from 'solid-js'
import { GConfigProvider, GInput } from '@lingjhf/guava'
import 'virtual:uno.css'

const App: Component = () => {
  function ok(v: string) {
    console.log(v)
  }
  return (
    <div class=' h-screen bg-#1A1A1A w-screen'>
      <GConfigProvider dark>
        <div class='p-2 w-300px'>
          <GInput placeholder='Enter' input={ok}></GInput>
        </div>
        <div class='p-2 w-300px'>
          <GInput size='small' placeholder='Enter'></GInput>
        </div>
        <div class='p-2 w-300px'>
          <GInput size='large' placeholder='Enter' clearable></GInput>
        </div>
      </GConfigProvider>
    </div>
  )
}

export default App
