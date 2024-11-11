import PageTitle from '@/components/elements/PageTitle.tsx'
import CustomTable from '@/components/charts/Table.tsx'
import { AlertColumns } from '@/constants/tableColumns.ts'
import { ContentBox, ContentContainer } from '@/assets/styles/global.ts'
import { useAlertList } from '@/hooks/useAlertList.tsx'

const AlertPage = () => {
  const { alertList, setPageNum } = useAlertList()

  return (
    <>
      <ContentContainer>
        <PageTitle text={'알림 내역'} />
        <ContentBox>
          {alertList.isSuccess && (
            <CustomTable
              loading={alertList.isLoading}
              data={alertList?.data.data}
              columns={AlertColumns}
              pagination={true}
              setPageNum={setPageNum}
              total={alertList.data?.count}
            />
          )}
        </ContentBox>
      </ContentContainer>
    </>
  )
}
export default AlertPage
