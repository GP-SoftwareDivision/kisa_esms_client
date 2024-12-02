import { ContentBox, ContentContainer } from '@/assets/styles/global.ts'
import PageTitle from '@/components/elements/PageTitle.tsx'
import CustomTable from '@/components/charts/Table.tsx'
import { ServerColumns } from '@/constants/tableColumns.ts'
import { useQueries } from '@/hooks/queries/useQueries.tsx'

interface ServerType {
  servername: string
  lastcrawl: string
  count: number
  apitype: string
}

const ServerPage = () => {
  const serverList = useQueries<{ data: ServerType[]; count: number }>({
    queryKey: `serverList`,
    method: 'POST',
    url: '/api/manage/serverList',
  })

  return (
    <ContentContainer>
      <PageTitle text={'서버 관리'} />
      <ContentBox>
        {serverList.isSuccess && (
          <CustomTable
            loading={serverList.isLoading}
            data={serverList.data.data}
            columns={ServerColumns}
          />
        )}
      </ContentBox>
    </ContentContainer>
  )
}
export default ServerPage
