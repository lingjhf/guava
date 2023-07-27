import { For, createContext, useContext } from 'solid-js'
import type { GuavaParentProps } from '../types'
import { generateSplitEventHandlersProps } from '../utils'
import { TableColumn, type TableColumnProps } from './table-column'
import styles from './table.module.css'

export interface TableProviderValue {
  addColumn: (props: TableColumnProps) => void
}
export interface TableProps extends GuavaParentProps<HTMLDivElement> {
  data: Record<string, any>[]
  columns: TableColumnProps[]
}

const TableContext = createContext<TableProviderValue>()

export const useTableContext = () => useContext(TableContext)

export const Table = (propsRaw: Partial<TableProps>) => {

  const [eventHandlers, props] = generateSplitEventHandlersProps(
    propsRaw,
    {
      data: [],
      columns: []
    }
  )

  return (
    <div>
      <div>
        <For each={props.columns}>
          {
            (column) => {
              return (
                <TableColumn {...column}></TableColumn>
              )
            }
          }
        </For>
      </div>
      <For each={props.data}>
        {
          (item) => {
            return (
              <div class={styles.tableRaw}>
                <For each={props.columns}>
                  {
                    (column) => {
                      return (
                        <div>{column.prop ? item[column.prop] : null}</div>
                      )
                    }
                  }
                </For>
              </div>
            )
          }
        }
      </For>
    </div>
  )
}