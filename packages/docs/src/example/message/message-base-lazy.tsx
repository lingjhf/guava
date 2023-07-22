import { CodeExample } from '../../components/code-example'
import { showMessage, GButton } from '@lingjhf/guava'

export default function MessageBaseLazy () {
  const code = `

  `
  function messageChange() {
    showMessage({ message: 'Message' })
  }
  return (
    <CodeExample code={code} language='jsx'>
      <GButton onClick={messageChange}>Message</GButton>
    </CodeExample>
  )
}
