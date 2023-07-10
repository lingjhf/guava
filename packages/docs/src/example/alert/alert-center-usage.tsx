import { CodeExample } from '../../components/code-example'
import { GAlert } from '@lingjhf/guava'

const code = `
export const Example = () => {
  return (
    <div>
      <GAlert title='info alert' center />
    </div>
  )
}
`
export const AlertCenterUsage = () => {
  return (
    <CodeExample code={code} language='jsx'>
      <div class='my-2'>
        <GAlert title='info alert' center />
      </div>
    </CodeExample>
  )
}

