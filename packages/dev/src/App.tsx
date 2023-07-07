
import { GConfigProvider, GTabs, GTab } from '@lingjhf/guava'

import 'virtual:uno.css'
const App = () => {

  return (
    <div class=' h-screen bg-#1A1A1A w-screen'>
      <GConfigProvider dark>
        <div class=' px-100px'>
          <GTabs size='large'>
            <GTab >One</GTab>
            <GTab>Tow</GTab>
            <GTab>Three</GTab>
            <GTab>Four</GTab>
            <GTab>Five</GTab>
          </GTabs>
        </div>
      </GConfigProvider>
    </div>
  )
}

export default App
