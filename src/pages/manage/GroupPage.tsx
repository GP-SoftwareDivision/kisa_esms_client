import styled from '@emotion/styled'
import { ContentBox, ContentContainer } from '@/assets/styles/global.ts'
import CustomTable from '@/components/charts/Table.tsx'
import PageTitle from '@/components/elements/PageTitle.tsx'
import Button from '@/components/elements/Button.tsx'
import { useQueryHandler } from '@/hooks/useQueryHandler.tsx'
import CustomPagination from '@/components/elements/Pagination.tsx'
import { usePagination } from '@/hooks/usePagination.tsx'

interface groupList {
  groupcode: number
  groupname: string
  comment: string
  alram: string
  autosendflag: string
  kakaoflag: string
  emailflag: string
  useflag: string
  updatedate: string
}

const GroupPage = () => {
  const { page, handlePageChange } = usePagination()
  const groupList = useQueryHandler<{ data: groupList[] }>({
    method: 'POST',
    url: '/api/manage/groupList',
  })

  const columns = [
    {
      header: '그룹명',
      accessorKey: 'groupname',
    },
    {
      header: '설명',
      accessorKey: 'comment',
    },
    {
      header: '알람방식',
      accessorKey: 'alram',
    },
    {
      header: '다운로드',
      accessorKey: '',
      id: 'actions',
      cell: ({ row }: any) => (
        <TableButtonWrapper>
          <Button
            type={'download'}
            text={'수정'}
            onClick={() => console.log(row.original.seqidx)}
          />
        </TableButtonWrapper>
      ),
    },
  ]

  const handleOnSelectChange = () => {}

  return (
    <ContentContainer>
      <PageTitle text={'유저 관리'} />
      <ButtonWrapper>
        <Button
          type={'download'}
          onClick={handleOnSelectChange}
          text={'추가'}
        />
      </ButtonWrapper>
      <ContentBox>
        {groupList.isSuccess && (
          <>
            <CustomTable
              loading={groupList.isLoading}
              data={groupList.data.data}
              columns={columns}
            />
            <CustomPagination
              total={1}
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
export default GroupPage

const TableButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 0.5rem;
`
