import { createSignal } from 'solid-js'
import { CodeExample } from '../../components/code-example'
import { GForm, GFormItem, GInput } from '@lingjhf/guava'

const code = `

`
export default function FormBaseLazy() {

  const [form, setForm] = createSignal({
    name: '',
    email: '',
  })

  function inputName(value: string) {
    setForm(v => ({ ...v, name: value }))
  }

  function inputEmail(value: string) {
    setForm(v => ({ ...v, email: value }))
  }

  return (
    <CodeExample code={code} language='jsx'>
      <GForm >
        <GFormItem label='Name' name='name' >
          <GInput value={form().name} input={inputName}></GInput>
        </GFormItem>
        <GFormItem label='Email' name='email' >
          <GInput value={form().email} input={inputEmail} ></GInput>
        </GFormItem>
      </GForm>
    </CodeExample>
  )
}

