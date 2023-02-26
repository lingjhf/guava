import { GColorSelector, GColorSelectorProps } from './ColorSelector'
import { GAlphaSelector, GAlphaSelectorProps } from './AlphaSelector'
import { GHueSelector, GHueSelectorProps } from './HueSelector'
import { GColorPicker, GColorPickerProps } from './ColorPicker'
import { customElement } from 'solid-element'
import Color from 'color'
import uno from 'uno.css?inline'
import style from './styles.css?inline'
import 'uno.css'
import './styles.css'

customElement<Partial<GColorPickerProps>>(
  'g-color-picker',
  {
    color: '#fff',
  },
  (props: Partial<GColorPickerProps>, { element }) => {
    const onChange = (data: Color) => {
      element.dispatchEvent(new CustomEvent('onChange', { detail: data }))
    }
    return (
      <>
        <style>
          {uno} {style}
        </style>
        <GColorPicker color={props.color} onChange={onChange}></GColorPicker>
      </>
    )
  }
)

customElement<Partial<GColorSelectorProps>>(
  'g-color-selector',
  { color: Color() },
  (props: Partial<GColorSelectorProps>, { element }) => {
    const onChange = (data: Color) => {
      element.dispatchEvent(new CustomEvent('onChange', { detail: data }))
    }
    return (
      <>
        <style>
          {uno} {style}
        </style>
        <GColorSelector color={props.color} onChange={onChange}></GColorSelector>
      </>
    )
  }
)

customElement<Partial<GHueSelectorProps>>(
  'g-hue-selector',
  { color: Color() },
  (props: Partial<GHueSelectorProps>, { element }) => {
    const onChange = (data: Color) => {
      element.dispatchEvent(new CustomEvent('onChange', { detail: data }))
    }
    return (
      <>
        <style>
          {uno} {style}
        </style>
        <GHueSelector color={props.color} onChange={onChange}></GHueSelector>
      </>
    )
  }
)

customElement<Partial<GAlphaSelectorProps>>(
  'g-alpha-selector',
  { color: Color() },
  (props: Partial<GAlphaSelectorProps>, { element }) => {
    const onChange = (data: Color) => {
      element.dispatchEvent(new CustomEvent('onChange', { detail: data }))
    }
    return (
      <>
        <style>
          {uno} {style}
        </style>
        <GAlphaSelector color={props.color} onChange={onChange}></GAlphaSelector>
      </>
    )
  }
)

export { GColorPicker, GColorSelector, GHueSelector, GAlphaSelector }
