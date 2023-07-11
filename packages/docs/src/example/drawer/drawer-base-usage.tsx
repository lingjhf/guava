import { createSignal } from 'solid-js'
import { CodeExample } from '../../components/code-example'
import { GDrawer, type DrawerPosition, GButton } from '@lingjhf/guava'

const code = `

`
export const DrawerBaseUsage = () => {
  const [visible, setVisible] = createSignal(false)
  const [postiion, setPoisition] = createSignal<DrawerPosition>('left')

  function showDrawer(position: DrawerPosition) {
    setPoisition(position)
    setVisible(true)
  }

  function closeDrawer() {
    setVisible(false)
  }

  return (
    <CodeExample code={code} language='jsx'>
      <GDrawer visible={visible()} position={postiion()} close={closeDrawer}>{postiion()}</GDrawer>
      <div class='flex'>
        <div class='m-2'>
          <GButton onClick={[showDrawer, 'top']}>top</GButton>
        </div>
        <div class='m-2'>
          <GButton onClick={[showDrawer, 'right']}>right</GButton>
        </div>
        <div class='m-2'>
          <GButton onClick={[showDrawer, 'bottom']}>bottom</GButton>
        </div>
        <div class='m-2'>
          <GButton onClick={[showDrawer, 'left']}>left</GButton>
        </div>
      </div>
    </CodeExample>
  )
}

