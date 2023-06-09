import type { Component } from 'solid-js'
import { GConfigProvider, GBreadcrumb, GBreadcrumbItem, GAlert } from '@lingjhf/guava'
import 'virtual:uno.css'

const App: Component = () => {

  return (
    <div class=' w-screen h-screen bg-black'>
      <GConfigProvider dark>
        <GAlert ></GAlert>
      </GConfigProvider>
    </div>
  )
}

export default App
