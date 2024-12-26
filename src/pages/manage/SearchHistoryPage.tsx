import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

import { ContentBox, ContentContainer } from '@/assets/styles/global.ts'
import PageTitle from '@/components/elements/PageTitle.tsx'
import Button from '@/components/elements/Button.tsx'
import { Checkbox } from '@/components/ui/checkbox.tsx'
import CustomTable from '@/components/charts/Table.tsx'
import CustomPagination from '@/components/elements/Pagination.tsx'
import { useQueries } from '@/hooks/queries/useQueries.tsx'
import { usePagination } from '@/hooks/common/usePagination.tsx'
import { useSearchHistoryDeleteMutation } from '@/hooks/mutations/useSearchHistoryDeleteMutation.tsx'
import { Box } from '@chakra-ui/react'

interface SearchHistoryListType {
  seqidx: number
  regdate: string
  searchlog: string
  type: string
  title: string
  username: string
}

const SearchHistoryPage = () => {
  const navigate = useNavigate()

  // 삭제 목록
  const [deleteItems, setDeleteItems] = useState<number[]>([])

  const { page, handlePageChange } = usePagination(1)

  // 검색 기록 관리 조회
  const searchHistoryList = useQueries<{
    data: SearchHistoryListType[]
    count: number
  }>({
    queryKey: `searchHistoryList`,
    method: 'POST',
    url: '/api/manage/search/history',
    body: {
      page: page,
    },
  })

  // 검색 기록 삭제 hooks
  const { mutate } = useSearchHistoryDeleteMutation()

  const SearchHistoryColumns = [
    {
      header: '',
      accessorKey: '',
      id: 'delete',
      cell: ({ row }: any) => {
        return (
          <Checkbox
            checked={deleteItems.includes(row.original.seqidx)}
            size={'xs'}
            onCheckedChange={(checked) => {
              const itemId = row.original.seqidx
              if (checked.checked) {
                setDeleteItems((prev) =>
                  prev.includes(itemId) ? prev : [...prev, itemId]
                )
              } else {
                setDeleteItems((prev) => prev.filter((id) => id !== itemId))
              }
            }}
          />
        )
      },
    },
    {
      header: '저장명',
      accessorKey: 'title',
    },
    {
      header: '작성자명',
      accessorKey: 'username',
    },
    {
      header: '수집대상',
      accessorKey: 'type',
    },
    {
      header: '저장일시',
      accessorKey: 'regdate',
    },
    {
      header: '',
      accessorKey: '',
      id: 'update',
      cell: ({ row }: any) => (
        <Box display='flex' justifyContent='center'>
          <Button
            type={'secondary'}
            text={'이동'}
            onClick={() =>
              navigate(
                `/retrieve/${row.original.type === '다크웹' ? 'darkweb' : 'telegram'}?${row.original.searchlog}`
              )
            }
          />
        </Box>
      ),
    },
  ]
  return (
    <ContentContainer>
      <PageTitle
        text={'검색 기록 관리'}
        children={
          <Button
            type={deleteItems.length === 0 ? 'ghost' : 'primary'}
            onClick={() => {
              mutate({ items: deleteItems })
              setDeleteItems([])
            }}
            text={'삭제'}
            disabled={deleteItems.length === 0}
          />
        }
      />
      <ContentBox>
        {searchHistoryList.isSuccess && (
          <>
            <CustomTable
              loading={searchHistoryList.isLoading}
              data={searchHistoryList?.data.data}
              columns={SearchHistoryColumns}
            />
            <CustomPagination
              total={searchHistoryList.data?.count}
              page={page}
              handlePageChange={(newPage) =>
                handlePageChange(newPage as number)
              }
            />
          </>
        )}
      </ContentBox>
    </ContentContainer>
  )
}
export default SearchHistoryPage
