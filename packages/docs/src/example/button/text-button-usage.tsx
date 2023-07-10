import { CodeExample } from '../../components/code-example'
import { GButton } from '@lingjhf/guava'

const code = `
export const Example = () => {
  return (
    <div>
      <GButton variant='text'>Button</GButton>
      <GButton type='success' variant='text'>Button</GButton>
      <GButton type='warn' variant='text'>Button</GButton>
      <GButton type='danger' variant='text'>Button</GButton>
    </div>
  )
}
`
export const TextButtonUsage = () => {
  return (
    <CodeExample code={code} language='jsx'>
      <div class='m-2'>
        <GButton variant='text'>Button</GButton>
      </div>
      <div class='m-2'>
        <GButton type='success' variant='text'>Button</GButton>
      </div>
      <div class='m-2'>
        <GButton type='warn' variant='text'>Button</GButton>
      </div>
      <div class='m-2'>
        <GButton type='danger' variant='text'>Button</GButton>
      </div>
    </CodeExample>
  )
}

