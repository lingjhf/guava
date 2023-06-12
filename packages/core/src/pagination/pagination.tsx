import { ComponentProps } from '../types'

export interface PaginationProps extends ComponentProps<HTMLDivElement> {
  //当前页码
  currentPage: number
  //总数
  total: number
  //每页数量
  pageSize: number
  //最大页码按钮数量
  maxPage: number
  disabled: boolean
}

export const Pagination = () => {

  return (
    <div></div>
  )
}