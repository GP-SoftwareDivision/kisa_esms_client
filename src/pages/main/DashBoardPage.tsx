import { useMemo, useState } from 'react'
import dayjs from 'dayjs'
import styled from '@emotion/styled'
import { Box, Grid, GridItem, Flex, VStack } from '@chakra-ui/react'

import PageTitle from '@/components/elements/PageTitle.tsx'
import Bar from '@/components/charts/Bar.tsx'
import Pie from '@/components/charts/Pie.tsx'
import CustomTable from '@/components/charts/Table.tsx'
import CustomList from '@/components/charts/List.tsx'
import CustomDatePicker from '@/components/elements/DatePicker.tsx'
import { targetOptions } from '@/data/selectOptions.ts'
import { Loading } from '@/components/elements/Loading.tsx'
import { useQueries } from '@/hooks/queries/useQueries.tsx'
import Empty from '@/components/elements/Empty.tsx'

// 대응 이력 현황 타입 정의
interface ResponseListType {
  seqidx: number
  regdate: string
  targettype: string
  hackedorganization: string
  incidenttype: string
  channeltype: string
  darktelegramname: string
  firstrecogition: string
}

//대응 이력 현황 타입 정의
interface ResponseStatusType {
  bar: { label: string; value: number }[]
  pie: { label: string; value: number }[]
  list: {
    darkweb: {
      hacking: number
      response: number
    }
    telegram: {
      hacking: number
      response: number
    }
  }
  topChannelList: { label: string; value: number }[]
}

const DashBoardPage = () => {
  // 조회기간
  const [date, setDate] = useState({
    startdate: dayjs().subtract(6, 'M').format('YYYY-MM-DD'),
    enddate: dayjs().format('YYYY-MM-DD'),
  })

  //대응 현황 데이터 조회 API
  const responseStatus = useQueries<{ data: ResponseStatusType }>({
    queryKey: `responseList`,
    method: 'POST',
    url: `/api/main/dashboard`,
    body: date,
  })

  // 대응 이력 현황 데이터 조회 API
  const responseList = useQueries<{ data: ResponseListType[] }>({
    queryKey: `responseList`,
    method: 'POST',
    url: `/api/issue/history`,
    body: {
      type: 'M',
      page: 1,
      startdate: dayjs().subtract(7, 'd').format('YYYY-MM-DD'),
      enddate: dayjs().format('YYYY-MM-DD'),
      institution: '',
      channelName: '',
      targetType: '',
      incidentType: '',
      apiType: '',
      originType: '',
    },
  })

  // 테이블 컬럼
  const responseListColumns = [
    {
      header: '등록일시',
      accessorKey: 'registrationDate',
    },
    {
      header: '대상구분',
      accessorKey: 'targetType',
      cell: ({ row }: any) => {
        const matching = targetOptions
          .filter((item) =>
            row.original.targetType.split('/').includes(item.value)
          )
          .map((item) => item.label)
        return matching.join('/')
      },
    },
    {
      header: '피해기관',
      accessorKey: 'institution',
    },
    {
      header: '사고유형',
      accessorKey: 'incidentType',
    },
    {
      header: '채널구분',
      accessorKey: 'domainType',
    },
    {
      header: '채널명',
      accessorKey: 'channelName',
    },
    {
      header: '최초인지',
      accessorKey: 'originType',
    },
  ]

  const renderResponseStatus = useMemo(() => {
    if (responseStatus.isLoading) return <Loading />

    if (responseStatus.isSuccess)
      return (
        <>
          <PageTitle
            text={'대응현황'}
            children={
              <div>
                <CustomDatePicker label={''} date={date} setDate={setDate} />
              </div>
            }
          />
          {responseStatus.data?.data.pie ? (
            <Grid templateColumns={{ base: '1fr', md: '3fr 1fr' }} gap={4}>
              <GridItem>
                <Flex direction='column' height='100%'>
                  <ChartBox>
                    <ChartWrapper>
                      <h3>사고 유형</h3>
                      <Bar
                        series={responseStatus.data?.data.bar?.map(
                          (v) => v.value
                        )}
                        categories={responseStatus.data?.data.bar?.map(
                          (v) => v.label
                        )}
                      />
                    </ChartWrapper>
                    <ChartWrapper>
                      <h3>대응 현황</h3>
                      <Pie
                        series={responseStatus.data?.data.pie?.map(
                          (v) => v.value
                        )}
                        categories={responseStatus.data?.data.pie?.map(
                          (v) => v.label
                        )}
                      />
                    </ChartWrapper>
                  </ChartBox>
                </Flex>
              </GridItem>
              <GridItem>
                <Flex direction='column' height='100%'>
                  <PageTitle text={'이슈 내역'} />
                  <ListBox>
                    <VStack
                      align='stretch'
                      height='-webkit-fill-available'
                      gap={'0.3rem'}
                    >
                      <ListSubTitle>데이터 수집</ListSubTitle>
                      <CustomList
                        label={'다크웹 해킹 판단 건수'}
                        value={responseStatus.data?.data.list.darkweb.hacking}
                      />
                      <CustomList
                        label={'텔레그램 해킹 판단 건수'}
                        value={responseStatus.data?.data.list.telegram.hacking}
                      />
                      <CustomList
                        label={'다크웹 대응 건수'}
                        value={responseStatus.data?.data.list.darkweb.response}
                      />
                      <CustomList
                        label={'텔레그램 대응 건수'}
                        value={responseStatus.data?.data.list.telegram.response}
                      />
                      <ListSubTitle>Top 10 채널</ListSubTitle>
                      {responseStatus.data?.data.topChannelList.map((v) => (
                        <CustomList label={v.label} value={v.value} />
                      ))}
                    </VStack>
                  </ListBox>
                </Flex>
              </GridItem>
            </Grid>
          ) : (
            <Empty />
          )}
        </>
      )
  }, [responseStatus.isSuccess, responseStatus.data])

  const renderResponseList = useMemo(() => {
    if (responseList.isLoading) return <Loading />

    if (responseList.isSuccess)
      return (
        <Box mt={4}>
          <PageTitle text={'대응 이력 현황'} />
          {responseList.data.data.length > 0 ? (
            <ChartBox>
              <CustomTable
                loading={false}
                data={responseList.data?.data ? responseList.data?.data : []}
                columns={responseListColumns}
                maxHeight={400}
                detailIdx={'seqidx'}
              />
            </ChartBox>
          ) : (
            <Empty />
          )}
        </Box>
      )
  }, [responseList.isSuccess, responseList.data])

  return (
    <>
      {renderResponseStatus}
      {renderResponseList}
    </>
  )
}

export default DashBoardPage

const ListSubTitle = styled.p`
  padding: 0.3rem 0;
  ${({ theme }) => theme.typography.subtitle};
`

const ChartBox = styled(Box)`
  border: 1px solid ${({ theme }) => theme.color.gray200};
  border-radius: 4px;
  padding: 12px;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  gap: 1rem;
  justify-content: space-between;
  height: -webkit-fill-available;
`

const ListBox = styled(Box)`
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.color.gray200};
  padding: 0 12px 12px 12px;
`
const ChartWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  h3 {
    ${({ theme }) => theme.typography.subtitle};
    padding-left: 1rem;
  }
`
