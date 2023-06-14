import { For, JSX, Show, createEffect, createSignal, on } from 'solid-js'
import { ComponentProps } from '../types'
import { customEventHandlersName, generateProps } from '../utils'
import { MoreFilled } from '../icon/more-filled'
import { ChevronLeftFilled } from '../icon/chevron-left-filled'
import { ChevronRightFilled } from '../icon/chevron-right-filled'
import styles from './pagination.module.css'

export interface PaginationProps extends ComponentProps<HTMLDivElement> {
  currentPage: number
  pageSize: number
  total: number
  maxPager: number
  page?: (value: number) => JSX.Element
  prev: boolean | JSX.Element
  next: boolean | JSX.Element
  quickPrev?: JSX.Element
  quickNext?: JSX.Element
  disabled: boolean
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
      prev: false,
      next: false,
      disabled: false,
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

  const paginationItemClasses = (page?: number) => {
    let classes = `${styles.paginationItem}`

    if (page === currentPage()) {
      classes += ` ${styles.paginationItemActive}`
      if (props.disabled) {
        classes += ` ${styles.paginationItemActiveDisabled}`
      }
    } else if (props.disabled) {
      classes += ` ${styles.paginationDisabled}`
    }

    return classes
  }

  const paginationPrev = () => {
    let classes = `${styles.paginationPrev}`
    if (currentPage() === 1 || props.disabled) {
      classes += ` ${styles.paginationDisabled}`
    }
    return classes
  }

  const paginationNext = () => {
    let classes = `${styles.paginationNext}`
    if (currentPage() === totalPage || props.disabled) {
      classes += ` ${styles.paginationDisabled}`
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
    if (totalPage > 1) {
      pagers.push({ page: totalPage })
    }
    return pagers
  }

  function prev() {
    if (props.disabled) return
    if (currentPage() - 1 < 1) return
    setCurrentPage(v => v - 1)
  }

  function next() {
    if (props.disabled) return
    if (currentPage() + 1 > totalPage) return
    setCurrentPage(v => v + 1)
  }

  function quickPrev() {
    if (props.disabled) return
    setCurrentPage(v => {
      let value = v - (maxPager - 2)
      if (value < 1) {
        value = 1
      }
      return value
    })
  }

  function quickNext() {
    if (props.disabled) return
    setCurrentPage(v => {
      let value = v + (maxPager - 2)
      if (value > totalPage) {
        value = totalPage
      }
      return value
    })
  }

  function currentPageChange(value: number) {
    if (props.disabled) return
    setCurrentPage(value)
  }

  return (
    <div class={styles.pagination} {...eventHandlers}>
      <Show when={props.prev} >
        <div class={paginationPrev()} onClick={prev}>
          {typeof props.prev === 'boolean' ? <ChevronLeftFilled /> : props.prev}
        </div>
      </Show>
      <For each={pagers()}>
        {
          (item) => {
            if (item.isQuickPrev) {
              return <div class={paginationItemClasses()} onClick={quickPrev}>
                {props.quickPrev ? props.quickPrev : <MoreFilled />}
              </div>
            }
            if (item.isQuickNext) {
              return <div class={paginationItemClasses()} onClick={quickNext}>
                {props.quickNext ? props.quickNext : <MoreFilled />}
              </div>
            }
            return (
              <div class={paginationItemClasses(item.page)} onClick={[currentPageChange, item.page]}>
                {props.page ? props.page?.(item.page!) : item.page}
              </div>
            )
          }
        }
      </For>
      <Show when={props.next}>
        <div class={paginationNext()} onClick={next}>
          {typeof props.next === 'boolean' ? <ChevronRightFilled /> : props.next}
        </div>
      </Show>
    </div>
  )
}