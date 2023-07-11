
import { GConfigProvider, GDrawer, GButton } from '@lingjhf/guava'
import { createSignal } from 'solid-js'

import 'virtual:uno.css'
const App = () => {
  const [visible, setVisible] = createSignal(true)

  function show() {
    setVisible(true)
  }
  function close() {
    setVisible(false)
  }
  return (
    <div class=' h-screen bg-#1A1A1A w-screen'>
      <GConfigProvider dark>
        <div class=' px-100px'>
          <div class=' w-300px h-300px '>
            <GButton onClick={show}>show</GButton>
            <GDrawer visible={visible()} close={close} position='right' header={'Title'} footer={'footer'}>
            </GDrawer>
          </div>
        </div>
      </GConfigProvider>
    </div>
  )
}

export default App
