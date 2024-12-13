import { ContentBox, ContentContainer } from '@/assets/styles/global.ts'
import PageTitle from '@/components/elements/PageTitle.tsx'
import CustomTable from '@/components/charts/Table.tsx'
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
    url: '/api/setting/server',
  })

  // 서버 관리 테이블 컬럼 정의
  const ServerColumns = [
    {
      header: '서버명',
      accessorKey: 'servername',
    },
    {
      header: '수집타입',
      accessorKey: 'apitype',
      cell: ({ row }: any) =>
        row.original?.apitype === 'DT' ? (
          <span>다크웹</span>
        ) : (
          <span>텔레그램</span>
        ),
    },
    {
      header: '수집개수',
      accessorKey: 'count',
      cell: ({ row }: any) => {
        return <span>{row.original?.count}개</span>
      },
    },
    {
      header: '마지막 수집일시',
      accessorKey: 'lastcrawl',
    },
  ]
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
