import { CodeExample } from '../../components/code-example'
import { showMessage, GButton } from '@lingjhf/guava'

export default function MessageTypeLazy() {
  const code = `

  `
  function messageChange(type: string) {
    showMessage({ message: 'Message', type })
  }
  return (
    <CodeExample code={code} language='jsx'>

      <div class='flex'>
        <div class='m-2'>
          <GButton onClick={[messageChange, 'default']}>Button</GButton>
        </div>
        <div class='m-2'>
          <GButton onClick={[messageChange, 'success']}>Success</GButton>
        </div>
        <div class='m-2'>
          <GButton onClick={[messageChange, 'warn']}>Warn</GButton>
        </div>
        <div class='m-2'>
          <GButton onClick={[messageChange, 'danger']}>Danger</GButton>
        </div>
      </div>
    </CodeExample>
  )
}
