import { For, createEffect, createSignal } from 'solid-js'
import { ComponentProps } from '../types'
import { customEventHandlersName, generateProps } from '../utils'
import { MoreFilled } from '../icon/more-filled'
import styles from './pagination.module.css'
export interface PaginationProps extends ComponentProps<HTMLDivElement> {
  currentPage: number
  pageSize: number
  total: number
  maxPager: number
}

interface Pager {
  page?: number
  isQuickPrev?: boolean
  isQuickNext?: boolean
}

export const Pagination = (propsRaw: Partial<PaginationProps>) => {
  const [eventHandlers, props] = generateProps(
    propsRaw,
    {
      currentPage: 1,
      pageSize: 10,
      total: 0,
      maxPager: 7,
    },
    customEventHandlersName,
  )

  const [pagers, setPagers] = createSignal<Pager[]>([])
  const [currentPage, setCurrentPage] = createSignal(1)
  let totalPage = 0

  createEffect(() => {
    if (props.total <= 0) {
      return
    }
    totalPage = Math.ceil(props.total / props.pageSize)
    setCurrentPage(props.currentPage)
    setPagers(generatePagers(props.currentPage, props.maxPager, totalPage))
  })

  const paginationItemClasses = (page: number) => {
    let classes = `${styles.paginationItem}`
    if (page === currentPage()) {
      classes += ` ${styles.paginationItemActive}`
    }
    return classes
  }

  function generatePagers(currentPage: number, maxPager: number, totalPage: number): Pager[] {
    const pagers: Pager[] = [{ page: 1 }]
    const a = Math.floor((maxPager - 2) / 2)
    if (currentPage + a < maxPager) {
      for (let i = 2; i < maxPager; i++) {
        pagers.push({ page: i })
      }
      pagers.push({ isQuickNext: true })
    } else if (currentPage - a > totalPage - (maxPager - 1)) {
      pagers.push({ isQuickPrev: true })
      for (let i = totalPage - (maxPager - 2); i < totalPage; i++) {
        pagers.push({ page: i })
      }
    } else {
      pagers.push({ isQuickPrev: true })
      for (let i = currentPage - 2; i <= currentPage + 2; i++) {
        pagers.push({ page: i })
      }
      pagers.push({ isQuickNext: true })
    }
    pagers.push({ page: totalPage })
    return pagers
  }

  function quickPrev() {
    const value = setCurrentPage(v => {
      let value = v - (props.maxPager - 2)
      if (value < 1) {
        value = 1
      }
      return value
    })
    setPagers(generatePagers(value, props.maxPager, totalPage))
  }

  function quickNext() {
    const value = setCurrentPage(v => {
      let value = v + (props.maxPager - 2)
      if (value > totalPage) {
        value = totalPage
      }
      return value
    })
    setPagers(generatePagers(value, props.maxPager, totalPage))
  }

  function currentPageChange(value: number) {
    setCurrentPage(value)
    setPagers(generatePagers(value, props.maxPager, totalPage))
  }

  const PaginationDefault = () => {
    return (
      <div></div>
    )
  }

  return (
    <div class={styles.pagination} {...eventHandlers}>
      
      <For each={pagers()}>
        {
          (item) => {
            if (item.isQuickPrev) {
              return <div class={styles.paginationItem} onClick={quickPrev}><MoreFilled /></div>
            }
            if (item.isQuickNext) {
              return <div class={styles.paginationItem} onClick={quickNext}><MoreFilled /></div>
            }
            return (
              <div class={paginationItemClasses(item.page!)} onClick={[currentPageChange, item.page]}>{item.page}</div>
            )
          }
        }
      </For>
    </div>
  )
}