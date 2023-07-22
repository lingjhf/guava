import { CodeExample } from '../../components/code-example'
import { GDraggable } from '@lingjhf/guava'

const code = `

`

const DraggableBaseLazy = () => {
  return (
    <CodeExample code={code} language='jsx'>
      <div class=' relative w-300px h-300px'>
        <GDraggable>
          <div class='w-100px h-100px bg-[var(--bg-brand-light-default)]'></div>
        </GDraggable>
      </div>
    </CodeExample>
  )
}

export default DraggableBaseLazy

