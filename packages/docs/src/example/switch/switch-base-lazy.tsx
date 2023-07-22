
import { CodeExample } from '../../components/code-example'
import { GSwitch } from '@lingjhf/guava'

export default function SwitchBaseLazy() {
  const code = `
  <GSwitch />
  `

  return (
    <CodeExample code={code} language='jsx'>
      <GSwitch />
    </CodeExample>
  )
}
