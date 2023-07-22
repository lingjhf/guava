import { CodeExample } from '../../components/code-example'
import { GButton } from '@lingjhf/guava'

const code = `
export const Example = () => {
  return (
    <div>
      <GButton>Button</GButton>
      <GButton type='success'>Button</GButton>
      <GButton type='warn'>Button</GButton>
      <GButton type='danger'>Button</GButton>
    </div>
  )
}
`
const ButtonBaseLazy = () => {
  return (
    <CodeExample code={code} language='jsx'>
      <div class='flex'>
        <div class='m-2'>
          <GButton>Button</GButton>
        </div>
        <div class='m-2'>
          <GButton type='success'>Button</GButton>
        </div>
        <div class='m-2'>
          <GButton type='warn'>Button</GButton>
        </div>
        <div class='m-2'>
          <GButton type='danger'>Button</GButton>
        </div>
      </div>
    </CodeExample>
  )
}

export default ButtonBaseLazy
