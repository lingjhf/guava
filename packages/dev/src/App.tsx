import { GConfigProvider, GVirtualScroll, GVirtualList, GColoPicker, GColorSlider, GColorAlphaSlider, GColorHueSlider } from '@lingjhf/guava'
import { For, createSignal } from 'solid-js'

import 'virtual:uno.css'
const App = () => {
  const items = Array.from({ length: 10000 }).map((_, index) => ({ key: `${index + 1}`, height: 40 }))
  return (
    <div class=' h-screen bg-#1A1A1A w-screen'>
      <GConfigProvider dark>
        <div class=' px-100px'>
          <GColoPicker></GColoPicker>
          <GColorSlider></GColorSlider>
          <GColorAlphaSlider></GColorAlphaSlider>
          <GColorHueSlider></GColorHueSlider>
        </div>
      </GConfigProvider>
    </div>
  )
}

export default App
