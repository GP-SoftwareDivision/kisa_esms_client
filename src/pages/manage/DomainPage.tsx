import { ContentBox, ContentContainer } from '@/assets/styles/global.ts'
import PageTitle from '@/components/elements/PageTitle.tsx'
import CustomTable from '@/components/charts/Table.tsx'
import CustomPagination from '@/components/elements/Pagination.tsx'

import { DomainColumns } from '@/constants/tableColumns.ts'
import { usePagination } from '@/hooks/common/usePagination.tsx'
import { useQueries } from '@/hooks/queries/useQueries.tsx'

interface ServerType {
  servername: string
  ip: string
  lastcrawl: string
  count: number
  apitype: string
}

const DomainPage = () => {
  const { page, handlePageChange } = usePagination()
  const domainList = useQueries<{ data: ServerType[]; count: number }>({
    queryKey: `domainList_${page}`,
    method: 'POST',
    url: '/api/manage/domainList',
    body: {
      page: page,
    },
  })

  return (
    <ContentContainer>
      <PageTitle text={'도메인 관리'} />
      <ContentBox>
        {domainList.isSuccess && (
          <>
            <CustomTable
              loading={domainList.isLoading}
              data={domainList.data.data}
              columns={DomainColumns}
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
export default DomainPage
