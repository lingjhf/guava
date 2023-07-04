import { GCard, GHightlight } from '@lingjhf/guava'
import type { FlowProps } from 'solid-js'

export interface CodeExampleProps extends FlowProps {
  code: string
}

export const CodeExample = (props: CodeExampleProps) => {

  return (
    <GCard>
      <div>
        {props.children}
      </div>
      <div>
        <GHightlight code={props.code} />
      </div>
    </GCard>
  )
}