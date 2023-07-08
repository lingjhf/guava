import { For } from 'solid-js'
import { CodeExample } from '../../components/code-example'
import { GScrollbar } from '@lingjhf/guava'

export const ScrollbarBaseUsage = () => {
  const code = `
<div class=' w-300px h-300px'>
  <GScrollbar>
    <For each={Array.from({ length: 20 })}>
      {
        (_, index) => <div class=' bg-blue-400 m-8px h-50px flex items-center justify-center'>{index()}</div>
      }
    </For>
  </GScrollbar>
</div>
  `

  return (
    <CodeExample code={code} language='jsx'>
      <div class=' w-300px h-300px'>
        <GScrollbar>
          <For each={Array.from({ length: 20 })}>
            {
              (_, index) => <div class=' bg-blue-400 m-8px h-50px flex items-center justify-center'>{index()}</div>
            }
          </For>
        </GScrollbar>
      </div>
    </CodeExample>
  )
}
