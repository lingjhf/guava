import { CodeExample } from '../../components/code-example'
import { GInput } from '@lingjhf/guava'

const code = `
export const Example = () => {
  return (
    <div>
      <GInput size='large' />
      <GInput />
      <GInput size='small' />
    </div>
  )
}
`
export default function InputSizeLazy() {
  return (
    <CodeExample code={code} language='jsx'>
      <div class='my-2'>
        <GInput size='large' placeholder='large' />
      </div>
      <div class='my-2'>
        <GInput placeholder='default' />
      </div>
      <div class='my-2'>
        <GInput size='small' placeholder='small' />
      </div>
    </CodeExample>
  )
}

