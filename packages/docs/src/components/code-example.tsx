import { GCard, GHightlight } from '@lingjhf/guava'
import type { FlowProps } from 'solid-js'

export interface CodeExampleProps extends FlowProps {
  code: string
  language?: string | undefined
}

export const CodeExample = (props: CodeExampleProps) => {

  return (
    <GCard>
      <div>
        {props.children}
      </div>
      <div>
        <GHightlight code={props.code} language={props.language ?? ''} />
      </div>
    </GCard>
  )
}