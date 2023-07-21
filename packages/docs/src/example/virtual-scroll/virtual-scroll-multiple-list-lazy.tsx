import { CodeExample } from '../../components/code-example'
import { GVirtualScroll, GVirtualList } from '@lingjhf/guava'

const VirtualScrollMultipleListLazy = () => {
  const code = `
  `
  const items1 = Array.from({ length: 1000 }).map((_, index) => ({ key: `${index + 1}`, height: 40 }))
  const items2 = Array.from({ length: 5000 }).map((_, index) => ({ key: `${index + 1}`, height: 60 }))
  const items3 = Array.from({ length: 10000 }).map((_, index) => ({ key: `${index + 1}`, height: 100 }))
  return (
    <CodeExample code={code} language='jsx'>
      <div class='h-300px'>
        <GVirtualScroll>
          <GVirtualList items={items1}>
            {
              (key) => {
                return <div class='bg-[var(--bg-brand-light-default)] h-32px flex items-center justify-center mx-20px'>{key}</div>
              }
            }
          </GVirtualList>
          <GVirtualList items={items2}>
            {
              (key) => {
                return <div class='bg-[var(--bg-brand-light-default)] h-52px flex items-center justify-center mx-20px'>{key}</div>
              }
            }
          </GVirtualList>
          <GVirtualList items={items3}>
            {
              (key) => {
                return <div class='bg-[var(--bg-brand-light-default)] h-92px flex items-center justify-center mx-20px'>{key}</div>
              }
            }
          </GVirtualList>
        </GVirtualScroll>
      </div>
    </CodeExample>
  )
}

export default VirtualScrollMultipleListLazy