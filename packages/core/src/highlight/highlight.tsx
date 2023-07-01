import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-dark.css'
import type { GuavaParentProps } from '../types'
import { onMount } from 'solid-js'
import { generateSplitEventHandlersProps } from '../utils'

export interface HightlightProps extends GuavaParentProps<HTMLDivElement> {
  language?: ''
  theme?: ''
}

export const Hightlight = (propsRaw: Partial<HightlightProps>) => {
  const [eventhandlers, props] = generateSplitEventHandlersProps(propsRaw, {})
  let codeRef: HTMLElement
  onMount(() => {
    hljs.getLanguage
    hljs.highlightElement(codeRef)
  })
  return (
    <div>
      <pre>
        <code ref={codeRef!}>
          {props.children}
        </code>
      </pre>
    </div>
  )
}