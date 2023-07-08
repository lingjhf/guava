import { For } from 'solid-js'
import { CodeExample } from '../../components/code-example'
import { GPagination } from '@lingjhf/guava'

export const PaginationBaseUsage = () => {
  const code = `
<GPagination total={100}></GPagination>
  `

  return (
    <CodeExample code={code} language='jsx'>
      <GPagination total={100}></GPagination>
    </CodeExample>
  )
}
