import { CodeExample } from '../../components/code-example'
import { GTimePickerPanel } from '@lingjhf/guava'

export const TimePickerPanelUsage = () => {
  const code = `
  <GTimePickerPanel></GTimePickerPanel>
  `

  return (
    <CodeExample code={code} language='jsx'>
      <GTimePickerPanel />
    </CodeExample>
  )
}
