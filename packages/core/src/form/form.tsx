import { ComponentPropsWithChildren } from '../types'
import * as yup from 'yup'

export interface FormProps extends ComponentPropsWithChildren<HTMLDivElement> {
  label: string
}

export const Form = (propsRaw: Partial<FormProps>) => {

  return (
    <div></div>
  )
}