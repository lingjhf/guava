import { For } from 'solid-js'
import { CodeExample } from '../../components/code-example'
import { GScrollbar } from '@lingjhf/guava'

export const ScrollbarHorizontalUsage = () => {
  const code = `
<div class=' w-500px'>
  <GScrollbar>
    <div class='flex'>
      <For each={Array.from({ length: 20 })}>
        {
          (_, index) => <div class='bg-[var(--bg-brand-light-default)] m-8px h-50px w-80px flex items-center justify-center flex-shrink-0'>{index()}</div>
        }
      </For>
    </div>
  </GScrollbar>
</div>
  `

  return (
    <CodeExample code={code} language='jsx'>
      <div class=' w-500px'>
        <GScrollbar>
          <div class='flex'>
            <For each={Array.from({ length: 20 })}>
              {
                (_, index) => <div class='bg-[var(--bg-brand-light-default)] m-8px h-50px w-80px flex items-center justify-center flex-shrink-0'>{index()}</div>
              }
            </For>
          </div>
        </GScrollbar>
      </div>
    </CodeExample>
  )
}
