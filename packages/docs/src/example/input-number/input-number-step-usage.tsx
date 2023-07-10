import { CodeExample } from '../../components/code-example'
import { GInputNumber } from '@lingjhf/guava'

const code = `
export const Example = () => {
  return (
    <GInputNumber step={10} />
  )
}
`
export const InputNumberStepUsage = () => {
  return (
    <CodeExample code={code} language='jsx'>
      <GInputNumber step={10} />
    </CodeExample>
  )
}

