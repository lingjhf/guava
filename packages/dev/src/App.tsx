import type { Component } from 'solid-js'
import { GConfigProvider, GBreadcrumb, GBreadcrumbItem, GAlert, GButton } from '@lingjhf/guava'
import 'virtual:uno.css'

const App: Component = () => {
  function ok() {
    console.log('ok')
  }
  return (
    <div class=' h-screen bg-#1A1A1A w-screen'>
      <GConfigProvider dark>
        <div class='p-2'>

          <GButton size='small' jelly onClick={ok}>Button</GButton>
          <div class='h-2'></div>
          <GButton size='medium' type='primary' jelly>Button</GButton>
          <div class='h-2'></div>
          <GButton type='success' jelly >Button</GButton>
          <div class='h-2'></div>
          <GButton size='large' type='warn' jelly>Button</GButton>
          <div class='h-2'></div>
          <GButton type='danger' rounded jelly onClick={ok}>Button</GButton>

        </div>
      </GConfigProvider>
    </div>
  )
}

export default App
