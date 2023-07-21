import { CodeExample } from '../../components/code-example'
import { GVirtualScroll, GVirtualList } from '@lingjhf/guava'
import { Suspense, lazy, type Component } from 'solid-js'

const VirtualScrollBaseUsageLazy = () => {
  const code = `
  `
  const items = Array.from({ length: 10000 }).map((_, index) => ({ key: `${index + 1}`, height: 40 }))
  return (
    <CodeExample code={code} language='jsx'>
      <Suspense fallback={'asdfasdf'}>
        <div class='h-300px'>
          <GVirtualScroll>
            <GVirtualList items={items}>{
              (key) => {
                return <div class='bg-[var(--bg-brand-light-default)] h-32px flex items-center justify-center'>{key}</div>
              }
            }</GVirtualList>
          </GVirtualScroll>
        </div>
      </Suspense>
    </CodeExample>
  )
}

export default VirtualScrollBaseUsageLazy