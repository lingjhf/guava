import type { Component } from 'solid-js'
import { GConfigProvider, GBreadcrumb, GBreadcrumbItem, GAlert } from '@lingjhf/guava'
import 'virtual:uno.css'

const App: Component = () => {

  return (
    <div class=' h-screen bg-#1A1A1A w-screen'>
      <GConfigProvider dark>
        <GAlert ></GAlert>
      </GConfigProvider>
    </div>
  )
}

export default App
