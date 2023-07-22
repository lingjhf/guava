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
const AlertCenterLazy = () => {
  return (
    <CodeExample code={code} language='jsx'>
      <div class='my-2'>
        <GAlert title='info alert' center />
      </div>
    </CodeExample>
  )
}

export default AlertCenterLazy