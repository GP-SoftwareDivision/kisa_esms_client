import PageTitle from '@/components/elements/PageTitle.tsx'
import CustomTable from '@/components/charts/Table.tsx'
import { AlertColumns } from '@/constants/tableColumns.ts'
import { ContentBox, ContentContainer } from '@/assets/styles/global.ts'
import { useQueryHandler } from '@/hooks/useQueryHandler.tsx'
import { usePagination } from '@/hooks/usePagination.tsx'
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
  const { page, handlePageChange } = usePagination()

  const alertList = useQueryHandler<{ data: AlertType[]; count: number }>({
    method: 'POST',
    url: '/api/main/alarmList',
    body: {
      page: page,
    },
  })

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
