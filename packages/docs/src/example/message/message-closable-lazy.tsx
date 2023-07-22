import { CodeExample } from '../../components/code-example'
import { showMessage, GButton } from '@lingjhf/guava'

export default function MessageClosableLazy() {
  const code = `

  `
  function messageChange() {
    showMessage({ message: 'Message', duration: 0, closable: true })
  }
  return (
    <CodeExample code={code} language='jsx'>
      <GButton onClick={messageChange}>Message</GButton>
    </CodeExample>
  )
}
