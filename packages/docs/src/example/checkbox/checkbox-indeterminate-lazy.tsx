import { CodeExample } from '../../components/code-example'
import { GCheckbox } from '@lingjhf/guava'

const code = `
export const Example = () => {
  return (
    <GCheckbox/>
  )
}
`
const CheckboxIndeterminateLazy = () => {
  return (
    <CodeExample code={code} language='jsx'>
      <GCheckbox indeterminate />
    </CodeExample>
  )
}

export default CheckboxIndeterminateLazy
