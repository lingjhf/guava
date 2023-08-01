import { For, createMemo, createSignal } from 'solid-js'
import type { GuavaParentProps } from '../types'
import { generateSplitEventHandlersProps, mergeClasses, mergeStyles } from '../utils'
import { GScrollbar, type ScrollDetail } from '../scrollbar'
import styles from './table.module.css'

export interface TableColumn {
  label?: string
  prop?: string
  align?: 'left' | 'center' | 'right'
  fixed?: 'left' | 'right'
  width?: number
}

export interface TableProps extends GuavaParentProps<HTMLDivElement> {
  data: Record<string, any>[]
  columns: TableColumn[]
  border: boolean
  striped: boolean
  height: string | number
}

interface TableColumnProps {
  label: string
  prop: string
  align: 'left' | 'center' | 'right'
  fixed?: 'left' | 'right',
  fixedLeft: number,
  fixedRight: number,
  width: number
  className: string
}

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
    const fixedLeftColumns: TableColumnProps[] = []
    const fixedRightColumns: TableColumnProps[] = []
    const columns = props.columns.map((column, index) => {
      const width = column.width ?? 80
      totalWidth += width
      const columnProps = {
        label: column.label ?? '',
        prop: column.prop ?? '',
        align: column.align ?? 'left',
        fixed: column.fixed,
        fixedLeft: 0,
        fixedRight: 0,
        width,
        className: `tableColumn_${index}`
      }
      if (column.fixed === 'left') {
        fixedLeftColumns.push(columnProps)
      }
      if (column.fixed === 'right') {
        fixedRightColumns.unshift(columnProps)
      }

      return columnProps
    })
    let fixedLeft = 0
    let fixedRight = 0
    for (const column of fixedLeftColumns) {
      column.fixedLeft += fixedLeft
      fixedLeft += column.width
    }
    for (const column of fixedRightColumns) {
      column.fixedRight += fixedRight
      fixedRight += column.width
    }
    setTableWidth(totalWidth)
    return columns
  })

  function headerCellClasses(column: TableColumnProps) {
    const classes = [styles.tableHeaderCell]
    if (column.fixed) {
      classes.push(styles.tableCellFixed)
    }
    return mergeClasses(classes)
  }

  function cellClasses(column: TableColumnProps) {
    const classes = [styles.tableCell]
    if (column.fixed) {
      classes.push(styles.tableCellFixed)
    }
    return mergeClasses(classes)
  }

  function cellStyles(column: TableColumnProps) {
    if (column.fixed === 'left') {
      return `left:${column.fixedLeft}px;`
    }
    if (column.fixed === 'right') {
      return `right:${column.fixedRight}px`
    }
    return ''
  }

  function scrollChange(detail: ScrollDetail) {
    headerRef.scrollTo({ left: detail.scrollX })
  }

  return (
    <div class={styles.table} style={tableStyles()}>
      <div class={styles.tableHeaderWrap} ref={headerRef!}>
        <table class={styles.tableHeader} style={`width:${tableWidth()}px;`}
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
                      <th class={headerCellClasses(column)} style={cellStyles(column)}>{column.label}</th>
                    )
                  }
                }
              </For>
            </tr>
          </thead>
        </table>
      </div>
      <GScrollbar scrollChange={scrollChange}>
        <table class={styles.tableBody} style={`width:${tableWidth()}px;`}>
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
                    <tr>
                      <For each={columns()}>
                        {
                          (column) => {
                            return (
                              <td class={cellClasses(column)} style={cellStyles(column)}>
                                <div>
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