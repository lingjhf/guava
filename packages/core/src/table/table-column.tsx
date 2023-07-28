import styles from './table-column.module.css'

export interface TableColumnProps {
  label: string
  prop: string
  align: 'left' | 'center' | 'right'
  fixed: boolean
  width: number
  className: string
}

export const TableColumn = (props: TableColumnProps) => {
  const columnStyles = () => {
    return `width:${props.width};flex-shrink: 0;${props.fixed ? 'position: sticky;left:0px;' : ''}`
  }

  return (
    <div class={styles.tableHeaderField} style={columnStyles()}>
      {props.label}
    </div>
  )
}