
import { GConfigProvider, GTabs, GTab, GScrollbar } from '@lingjhf/guava'

import 'virtual:uno.css'
const App = () => {

  return (
    <div class=' h-screen bg-#1A1A1A w-screen'>
      <GConfigProvider dark>
        <div class=' px-100px'>
          <div class=' w-300px h-300px '>
            <GScrollbar>
              <div class=' w-3000px h-3000px'></div>
            </GScrollbar>
          </div>
        </div>
      </GConfigProvider>
    </div>
  )
}

export default App
