import type { Component } from 'solid-js'
import { lightTheme, darktheme } from '@lingjhf/guava-theme'
import { customElement } from 'solid-element'

customElement(
  'g-test',
  (props) => {
    return (
      <div style='background-color:var(--bg-success-default);height:100px'></div>
    )
  }
)

const App: Component = () => {
  const styleVars = {

  }
  return (

    < div >
      <g-test></g-test>
    </div >
  )
}

export default App
