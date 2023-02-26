import { GDraggable, GDraggableProps } from './Draggable'
import { customElement } from 'solid-element'
import uno from 'uno.css?inline'
import 'uno.css'
import { Position } from '../utils'

customElement<Partial<GDraggableProps>>(
  'g-draggable',
  {
    x: 0,
    y: 0,
  },
  (props: Partial<GDraggableProps>, { element }) => {
    const onChange = (data: Position) => {
      element.dispatchEvent(new CustomEvent('onChange', { detail: data }))
    }
    return (
      <>
        <style>{uno}</style>
        <GDraggable x={props.x} y={props.y} onChange={onChange}></GDraggable>
      </>
    )
  }
)

export { GDraggable }
