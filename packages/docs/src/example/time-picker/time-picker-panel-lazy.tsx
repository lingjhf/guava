import { CodeExample } from '../../components/code-example'
import { GTimePickerPanel } from '@lingjhf/guava'

export default function TimePickerPanelLazy() {
  const code = `
  <GTimePickerPanel></GTimePickerPanel>
  `

  return (
    <CodeExample code={code} language='jsx'>
      <GTimePickerPanel />
    </CodeExample>
  )
}
