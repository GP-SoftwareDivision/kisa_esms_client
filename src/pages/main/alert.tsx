import { useState } from 'react'

import PageTitle from '@/components/elements/PageTitle.tsx'
import CustomTable from '@/components/charts/Table.tsx'
import { Alertcolumn } from '@/data/columns/alert.ts'
import { useQueryHandler } from '@/hooks/useQueryHandler.tsx'
import { ContentBox, ContentContainer } from '@/assets/styles/global.ts'

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

const Alert = () => {
  const [pageNum, setPageNum] = useState<number>(1)

  const alertList = useQueryHandler<{ data: AlertType[]; count: number }>({
    method: 'POST',
    url: '/api/main/alarmList',
    body: {
      page: pageNum,
    },
  })

  return (
    <>
      <ContentContainer>
        <PageTitle text={'알림 내역'} />
        <ContentBox>
          {alertList.isSuccess && (
            <CustomTable
              loading={alertList.isLoading}
              data={alertList?.data.data}
              columns={Alertcolumn}
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
export default Alert
