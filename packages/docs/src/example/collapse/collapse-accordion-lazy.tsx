import { CodeExample } from '../../components/code-example'
import { GCollapse, GCollapseItem } from '@lingjhf/guava'

const code = `

`
const CollapseAccordionLazy = () => {

  return (
    <CodeExample code={code} language='jsx'>
      <GCollapse accordion>
        <GCollapseItem header={'Collapse item1'}>
          <p>Collapse content</p>
          <p>Collapse content</p>
          <p>Collapse content</p>
          <p>Collapse content</p>
        </GCollapseItem>
        <GCollapseItem header={'Collapse item1'}>
          <p>Collapse content</p>
          <p>Collapse content</p>
          <p>Collapse content</p>
          <p>Collapse content</p>
        </GCollapseItem>
        <GCollapseItem header={'Collapse item1'}>
          <p>Collapse content</p>
          <p>Collapse content</p>
          <p>Collapse content</p>
          <p>Collapse content</p>
        </GCollapseItem>
      </GCollapse>
    </CodeExample>
  )
}

export default CollapseAccordionLazy

