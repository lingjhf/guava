import { CodeExample } from '../../components/code-example'
import { GList, GListItem, GListSubheader } from '@lingjhf/guava'

const code = `
export const Example = () => {
  return (
    <GList value={0}>
      <GListSubheader>Header one</GListSubheader>
      <GListItem>Item one</GListItem>
      <GListItem>Item two</GListItem>
      <GListItem>Item three</GListItem>
      <GListSubheader>Header two</GListSubheader>
      <GListItem>Item 1</GListItem>
      <GListItem>Item 2</GListItem>
      <GListItem>Item 3</GListItem>
    </GList>
  )
}
`
export const ListSubheaderUsage = () => {
  return (
    <CodeExample code={code} language='jsx'>
      <GList value={0}>
        <GListSubheader>Header one</GListSubheader>
        <GListItem>Item one</GListItem>
        <GListItem>Item two</GListItem>
        <GListItem>Item three</GListItem>
        <GListSubheader>Header two</GListSubheader>
        <GListItem>Item 1</GListItem>
        <GListItem>Item 2</GListItem>
        <GListItem>Item 3</GListItem>
      </GList>
    </CodeExample>
  )
}

