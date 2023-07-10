import { CodeExample } from '../../components/code-example'
import { GAlert } from '@lingjhf/guava'

const code = `
export const Example = () => {
  return (
    <div>
      <GAlert title='info alert'>
        more description
      </GAlert>
      <GAlert type='success' title='success alert'>
        more description
      </GAlert>
      <GAlert type='warn' title='warn alert'>
        more description
      </GAlert>
      <GAlert type='danger' title='danger alert'>
        more description
      </GAlert>
    </div>
  )
}
`
export const AlertDescriptionUsage = () => {
  return (
    <CodeExample code={code} language='jsx'>
      <div class='my-2'>
        <GAlert title='info alert'>
          more description
        </GAlert>
      </div>
      <div class='my-2'>
        <GAlert type='success' title='success alert'>
          more description
        </GAlert>
      </div>
      <div class='my-2'>
        <GAlert type='warn' title='warn alert'>
          more description
        </GAlert>
      </div>
      <div class='my-2'>
        <GAlert type='danger' title='danger alert'>
          more description
        </GAlert>
      </div>
    </CodeExample>
  )
}

