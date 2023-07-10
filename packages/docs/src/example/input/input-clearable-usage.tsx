import { CodeExample } from '../../components/code-example'
import { GInput } from '@lingjhf/guava'

const code = `
export const Example = () => {
  return (
    <GInput clearable />
  )
}
`
export const InputClearableUsage = () => {
  return (
    <CodeExample code={code} language='jsx'>
      <GInput clearable placeholder='clearable' />
    </CodeExample>
  )
}

