import { CodeExample } from '../../components/code-example'
import { GPagination } from '@lingjhf/guava'

export default function PaginationMaxPagerLazy() {
  const code = `
  <GPagination total={1000} maxPager={11}></GPagination>
  `

  return (
    <CodeExample code={code} language='jsx'>
      <GPagination total={1000} maxPager={11}></GPagination>
    </CodeExample>
  )
}
