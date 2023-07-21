import { GButton } from '@lingjhf/guava'
import { CollapseFilled } from './collapse-filled'
import { CollapseOpenFilled } from './collapse-open-filled'
import { store, setStore } from '../store/store'
import { Show } from 'solid-js'

export const ExpandNavigationBar = () => {
  function expand() {
    setStore('visible', (value) => {
      return !value
    })
  }

  const Icon = () => {
    return store.visible ? <CollapseOpenFilled class=' text-22px' /> : <CollapseFilled class=' text-22px' />
  }

  return (
    <Show when={store.drawer}>
      <GButton onClick={expand} variant='text'>{Icon()}</GButton>
    </Show>
  )
}