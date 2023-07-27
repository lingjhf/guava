import styles from './table-column.module.css'

export interface TableColumnProps {
  label?: string
  prop?: string
  align?: 'left' | 'center' | 'right'
  fixed?: boolean
  width?: string
}

export const TableColumn = (props: TableColumnProps) => {

  return (
    <div>

    </div>
  )
}