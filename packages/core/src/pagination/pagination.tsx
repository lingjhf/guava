import { For, createEffect, createSignal, on } from 'solid-js'
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
  let maxPager = 0

  createEffect(() => {
    if (props.total <= 0) {
      return
    }
    totalPage = Math.ceil(props.total / props.pageSize)
    maxPager = props.maxPager > totalPage ? totalPage : props.maxPager
    setCurrentPage(props.currentPage)
  })

  createEffect(on(currentPage, (v) => {
    setPagers(generatePagers(v, maxPager, totalPage))
  }))

  const paginationItemClasses = (page: number) => {
    let classes = `${styles.paginationItem}`
    if (page === currentPage()) {
      classes += ` ${styles.paginationItemActive}`
    }
    return classes
  }

  function generatePagers(currentPage: number, maxPager: number, totalPage: number): Pager[] {
    const pagers: Pager[] = [{ page: 1 }]
    const half = Math.floor((maxPager - 2) / 2)
    if (currentPage + half < maxPager) {
      for (let i = 2; i < maxPager; i++) {
        pagers.push({ page: i })
      }
      if (totalPage > maxPager) {
        pagers.push({ isQuickNext: true })
      }
    } else if (currentPage - half > totalPage - (maxPager - 1)) {
      if (totalPage - maxPager > 0) {
        pagers.push({ isQuickPrev: true })
      }
      for (let i = totalPage - (maxPager - 2); i < totalPage; i++) {
        pagers.push({ page: i })
      }
    } else {
      pagers.push({ isQuickPrev: true })
      for (let i = currentPage - half; i <= currentPage + half; i++) {
        pagers.push({ page: i })
      }
      pagers.push({ isQuickNext: true })
    }
    pagers.push({ page: totalPage })
    return pagers
  }

  function quickPrev() {
    setCurrentPage(v => {
      let value = v - (maxPager - 2)
      if (value < 1) {
        value = 1
      }
      return value
    })
  }

  function quickNext() {
    setCurrentPage(v => {
      let value = v + (maxPager - 2)
      if (value > totalPage) {
        value = totalPage
      }
      return value
    })
  }

  function currentPageChange(value: number) {
    setCurrentPage(value)
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