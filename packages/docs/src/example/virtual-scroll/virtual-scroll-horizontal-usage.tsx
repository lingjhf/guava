import { CodeExample } from '../../components/code-example'
import { GVirtualScroll, GVirtualList } from '@lingjhf/guava'

export const VirtualScrollHorizontalUsage = () => {
  const code = `
  `
  const items = Array.from({ length: 10000 }).map((_, index) => ({ key: `${index + 1}`, height: 80 }))
  return (
    <CodeExample code={code} language='jsx'>

      <GVirtualScroll horizontal>
        <div class='h-40px'>
          <GVirtualList items={items}>{
            (key) => {
              return <div class='bg-[var(--bg-brand-light-default)] h-32px w-72px flex items-center justify-center'>{key}</div>
            }
          }</GVirtualList>
        </div>
      </GVirtualScroll>
    </CodeExample>
  )
}
