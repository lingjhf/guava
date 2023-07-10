import { CodeExample } from '../../components/code-example'
import { GCheckbox } from '@lingjhf/guava'

const code = `
export const Example = () => {
  return (
    <GCheckbox/>
  )
}
`
export const CheckboxSizeUsage = () => {
  return (
    <CodeExample code={code} language='jsx'>
      <div class='flex'>
        <div class='mr-2'>
          <GCheckbox size={40} />
        </div>
        <div class='mr-2'>
          <GCheckbox size={32} />
        </div>
        <div class='mr-2'>
          <GCheckbox size={28} />
        </div>
      </div>
    </CodeExample>
  )
}

