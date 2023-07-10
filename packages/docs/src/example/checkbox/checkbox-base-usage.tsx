import { CodeExample } from '../../components/code-example'
import { GCheckbox } from '@lingjhf/guava'

const code = `
export const Example = () => {
  return (
    <GCheckbox/>
  )
}
`
export const CheckboxBaseUsage = () => {
  return (
    <CodeExample code={code} language='jsx'>
      <GCheckbox />
    </CodeExample>
  )
}

