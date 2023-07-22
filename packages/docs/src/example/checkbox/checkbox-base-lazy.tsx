import { CodeExample } from '../../components/code-example'
import { GCheckbox } from '@lingjhf/guava'

const code = `
export const Example = () => {
  return (
    <GCheckbox/>
  )
}
`
const CheckboxBaseUsage = () => {
  return (
    <CodeExample code={code} language='jsx'>
      <GCheckbox />
    </CodeExample>
  )
}

export default CheckboxBaseUsage