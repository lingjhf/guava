import { CodeExample } from '../../components/code-example'
import { GTimePicker } from '@lingjhf/guava'

export default function TimePickerBaseLazy() {
  const code = `
  <GTimePicker></GTimePicker>
  `

  return (
    <CodeExample code={code} language='jsx'>
      <GTimePicker></GTimePicker>
    </CodeExample>
  )
}
