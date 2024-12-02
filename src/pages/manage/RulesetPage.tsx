import styled from '@emotion/styled'
import { usePagination } from '@/hooks/common/usePagination.tsx'
import { ContentBox, ContentContainer } from '@/assets/styles/global.ts'
import PageTitle from '@/components/elements/PageTitle.tsx'
import Button from '@/components/elements/Button.tsx'
import { useQueries } from '@/hooks/queries/useQueries.tsx'
import CustomTable from '@/components/charts/Table.tsx'
import CustomPagination from '@/components/elements/Pagination.tsx'
import { Checkbox } from '@/components/ui/checkbox.tsx'

interface RulesetType {
  seqidx: number
  type: string
  rule: string
  useflag: string
  hackingflag: string
  regdate: string
}

const RulesetPage = () => {
  const { page, handlePageChange } = usePagination()

  const ruleList = useQueries<{ data: RulesetType[]; count: number }>({
    queryKey: `ruleList_${page}`,
    method: 'POST',
    url: '/api/manage/ruleList',
    body: {
      page: page,
    },
  })

  // 룰셋 관리 테이블 컬럼 정의
  const RulesetColumns = [
    {
      header: '',
      accessorKey: '',
      id: 'delete',
      cell: () => {
        return <Checkbox size={'xs'} />
      },
    },
    {
      header: '수집타입',
      accessorKey: 'type',
    },
    {
      header: '키워드',
      accessorKey: 'rule',
    },
    {
      header: '사용여부',
      accessorKey: 'useflag',
      cell: ({ row }: any) =>
        row.original?.useflag === 'Y' ? <span>사용</span> : <span>미사용</span>,
    },
    {
      header: '해킹여부',
      accessorKey: 'hackingflag',
      cell: ({ row }: any) =>
        row.original?.hackingflag === 'Y' ? (
          <span>해킹</span>
        ) : (
          <span>미해킹</span>
        ),
    },
    {
      header: '생성일시(최근수정일)',
      accessorKey: 'regdate',
    },
    {
      header: '',
      accessorKey: '수정',
      id: 'update',
      cell: () => (
        <div>
          <Button
            type={'secondary'}
            text={'수정'}
            onClick={() => console.log('test')}
          />
        </div>
      ),
    },
  ]

  const deleteSearchHistory = () => {}

  return (
    <ContentContainer>
      <PageTitle
        text={'룰셋 관리'}
        children={
          <TitleButtonWrapper>
            <Button
              type={'secondary'}
              onClick={deleteSearchHistory}
              text={'추가'}
            />
            <Button
              type={'primary'}
              onClick={deleteSearchHistory}
              text={'삭제'}
            />
          </TitleButtonWrapper>
        }
      />
      <ContentBox>
        {ruleList.isSuccess && (
          <>
            <CustomTable
              loading={ruleList.isLoading}
              data={ruleList?.data.data}
              columns={RulesetColumns}
            />
            <CustomPagination
              total={ruleList.data?.count}
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
export default RulesetPage

const TitleButtonWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
`
