
import { CodeExample } from '../../components/code-example'
import { GTabs, GTab } from '@lingjhf/guava'

export default function TabsBaseLazy() {
  const code = `
  <GTabs value={0}>
      <GTab>One</GTab>
      <GTab>Two</GTab>
      <GTab>Three</GTab>
      <GTab>Four</GTab>
      <GTab>Five</GTab>
  </GTabs>
  `

  return (
    <CodeExample code={code} language='jsx'>
      <GTabs value={0}>
        <GTab >One</GTab>
        <GTab >Two</GTab>
        <GTab >Three</GTab>
        <GTab >Four</GTab>
        <GTab >Five</GTab>
      </GTabs>
    </CodeExample>
  )
}
