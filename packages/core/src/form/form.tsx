import { createContext, useContext, type Setter } from 'solid-js'
import type { GuavaParentProps } from '../types'
import { generateSplitEventHandlersProps } from '../utils'
import { FormValidator, type FormValidated } from './validator'

export interface FormProviderValue {
  addItem: (name: string, setMessage: Setter<string>) => void
}

const FormContext = createContext<FormProviderValue>()

export const useFormContext = () => useContext(FormContext)

export interface FormProps extends GuavaParentProps<HTMLDivElement> {
  validator?: FormValidator
}

export const Form = (propsRaw: Partial<FormProps>) => {

  const [eventHandlers, props] = generateSplitEventHandlersProps(propsRaw, {

  })

  props.validator?.addVdalidateListener(validate)
  const itemsMap = new Map<string, Setter<string>>()

  function validate(valided: FormValidated) {
    if (valided.error) {
      for (const error of valided.error.errors) {
        if (typeof error === 'object') {
          for (const key in error as object) {
            itemsMap.get(key)?.(error[key])
          }
        }
      }
    }
  }

  function addItem(name: string, setMessage: Setter<string>) {
    itemsMap.set(name, setMessage)
  }

  const providerValue: FormProviderValue = {
    addItem
  }
  return (
    <FormContext.Provider value={providerValue}>
      {propsRaw.children}
    </FormContext.Provider>
  )
}