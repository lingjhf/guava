import { CodeExample } from '../../components/code-example'
import { GButton } from '@lingjhf/guava'

const code = `
export const Example = () => {
  return (
    <div>
      <GButton disabled>Button</GButton>
      <GButton type='success' disabled>Button</GButton>
      <GButton type='warn' disabled>Button</GButton>
      <GButton type='danger' disabled>Button</GButton>
    </div>
  )
}
`
const ButtonDisabledLazy = () => {
  return (
    <CodeExample code={code} language='jsx'>
      <div class='flex'>
        <div class='m-2'>
          <GButton disabled>Button</GButton>
        </div>
        <div class='m-2'>
          <GButton type='success' disabled>Button</GButton>
        </div>
        <div class='m-2'>
          <GButton type='warn' disabled>Button</GButton>
        </div>
        <div class='m-2'>
          <GButton type='danger' disabled>Button</GButton>
        </div>
      </div>
    </CodeExample>
  )
}

export default ButtonDisabledLazy