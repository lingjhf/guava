import { CodeExample } from '../../components/code-example'
import { GAlert } from '@lingjhf/guava'

const code = `
export const Example = () => {
  return (
    <div>
      <GAlert title='info alert' />
      <GAlert type='success' title='success alert' />
      <GAlert type='warn' title='warn alert' />
      <GAlert type='danger' title='danger alert' />
    </div>
  )
}
`
const AlertBaseLazy = () => {
  return (
    <CodeExample code={code} language='jsx'>
      <div class='my-2'>
        <GAlert title='info alert' />
      </div>
      <div class='my-2'>
        <GAlert type='success' title='success alert' />
      </div>
      <div class='my-2'>
        <GAlert type='warn' title='warn alert' />
      </div>
      <div class='my-2'>
        <GAlert type='danger' title='danger alert' />
      </div>
    </CodeExample>
  )
}

export default AlertBaseLazy
