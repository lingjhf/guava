import { CodeExample } from '../../components/code-example'
import { GPagination } from '@lingjhf/guava'

export default function PaginationPrevNextLazy() {
  const code = `
  <GPagination total={100} prev next />
  `

  return (
    <CodeExample code={code} language='jsx'>
      <GPagination total={100} prev next />
    </CodeExample>
  )
}
