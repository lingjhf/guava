import { CodeExample } from '../../components/code-example'
import { GCheckbox } from '@lingjhf/guava'

const code = `
export const Example = () => {
  return (
    <div>
      <GCheckbox/>
      <GCheckbox checked disabled />
    </div>
  )
}
`
const CheckboxDisabledLazy = () => {
  return (
    <CodeExample code={code} language='jsx'>
      <div class='flex'>
        <div class='mr-2'>
          <GCheckbox disabled />
        </div>
        <div class='mr-2'>
          <GCheckbox checked disabled />
        </div>
      </div>
    </CodeExample>
  )
}

export default CheckboxDisabledLazy