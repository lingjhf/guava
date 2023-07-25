import mitt from 'mitt'
import type { Emitter } from 'mitt'
import * as yup from 'yup'

export type FormValidated = { error?: yup.ValidationError, form?: any }

export interface FormValidatorOptions {
  schema?: yup.Schema
  autoValidate?: boolean
}

export class FormValidator {

  form: any

  schema?: yup.Schema

  autoValidate: boolean

  private _isReset = false

  private _originForm: any

  private _eventBus: Emitter<{ 'validate': FormValidated, clearValidated: undefined }>

  constructor(options: FormValidatorOptions) {
    this.schema = options.schema
    this.autoValidate = options.autoValidate ?? true
    this._eventBus = mitt()
  }

  setForm(value: any, validate = true) {
    if (!this._originForm) {
      this._originForm = structuredClone(this.form)
    }
    this.form = value
    if (!this._isReset && this.autoValidate && validate) {
      this.validate({ abortEarly: false })
    }
    if (this._isReset) {
      this.clearValidated()
    }
    this._isReset = false
    return this
  }

  addVdalidateListener(handler: (value: FormValidated) => void) {
    this._eventBus.on('validate', handler)
  }

  addClearVdalidateListener(handler: () => void) {
    this._eventBus.on('clearValidated', handler)
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

  clearValidated() {
    this._eventBus.emit('clearValidated')
  }

  reset() {
    this._isReset = true
    this.form = structuredClone(this._originForm)
    return this.form
  }
}