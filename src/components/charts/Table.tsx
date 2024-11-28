import { ReactNode } from 'react'
import styled from '@emotion/styled'
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { CustomSkeleton } from '@/components/elements/Skeleton.tsx'
import { useNavigate } from 'react-router-dom'

interface TableProps {
  data: object[]
  loading: boolean
  columns: {
    header: string
    accessorKey: string
    id?: string
    cell?: () => ReactNode
  }[]
  detailURL?: string
}

const CustomTable = ({
  loading,
  data = [],
  columns = [],
  detailURL,
}: TableProps) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })
  const navigate = useNavigate()
  const handleOnRowClick = (row: any) => {
    console.log(row)
    navigate(detailURL ?? '')
  }

  return (
    <TableWrapper>
      {loading ? (
        <CustomSkeleton />
      ) : (
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
              <TableRow
                key={row.id}
                onClick={detailURL ? () => handleOnRowClick(row) : undefined}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </tbody>
        </StyledTable>
      )}
    </TableWrapper>
  )
}

export default CustomTable

const TableWrapper = styled.div`
  overflow-x: auto;
`

const StyledTable = styled.table`
  table-layout: auto;
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
