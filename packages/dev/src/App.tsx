
import { GConfigProvider, GBreadcrumb, GBreadcrumbItem, GCollapse, GCollapseItem } from '@lingjhf/guava'

import 'virtual:uno.css'
const App = () => {

  return (
    <div class=' h-screen bg-#1A1A1A w-screen'>
      <GConfigProvider dark>
        <div class=' px-100px'>
          <GCollapse accordion >
            <GCollapseItem header={'Title'}>123</GCollapseItem>
            <GCollapseItem header={'Title'}>abc</GCollapseItem>
            <GCollapseItem header={'Title'}>cab</GCollapseItem>
          </GCollapse>
        </div>
      </GConfigProvider>
    </div>
  )
}

export default App
