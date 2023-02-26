import { GProgress, GProgressProps } from './Progress'
import { customElement } from 'solid-element'
import uno from 'uno.css?inline'
import style from './styles.css?inline'
import 'uno.css'
import './styles.css'

customElement<Partial<GProgressProps>>(
  'g-progress',
  {},
  (props: Partial<GProgressProps>, { element }) => {
    return (
      <>
        <style>
          {uno} {style}
        </style>
        <GProgress></GProgress>
      </>
    )
  }
)

export { GProgress }
