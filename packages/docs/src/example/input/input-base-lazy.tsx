import { CodeExample } from '../../components/code-example'
import { GInput } from '@lingjhf/guava'

const code = `
export const Example = () => {
  return (
    <GInput/>
  )
}
`
export default function InputBaseLazy() {
  return (
    <CodeExample code={code} language='jsx'>
      <GInput placeholder='请输入' />
    </CodeExample>
  )
}

