import type { Component } from 'solid-js'
import { GConfigProvider, GBreadcrumb, GBreadcrumbItem } from '@lingjhf/guava'
import 'virtual:uno.css'

const App: Component = () => {

  return (
    <div class=' w-screen h-screen bg-black'>
      <GConfigProvider dark>
        <GBreadcrumb>
          <GBreadcrumbItem>a</GBreadcrumbItem>
          <GBreadcrumbItem>b</GBreadcrumbItem>
          <GBreadcrumbItem>c</GBreadcrumbItem>
        </GBreadcrumb>
      </GConfigProvider>
    </div>
  )
}

export default App
