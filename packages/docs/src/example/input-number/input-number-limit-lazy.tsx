import { CodeExample } from '../../components/code-example'
import { GInputNumber } from '@lingjhf/guava'

const code = `
export const Example = () => {
  return (
    <GInputNumber min={0} max={10} />
  )
}
`
export default function InputNumberLimitLazy() {
  return (
    <CodeExample code={code} language='jsx'>
      <GInputNumber min={0} max={10} />
    </CodeExample>
  )
}

