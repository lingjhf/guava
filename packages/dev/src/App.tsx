import type { Component } from 'solid-js'
import { GConfigProvider, GBreadcrumb, GBreadcrumbItem, GAlert } from '@lingjhf/guava'
import 'virtual:uno.css'

const App: Component = () => {

  return (
    <div class=' h-screen bg-#1A1A1A w-screen'>
      <GConfigProvider dark>
        <GAlert type='info' title={'title abcdef'}></GAlert>
        <GAlert type='success' title={'title abcdef'}></GAlert>
        <GAlert type='warn' title={'title abcdef'}>The contents of alert</GAlert>
        <GAlert type='danger' title={'title abcdef'}>The contents of alert</GAlert>
      </GConfigProvider>
    </div>
  )
}

export default App
