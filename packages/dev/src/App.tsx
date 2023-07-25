import { GConfigProvider, GForm, GFormItem, FormValidator, yup, GInput, GButton } from '@lingjhf/guava'
import { For, createSignal } from 'solid-js'

import 'virtual:uno.css'
const App = () => {

  function TestValidate() {

    const [form, setForm] = createSignal({
      name: '',
      age: 0
    })

    const validator = new FormValidator({
      schema: yup.object({
        name: yup.string().required({ name: 'name is required' }).max(10, { name: 'max 10' }).email({ name: 'email' }),
        age: yup.number().required({ age: 'age is required' })
      })
    })

    function inputName(value: string) {
      setForm(v => ({ ...v, name: value }))
    }

    function inputAge(value: string) {
      setForm(v => ({ ...v, age: Number(value) }))
    }

    return (
      <GForm form={form()} validator={validator} labelAlign='left' labelPosition='top'>
        <GFormItem label='Name' name='name' required>
          <GInput value={form().name} input={inputName}></GInput>
        </GFormItem>
        <GFormItem label='Age' name='age' required>
          <GInput value={(form().age ?? '').toString()} input={inputAge} ></GInput>
        </GFormItem>
        {/* 清除校验 */}
        <GButton onClick={() => validator.clearValidated()}>clear</GButton>
        {/* 重置 */}
        <GButton onClick={() => { setForm(validator.reset()) }}>reset</GButton>
      </GForm>
    )
  }

  return (
    <div class=' h-screen bg-#1A1A1A w-screen'>
      <GConfigProvider dark>
        <div class=' px-100px'>
          <TestValidate></TestValidate>
        </div>
      </GConfigProvider>
    </div>
  )
}

export default App
