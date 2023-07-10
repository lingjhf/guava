import type { GuavaProps } from '../types'
import { Show, createSignal, onMount } from 'solid-js'
import { generateSplitEventHandlersProps } from '../utils'
import { GButton } from '../button'
import { CopyOutlined } from '../icon/copy-outlined'
import { CheckFilled } from '../icon/check-filled'
import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-dark.css'
import styles from './highlight.module.css'

export interface HightlightProps extends GuavaProps<HTMLPreElement> {
  code: string
  language?: string
  copy: boolean
  showLanguage: boolean
}

export const Hightlight = (propsRaw: Partial<HightlightProps>) => {
  const [eventhandlers, props] = generateSplitEventHandlersProps(propsRaw, {
    code: '',
    copy: true,
    showLanguage: true,
  })
  let codeRef: HTMLElement

  const [currentLanguage, setCurrentLanguage] = createSignal<string>()
  const [copied, setCopied] = createSignal(false)

  onMount(() => {
    let htmlValue = ''
    if (props.language) {
      const result = hljs.highlight(props.code, { language: props.language })
      setCurrentLanguage(result.language)
      htmlValue = result.value
    } else {
      const result = hljs.highlightAuto(props.code)
      setCurrentLanguage(result.language)
      htmlValue = result.value
    }
    hljs.highlightElement(codeRef)
    codeRef.innerHTML = htmlValue
  })

  function copyCode() {
    navigator.clipboard.writeText(props.code)
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
    }, 2000)
  }

  return (
    <div class={styles.highlight}>
      <Show when={props.copy}>
        <GButton class={styles.highlightCopy} variant='text' icon size='medium' onClick={copyCode}>
          {
            copied() ? <CheckFilled /> : <CopyOutlined />
          }
        </GButton>
      </Show>
      <span class={styles.highlightLanguage}>{currentLanguage()}</span>
      <pre class={styles.highlightPre}>
        <code ref={codeRef!} class={styles.highlightCode}>
        </code>
      </pre>
    </div>
  )
}