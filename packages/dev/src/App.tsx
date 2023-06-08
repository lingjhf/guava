import type { Component } from 'solid-js'
import { GConfigProvider, GDialog } from '@lingjhf/guava'
import 'virtual:uno.css'

const App: Component = () => {

  return (
    <div class=' h-screen bg-#1A1A1A w-screen'>
      <GConfigProvider dark>
        <GDialog visible></GDialog>
      </GConfigProvider>
    </div>
  )
}

export default App
