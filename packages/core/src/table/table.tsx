import { For, createContext, createMemo, createSignal, onMount, useContext } from 'solid-js'
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
  width?: number
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
  const [tableWidth, setTableWidth] = createSignal(0)

  const tableStyles = () => {
    const styles = [
      `height:${typeof props.height === 'number' ? `${props.height}px` : props.height}`
    ]
    return mergeStyles(styles, props.style)
  }

  const columns = createMemo<TableColumnProps[]>(() => {
    let totalWidth = 0
    const columns = props.columns.map((column, index) => {
      const width = column.width ?? 80
      totalWidth += width
      return {
        label: column.label ?? '',
        prop: column.prop ?? '',
        align: column.align ?? 'left',
        fixed: column.fixed ?? false,
        width,
        className: `tableColumn_${index}`
      }
    })
    setTableWidth(totalWidth)
    return columns
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
        <table style={`width:${tableWidth()}px;table-layout: fixed; border-collapse: collapse;`}
          cell-padding='0'
          cell-spacing='0'
        >
          <colgroup>
            <For each={columns()}>
              {
                (column) => <col id={column.className} width={column.width}></col>
              }
            </For>
          </colgroup>
          <thead>
            <tr>
              <For each={columns()}>
                {
                  (column) => {
                    return (
                      <th class={styles.tableHeaderCell}>{column.label}</th>
                    )
                  }
                }
              </For>
            </tr>
          </thead>
        </table>
      </div>
      <GScrollbar scrollChange={scrollChange}>
        <table style={`width:${tableWidth()}px;table-layout: fixed; border-collapse: collapse;`}>
          <colgroup>
            <For each={columns()}>
              {
                (column) => <col id={column.className} width={column.width}></col>
              }
            </For>
          </colgroup>
          <tbody>
            <For each={props.data}>
              {
                (item) => {
                  return (
                    <tr >
                      <For each={columns()}>
                        {
                          (column) => {
                            return (
                              <td class={mergeClasses([styles.tableCell, column.className])}>
                                <div >
                                  {column.prop ? item[column.prop] : null}
                                </div>
                              </td>
                            )
                          }
                        }
                      </For>
                    </tr>
                  )
                }
              }
            </For>
          </tbody>
        </table>
      </GScrollbar>
    </div >
  )
}