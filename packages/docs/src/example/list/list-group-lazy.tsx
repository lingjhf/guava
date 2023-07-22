import { CodeExample } from '../../components/code-example'
import { GList, GListItem, GListGroup } from '@lingjhf/guava'

const code = `
export const Example = () => {
  return (
    <GList>
      <GListItem>Item one</GListItem>
      <GListGroup header={'Group 1'}>
        <GListItem>Item 1-1</GListItem>
        <GListItem>Item 1-2</GListItem>
        <GListItem>Item 1-3</GListItem>
        <GListGroup header={'Group 1-1'}>
          <GListItem>Item 1-1-1</GListItem>
          <GListItem>Item 1-1-2</GListItem>
          <GListItem>Item 1-1-3</GListItem>
        </GListGroup>
      </GListGroup>
      <GListItem>Item two</GListItem>
      <GListItem>Item three</GListItem>
    </GList>
  )
}
`
export default function ListGroupLazy() {
  return (
    <CodeExample code={code} language='jsx'>
      <GList value={0}>
        <GListItem>Item one</GListItem>
        <GListGroup header={'Group 1'}>
          <GListItem>Item 1-1</GListItem>
          <GListItem>Item 1-2</GListItem>
          <GListItem>Item 1-3</GListItem>
          <GListGroup header={'Group 1-1'}>
            <GListItem>Item 1-1-1</GListItem>
            <GListItem>Item 1-1-2</GListItem>
            <GListItem>Item 1-1-3</GListItem>
          </GListGroup>
        </GListGroup>
        <GListItem>Item two</GListItem>
        <GListItem>Item three</GListItem>
      </GList>
    </CodeExample>
  )
}

