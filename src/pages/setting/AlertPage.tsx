import PageTitle from '@/components/elements/PageTitle.tsx'
import CustomTable from '@/components/charts/Table.tsx'
import { ContentBox, ContentContainer } from '@/assets/styles/global.ts'
import { useQueries } from '@/hooks/queries/useQueries.tsx'
import { usePagination } from '@/hooks/common/usePagination.tsx'
import CustomPagination from '@/components/elements/Pagination.tsx'

interface AlertType {
  seqidx: number
  senddate: string
  contents: string
  kakaoresult: string
  emailresult: string
  target: string
  targetidx: number
  groupname: string
}

const AlertPage = () => {
  const { page, handlePageChange } = usePagination(1)

  const alertList = useQueries<{ data: AlertType[]; count: number }>({
    queryKey: `alertList`,
    method: 'POST',
    url: '/api/setting/alarm/list',
    body: {
      page: page,
    },
  })

  const AlertColumns = [
    {
      header: '발송시간',
      accessorKey: 'senddate',
    },
    {
      header: '발송내용',
      accessorKey: 'contents',
    },
    {
      header: '발송 그룹',
      accessorKey: 'groupname',
    },
    {
      header: '대상 채널',
      accessorKey: 'target',
      cell: ({ row }: any) =>
        row.original?.target === 'DT' ? (
          <span>다크웹</span>
        ) : (
          <span>텔레그램</span>
        ),
    },
  ]

  return (
    <>
      <ContentContainer>
        <PageTitle text={'알림 내역'} />
        <ContentBox>
          {alertList.isSuccess && (
            <>
              <CustomTable
                loading={alertList.isLoading}
                data={alertList?.data.data}
                columns={AlertColumns}
              />
              <CustomPagination
                total={alertList.data?.count}
                page={page}
                handlePageChange={(newPage) =>
                  handlePageChange(newPage as number)
                }
              />
            </>
          )}
        </ContentBox>
      </ContentContainer>
    </>
  )
}
export default AlertPage
