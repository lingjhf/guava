import { createSignal } from 'solid-js'
import { CodeExample } from '../../components/code-example'
import { GForm, GFormItem, GInput, GButton, FormValidator, yup } from '@lingjhf/guava'

const code = `

`
export default function FormValidateLazy() {

  const [form, setForm] = createSignal({
    name: '',
    email: '',
  })

  const validator = new FormValidator({
    schema: {
      name: yup.string().required({ name: 'name is required' }).max(10, { name: 'max 10' }),
      email: yup.string().required({ email: 'email is required' }).email({ email: 'email' })
    }
  })

  function inputName(value: string) {
    setForm(v => ({ ...v, name: value }))
  }

  function inputEmail(value: string) {
    setForm(v => ({ ...v, email: value }))
  }

  return (
    <CodeExample code={code} language='jsx'>
      <div class='w-300px'>
        <GForm form={form()} validator={validator} >
          <GFormItem label='Name' name='name' required>
            <GInput value={form().name} input={inputName}></GInput>
          </GFormItem>
          <GFormItem label='Email' name='email' required>
            <GInput value={form().email} input={inputEmail} ></GInput>
          </GFormItem>
        </GForm>

        <div class='flex justify-end'>
          <GButton class='mr-2' type='primary' onClick={() => validator.clearValidated()}>clear</GButton>

          <GButton onClick={() => { setForm(validator.reset()) }}>reset</GButton>
        </div>
      </div>

    </CodeExample>
  )
}

