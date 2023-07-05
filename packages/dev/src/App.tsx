import { createSignal, type Component, For } from 'solid-js'
import { GConfigProvider, GTextButton, GCopy, GHightlight, GAlert, GSwitch, GScrollbar, GCascaderPanel, GCard, GTimePickerPanel, GInput, GInputNumber, GRate, GButton, GList, GListItem, GListSubheader } from '@lingjhf/guava'
import 'virtual:uno.css'
const App: Component = () => {
  async function ok() {
    await new Promise((resolve) => {
      setTimeout(() => {
        console.log('ok')
        resolve(0)
      }, 3000)
    })
  }
  function cascaderChange(value: string[]) {
    console.log(value)
  }
  function test(v: string, e: MouseEvent) {
    console.log('test', v, e)
  }


  const [items, setItems] = createSignal([1, 2, 3, 4, 5])

  function change() {
    setItems([1, 3, 5])
  }
  const code = `
from xx import xxx

def main():
  a = '123'
            `

  return (
    <div class=' h-screen bg-#1A1A1A w-screen'>
      <GConfigProvider dark>
        <div class=' px-100px'>
          <GCard></GCard>

          <GButton >Button</GButton>
          <GButton variant='text' >Button</GButton>
          <GButton variant='text' icon ></GButton>
          <GHightlight code={code} language='python' />
          {/* <GCopy></GCopy> */}
          {/* <GList nav>
            <GListSubheader>Title</GListSubheader>
            <For each={items()}>
              {
                (item) => {
                  return <GListItem>{item}</GListItem>
                }
              }
            </For>
          </GList> */}
        </div>
      </GConfigProvider>
    </div>
  )
}

export default App
