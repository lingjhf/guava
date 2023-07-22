import { CodeExample } from '../../components/code-example'
import { GPagination } from '@lingjhf/guava'

export default function PaginationBaseLazy() {
  const code = `
  <GPagination total={100}></GPagination>
  `

  return (
    <CodeExample code={code} language='jsx'>
      <GPagination total={100}></GPagination>
    </CodeExample>
  )
}
