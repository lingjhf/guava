import type { Component } from 'solid-js'
import { GConfigProvider, GBreadcrumb, GBreadcrumbItem, GAlert, GButton } from '@lingjhf/guava'
import 'virtual:uno.css'

const App: Component = () => {

  return (
    <div class=' h-screen bg-#1A1A1A w-screen'>
      <GConfigProvider dark>
        <div class='p-2'>

          <GButton size='small'>Button</GButton>
          <div class='h-2'></div>
          <GButton size='medium' type='primary'>Button</GButton>
          <div class='h-2'></div>
          <GButton type='success' disabled>Button</GButton>
          <div class='h-2'></div>
          <GButton size='large' type='warn'>Button</GButton>
          <div class='h-2'></div>
          <GButton type='danger' rounded>Button</GButton>
          <div class='h-2'></div>
          <GButton type='info'>Button</GButton>
        </div>
      </GConfigProvider>
    </div>
  )
}

export default App
