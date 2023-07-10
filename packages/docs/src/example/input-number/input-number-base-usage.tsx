import { CodeExample } from '../../components/code-example'
import { GInputNumber } from '@lingjhf/guava'

const code = `
export const Example = () => {
  return (
    <GInputNumber/>
  )
}
`
export const InputNumberBaseUsage = () => {
  return (
    <CodeExample code={code} language='jsx'>
      <GInputNumber placeholder='请输入' />
    </CodeExample>
  )
}

