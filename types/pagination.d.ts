export interface PaginationRes<T> {
  page: number
  pageSize: number
  totalElements: number
  totalPages: number
  data: T
}
