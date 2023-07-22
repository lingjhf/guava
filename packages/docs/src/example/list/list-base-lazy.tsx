import { CodeExample } from '../../components/code-example'
import { GList, GListItem } from '@lingjhf/guava'

const code = `
export const Example = () => {
  return (
    <GList value={0}>
      <GListItem>Item one</GListItem>
      <GListItem>Item two</GListItem>
      <GListItem>Item three</GListItem>
    </GList>
  )
}
`
export default function ListBaseLazy() {
  return (
    <CodeExample code={code} language='jsx'>
      <GList value={0}>
        <GListItem>Item one</GListItem>
        <GListItem>Item two</GListItem>
        <GListItem>Item three</GListItem>
      </GList>
    </CodeExample>
  )
}

