import mitt from 'mitt'
import type { Emitter } from 'mitt'
import * as yup from 'yup'

export type FormValidated = { error?: yup.ValidationError, form?: any }

export interface FormValidatorOptions {
  form: any
  schema?: yup.Schema
}

export class FormValidator {

  form: any

  schema?: yup.Schema

  private _eventBus: Emitter<{ 'validate': FormValidated }>

  constructor(options: FormValidatorOptions) {
    this.form = options.form
    this.schema = options.schema
    this._eventBus = mitt()
  }

  addVdalidateListener(handler: (value: FormValidated) => void) {
    this._eventBus.on('validate', handler)
  }

  async validate(options?: yup.ValidateOptions): Promise<FormValidated> {
    const validated: FormValidated = {}
    try {
      validated.form = await this.schema?.validate(this.form, options)
    } catch (err) {
      validated.error = err as yup.ValidationError
    }
    this._eventBus.emit('validate', validated)
    return validated
  }
}