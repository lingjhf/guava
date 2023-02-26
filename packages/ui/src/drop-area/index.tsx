import { GDropArea, GDropAreaProps } from './DropArea'
import { GMultiDropArea, GMultiDropAreaProps } from './MultiDropArea'
import { customElement } from 'solid-element'
import uno from 'uno.css?inline'
import style from './styles.css?inline'
import 'uno.css'
import './styles.css'

customElement<Partial<GDropAreaProps>>(
  'g-drop-area',
  {},
  (props: Partial<GDropAreaProps>, { element }) => {
    return (
      <>
        <style>
          {uno} {style}
        </style>
        <GDropArea></GDropArea>
      </>
    )
  }
)

customElement<Partial<GMultiDropAreaProps>>(
  'g-multi-drop-area',
  {},
  (props: Partial<GMultiDropAreaProps>, { element }) => {
    return (
      <>
        <style>
          {uno} {style}
        </style>
        <GMultiDropArea></GMultiDropArea>
      </>
    )
  }
)

export { GDropArea, GMultiDropArea }
