import mitt from 'mitt'
import type { Emitter } from 'mitt'
import * as yup from 'yup'

export type FormValidated = { error?: yup.ValidationError, form?: any }

export interface FormValidatorOptions {
  schema?: Record<string, yup.Schema>
  autoValidate?: boolean
}

export class FormValidator {

  form: any

  schema?: Record<string, yup.Schema>

  autoValidate: boolean

  private _isReset = false

  private _originForm: any

  private _eventBus: Emitter<{ validate: FormValidated, validateField: [string, FormValidated], clearValidated: undefined }>

  constructor(options: FormValidatorOptions) {
    this.schema = options.schema
    this.autoValidate = options.autoValidate ?? true
    this._eventBus = mitt()
  }

  private _getModifyField(source: Record<string, any>, target: Record<string, any>) {
    const fields: string[] = []
    for (const key in target) {
      if (target[key] !== source[key]) {
        fields.push(key)
      }
    }
    return fields
  }

  setForm(value: any, validate = true) {
    if (!this._originForm) {
      this._originForm = structuredClone(this.form)
    }
    const validateFields = this._getModifyField(this.form ?? {}, value ?? {})
    this.form = value
    if (!this._isReset && validateFields.length > 0 && this.autoValidate && validate) {
      validateFields.forEach(field => {
        this.validateField(field)
      })

    }
    if (this._isReset) {
      this.clearValidated()
    }
    this._isReset = false
    return this
  }

  addValidateListener(handler: (value: FormValidated) => void) {
    this._eventBus.on('validate', handler)
  }

  addValidateFieldListener(handler: (name: string, value: FormValidated) => void) {
    this._eventBus.on('validateField', (event) => handler(event[0], event[1]))
  }

  addClearVdalidateListener(handler: () => void) {
    this._eventBus.on('clearValidated', handler)
  }

  async validateField(name: string, options?: yup.ValidateOptions): Promise<FormValidated> {
    const validated: FormValidated = {}
    try {
      validated.form = await this.schema?.[name]?.validate(this.form[name], options)
    } catch (err) {
      validated.error = err as yup.ValidationError
    }
    this._eventBus.emit('validateField', [name, validated])
    return validated
  }

  async validate(options?: yup.ValidateOptions): Promise<FormValidated> {
    const validated: FormValidated = {}
    try {
      validated.form = await yup.object(this.schema).validate(this.form, options)
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