import React, { Dispatch } from 'react'
import styled from '@emotion/styled'
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from '@/components/ui/pagination'

interface TableProps {
  data: object[]
  columns: {
    header: string
    accessorKey: string
  }[]
  pagination?: boolean
  setPageNum?: Dispatch<React.SetStateAction<number>>
  total?: number
}

const CustomTable = (props: TableProps) => {
  const { data, columns, setPageNum, pagination, total } = props

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  const handleOnPage = (page: number) => {
    if (setPageNum) setPageNum(page)
  }

  return (
    <TableWrapper>
      <StyledTable>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHeader key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </TableHeader>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </tbody>
      </StyledTable>
      {pagination && (
        <PaginationRoot
          count={total!}
          pageSize={15}
          defaultPage={1}
          onPageChange={(e) => handleOnPage(e.page)}
          display={'flex'}
          justifyContent={'center'}
          marginTop={'2rem'}
        >
          <PaginationPrevTrigger />
          <PaginationItems />
          <PaginationNextTrigger />
        </PaginationRoot>
      )}
    </TableWrapper>
  )
}

export default CustomTable

const TableWrapper = styled.div`
  overflow-x: auto;
`

const StyledTable = styled.table`
  table-layout: fixed;
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
  ${({ theme }) => theme.typography.body2};
`

const TableHeader = styled.th`
  background-color: #fafafa;
  font-weight: bold !important;
  text-align: center;
  padding: 12px;
`

const TableCell = styled.td`
  padding: 12px;
  text-align: center;
  border-bottom: 1px solid #f0f0f0;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  max-width: 350px;
`

const TableRow = styled.tr`
  &:hover {
    background-color: #fafafa;
  }
`
