import { createSignal } from 'solid-js'
import { CodeExample } from '../../components/code-example'
import { GDrawer, GButton } from '@lingjhf/guava'

const code = `

`
export default function DrawerFooterLazy() {
  const [visible, setVisible] = createSignal(false)

  function showDrawer() {
    setVisible(true)
  }

  function closeDrawer() {
    setVisible(false)
  }

  return (
    <CodeExample code={code} language='jsx'>
      <GDrawer visible={visible()} close={closeDrawer} footer={'Footer'}></GDrawer>
      <GButton onClick={showDrawer}>footer</GButton>
    </CodeExample>
  )
}

