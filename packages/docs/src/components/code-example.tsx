import { GButton, GScrollbar, GHightlight } from '@lingjhf/guava'
import { createSignal, Show, type FlowProps } from 'solid-js'
import { CopyOutlined } from './copy-outlined'
import { CheckFilled } from './check-filled'
import { CodeOutlined } from './code-outlined'

export interface CodeExampleProps extends FlowProps {
  code: string
  language?: string | undefined
}

export const CodeExample = (props: CodeExampleProps) => {

  const [visibleCode, setVisibleCode] = createSignal(false)
  const [copied, setCopied] = createSignal(false)

  const codeStyles = () => {

    return {
      height: visibleCode() ? 'auto' : '0'
    }
  }

  function copyCode() {
    navigator.clipboard.writeText(props.code)
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
    }, 2000)
  }

  function showCode() {
    setVisibleCode(v => !v)
  }

  return (
    <div class=' box-border overflow-hidden border border-solid border-[var(--border-common-default)] rounded-2'>
      <GScrollbar>
        <div class='p-24px'>
          {props.children}
        </div>
      </GScrollbar>
      <div class='h-48px box-border p-2 flex border border-t border-t-solid border-t-[var(--border-common-default)]'>
        <div class=' ml-auto'>
          <GButton size='medium' variant='text' onClick={copyCode}>
            <Show when={copied()} fallback={<CopyOutlined class=' text-[20px]' />}>
              <CheckFilled class='text-[20px]'></CheckFilled>
            </Show>
          </GButton>
          <GButton size='medium' variant='text'><CodeOutlined class=' text-[20px]' onClick={showCode} /></GButton>
        </div>
      </div>
      <div style={codeStyles()}>
        <GScrollbar>
          <div class='bg-[var(--bg-common-highest)]'>
            <GHightlight code={props.code} copy={false} language={props.language ?? ''} />
          </div>
        </GScrollbar>
      </div>
    </div>
  )
}