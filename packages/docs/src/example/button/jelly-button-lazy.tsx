import { CodeExample } from '../../components/code-example'
import { GButton } from '@lingjhf/guava'

const code = `
export const Example = () => {
  return (
    <div>
      <GButton variant='jelly'>Button</GButton>
      <GButton type='success' variant='jelly'>Button</GButton>
      <GButton type='warn' variant='jelly'>Button</GButton>
      <GButton type='danger' variant='jelly'>Button</GButton>
    </div>
  )
}
`
const JellyButtonLazy = () => {
  return (
    <CodeExample code={code} language='jsx'>
      <div class='flex'>
        <div class='m-2'>
          <GButton variant='jelly'>Button</GButton>
        </div>
        <div class='m-2'>
          <GButton type='success' variant='jelly'>Button</GButton>
        </div>
        <div class='m-2'>
          <GButton type='warn' variant='jelly'>Button</GButton>
        </div>
        <div class='m-2'>
          <GButton type='danger' variant='jelly'>Button</GButton>
        </div>
      </div>
    </CodeExample>
  )
}

export default JellyButtonLazy
