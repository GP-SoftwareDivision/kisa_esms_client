import { useState } from 'react'

export const usePagination = (initialPage: number = 1) => {
  const [page, setPage] = useState(initialPage)
  const handlePageChange = (page: number) => setPage(page)
  return { page, setPage, handlePageChange }
}
