import { GConfigProvider, GForm, GFormItem, FormValidator, yup, GInput } from '@lingjhf/guava'
import { For, createSignal } from 'solid-js'

import 'virtual:uno.css'
const App = () => {

  function TestValidate() {

    const form = {
      name: 'xxxx@gmail.com'
    }

    const validator = new FormValidator({
      form: form,
      schema: yup.object({
        name: yup.string().required({ name: 'name is required' }).max(10, { name: 'max 10' }).email({ name: 'email' }),
        age: yup.number().required({ age: 'age is required' })
      })
    })

    async function test() {
      const valided = await validator.validate({ abortEarly: false })
      console.log(valided.error?.errors)
    }
    test()
    return (
      <GForm validator={validator} >
        <GFormItem name='name'>
          <GInput></GInput>
        </GFormItem>
        <GFormItem name='age'>
          <GInput></GInput>
        </GFormItem>
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
