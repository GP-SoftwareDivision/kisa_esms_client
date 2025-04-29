import styled from '@emotion/styled'
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  ColumnDef,
} from '@tanstack/react-table'
import { CustomSkeleton } from '@/components/elements/Skeleton.tsx'
import { useNavigate } from 'react-router-dom'

interface TableProps {
  data: object[]
  loading: boolean
  columns: ColumnDef<any>[]
  maxHeight?: number
  detailIdx?: string
}

const CustomTable = ({
  loading,
  data = [],
  columns = [],
  maxHeight,
  detailIdx,
}: TableProps) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  const navigate = useNavigate()

  const handleOnRowClick = (row: any) => {
    if (detailIdx)
      navigate(`/issue/tracking/detail?seqidx=${row.original[detailIdx]}`)
  }
  return (
    <TableWrapper>
      {loading ? (
        <StyledSkeletonWrapper>
          <CustomSkeleton lines={3} height={5} />
          <CustomSkeleton lines={2} height={100} />
        </StyledSkeletonWrapper>
      ) : (
        <TableContainer $maxHeight={maxHeight ? maxHeight : 'none'}>
          <StyledTable>
            <thead style={{ position: 'sticky' }}>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHeader key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
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
                <TableRow key={row.id} onClick={() => handleOnRowClick(row)}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </tbody>
          </StyledTable>
        </TableContainer>
      )}
    </TableWrapper>
  )
}

export default CustomTable

const TableWrapper = styled.div`
  overflow-x: auto;
  width: 100%;
`

const TableContainer = styled.div<{ $maxHeight: number | string }>`
  position: relative;
  width: 100%;
  overflow-y: auto;
  max-height: ${(props) =>
    props.$maxHeight ? `${props.$maxHeight}px` : 'none'};
`

const StyledTable = styled.table`
  table-layout: fixed;
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
  ${({ theme }) => theme.typography.body2};

  thead {
    position: sticky;
    top: 0;
    background-color: #fafafa;
  }
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

const StyledSkeletonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`
