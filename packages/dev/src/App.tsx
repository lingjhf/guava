import type { Component } from 'solid-js'
import { GConfigProvider, GBreadcrumb, GBreadcrumbItem, GAlert, GButton, GTextButton, GCheckbox } from '@lingjhf/guava'
import 'virtual:uno.css'

const App: Component = () => {
  function ok() {
    console.log('ok')
  }
  return (
    <div class=' h-screen bg-#1A1A1A w-screen'>
      <GConfigProvider dark>
        <div class='p-2'>
          <GCheckbox size={48}></GCheckbox>
        </div>
      </GConfigProvider>
    </div>
  )
}

export default App
