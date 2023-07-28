import { For, createContext, createMemo, onMount, useContext } from 'solid-js'
import type { GuavaParentProps } from '../types'
import { generateSplitEventHandlersProps, mergeClasses, mergeStyles } from '../utils'
import { TableColumn, type TableColumnProps } from './table-column'
import { GScrollbar, type ScrollDetail } from '../scrollbar'
import styles from './table.module.css'

export interface TableProviderValue {
  addColumn: (props: TableColumnProps) => void
}

export interface TableColumn {
  label?: string
  prop?: string
  align?: 'left' | 'center' | 'right'
  fixed?: boolean
  width?: string | number
}
export interface TableProps extends GuavaParentProps<HTMLDivElement> {
  data: Record<string, any>[]
  columns: TableColumn[]
  border: boolean
  striped: boolean
  height: string | number
}

const TableContext = createContext<TableProviderValue>()

export const useTableContext = () => useContext(TableContext)

export const Table = (propsRaw: Partial<TableProps>) => {

  const [eventHandlers, props] = generateSplitEventHandlersProps(
    propsRaw,
    {
      data: [],
      columns: [],
      border: false,
      striped: false,
      height: 'auto'
    }
  )

  let headerRef: HTMLDivElement
  const tableStyles = () => {
    const styles = [
      `height:${typeof props.height === 'number' ? `${props.height}px` : props.height}`
    ]
    return mergeStyles(styles, props.style)
  }

  const columns = createMemo(() => {
    return props.columns.map(column => {
      const width = column.width ?? '100%'
      return {
        label: column.label ?? '',
        prop: column.prop ?? '',
        align: column.align ?? 'left',
        fixed: column.fixed ?? false,
        width: typeof width === 'number' ? `${width}px` : width
      }
    })
  })

  function cellClasses(column: TableColumnProps) {
    const classes = [styles.tableCell]
    if (column.fixed) {
      classes.push(styles.tableCellFixed)
    }
    return mergeClasses(classes)
  }

  function scrollChange(detail: ScrollDetail) {
    headerRef.scrollTo({ left: detail.scrollX })
  }

  return (
    <div class={styles.table} style={tableStyles()}>
      <div class={styles.tableHeader} ref={headerRef!}>
        <For each={columns()}>
          {
            (column) => {
              return (
                <TableColumn {...column}></TableColumn>
              )
            }
          }
        </For>
      </div>
      <GScrollbar scrollChange={scrollChange}>
        <For each={props.data}>
          {
            (item) => {
              return (
                <div class={styles.tableRow}>
                  <For each={columns()}>
                    {
                      (column) => {
                        return (
                          <div class={cellClasses(column)} style={`width:${column.width};left:0`}>
                            {column.prop ? item[column.prop] : null}
                          </div>
                        )
                      }
                    }
                  </For>
                </div>
              )
            }
          }
        </For>
      </GScrollbar>
    </div >
  )
}