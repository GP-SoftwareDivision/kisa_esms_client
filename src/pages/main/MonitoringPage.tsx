import React, { useMemo, useState } from 'react'
import styled from '@emotion/styled'
import { Stack } from '@chakra-ui/react'
import { useLocation, useNavigate } from 'react-router-dom'

import { ContentContainer } from '@/assets/styles/global.ts'
import PageTitle from '@/components/elements/PageTitle.tsx'
import TelegramCard from '@/components/templates/TelegramCard.tsx'
import Empty from '@/components/elements/Empty.tsx'
import { Loading } from '@/components/elements/Loading.tsx'
import CustomTabs from '@/components/elements/Tabs.tsx'
import DarkwebCard from '@/components/templates/DarkwebCard.tsx'
import { useQueries } from '@/hooks/queries/useQueries.tsx'
import { ttListType } from '@/pages/retrieve/TelegramPage.tsx'
import { dtListType } from '@/pages/retrieve/DarkWebPage.tsx'

const TabContainer = styled.div`
  display: flex;

  button {
    min-width: 70px !important;
  }
`

interface MonitoringType {
  type: string
  list: dtListType[] | ttListType[]
}

const MonitoringPage = () => {
  const navigate = useNavigate()

  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const [type, setType] = useState<string>(queryParams.get('type') || '')

  // 모니터링 데이터 조회 API
  const issueMonitoring = useQueries<{ data: MonitoringType[] }>({
    queryKey: `issueMonitoring`,
    method: 'POST',
    url: `/api/main/monitoring`,
  })

  // 다크웹 | 텔레그램
  const renderMonitoringList = useMemo(() => {
    if (issueMonitoring.isLoading) {
      return <Loading />
    }

    if (issueMonitoring.isSuccess && issueMonitoring.data.data.length === 0) {
      return <Empty />
    }

    if (issueMonitoring.isSuccess && issueMonitoring.data.data.length > 0) {
      const typeData = issueMonitoring.data.data?.find(
        (i: MonitoringType) => i.type === type
      )

      if (!typeData) return null

      const renderCard = (v: any) => {
        if (type === 'darkweb') {
          return (
            <Stack margin={'0 0 0.5rem 0'}>
              <DarkwebCard
                key={v.seqidx}
                onClick={() =>
                  navigate(`/retrieve/darkweb/detail?id=${v.seqidx}`)
                }
                {...v}
              />
            </Stack>
          )
        }
        if (type === 'telegram') {
          return (
            <Stack margin={'0 0 0.5rem 0'}>
              <TelegramCard
                key={v.seqidx}
                contents={v.contents + v.contents2}
                trancontents={
                  v.trancontents ? v.trancontents + v.trancontents2 : ''
                }
                channelurl={v.curl}
                title={v.title}
                issueresponseflag={v.responseflag}
                onClick={() =>
                  navigate(`/retrieve/telegram/detail?id=${v.seqidx}`)
                }
                {...v}
              />
            </Stack>
          )
        }
        return null
      }

      return typeData.list.map(renderCard)
    }

    return null
  }, [issueMonitoring, type, navigate])

  return (
    <ContentContainer>
      <PageTitle
        text={'이슈 모니터링'}
        children={
          <TabContainer>
            <CustomTabs
              key={type}
              items={[
                { label: '다크웹', value: 'darkweb' },
                { label: '텔레그램', value: 'telegram' },
              ]}
              value={type}
              setValue={setType}
            />
          </TabContainer>
        }
      />
      {renderMonitoringList}
    </ContentContainer>
  )
}
export default React.memo(MonitoringPage)
