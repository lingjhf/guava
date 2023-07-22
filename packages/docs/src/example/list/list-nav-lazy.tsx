import { CodeExample } from '../../components/code-example'
import { GList, GListItem } from '@lingjhf/guava'

const code = `
export const Example = () => {
  return (
    <GInputNumber step={10} />
  )
}
`
export default function ListNavLazy() {
  return (
    <CodeExample code={code} language='jsx'>
      <GList value={0} nav>
        <GListItem>Item one</GListItem>
        <GListItem>Item two</GListItem>
        <GListItem>Item three</GListItem>
      </GList>
    </CodeExample>
  )
}

