import { CodeExample } from '../../components/code-example'
import { GBreadcrumb, GBreadcrumbItem } from '@lingjhf/guava'

const code = `
`
export const AlertBaseUsage = () => {
  return (
    <CodeExample code={code} language='jsx'>
      <div class='my-2'>
        <GBreadcrumb >
          <GBreadcrumbItem>Breadcrumb node</GBreadcrumbItem>
          <GBreadcrumbItem>Breadcrumb node</GBreadcrumbItem>
          <GBreadcrumbItem>Breadcrumb node</GBreadcrumbItem>
          <GBreadcrumbItem>Breadcrumb node</GBreadcrumbItem>
          <GBreadcrumbItem>Breadcrumb node</GBreadcrumbItem>
        </GBreadcrumb>
      </div>
    </CodeExample>
  )
}

