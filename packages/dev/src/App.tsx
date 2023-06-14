import type { Component } from 'solid-js'
import { GConfigProvider, GInput, GPagination } from '@lingjhf/guava'
import 'virtual:uno.css'

const App: Component = () => {
  function ok(v: string) {
    console.log(v)
  }
  return (
    <div class=' h-screen bg-#1A1A1A w-screen'>
      <GConfigProvider dark>
        <div class='p-2 w-300px'>
          <GPagination total={10} prev={<span>prev</span>} next={<span>next</span>}
            quickNext={<span>qn</span>}
            quickPrev={<span>qp</span>}

          ></GPagination>
        </div>
      </GConfigProvider>
    </div>
  )
}

export default App
