import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from '@/components/ui/pagination.tsx'
import React, { Dispatch } from 'react'

interface PaginationProps {
  total: number
  page: number
  handlePageChange: Dispatch<React.SetStateAction<number>>
}

const CustomPagination = ({
  total,
  page,
  handlePageChange,
}: PaginationProps) => {
  return (
    <PaginationRoot
      count={total || 0}
      pageSize={15}
      siblingCount={2}
      page={page}
      onPageChange={(e) => handlePageChange(e.page)}
      display={'flex'}
      justifyContent={'center'}
      margin={'1rem'}
    >
      <PaginationPrevTrigger />
      <PaginationItems />
      <PaginationNextTrigger />
    </PaginationRoot>
  )
}

export default CustomPagination
