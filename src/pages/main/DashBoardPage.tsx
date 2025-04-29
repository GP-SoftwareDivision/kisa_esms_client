import { useState } from 'react'
import dayjs, { type Dayjs } from 'dayjs'
import styled from '@emotion/styled'
import { Box, Grid, GridItem, Flex, VStack } from '@chakra-ui/react'
import ConfigProvider from 'antd/es/config-provider'
import DatePicker, { type RangePickerProps } from 'antd/es/date-picker'
import ko_KR from 'antd/es/locale/ko_KR'
import 'dayjs/locale/ko'

import PageTitle from '@/components/elements/PageTitle.tsx'
import Bar from '@/components/charts/Bar.tsx'
import Pie from '@/components/charts/Pie.tsx'
import CustomTable from '@/components/charts/Table.tsx'
import CustomList from '@/components/charts/List.tsx'
import { targetIncludeIndOptions } from '@/data/selectOptions.ts'
import { useQueries } from '@/hooks/queries/useQueries.tsx'
import Button from '@/components/elements/Button.tsx'
import { CustomSkeleton } from '@/components/elements/Skeleton.tsx'
import Empty from '@/components/elements/Empty.tsx'
const { RangePicker } = DatePicker

const ListSubTitle = styled.p`
  padding: 0.3rem 0;
  ${({ theme }) => theme.typography.subtitle};
`

const ChartBox = styled(Box)`
  border: 1px solid ${({ theme }) => theme.color.gray200};
  border-radius: 4px;
  padding: 12px;
  //display: flex;
  //flex-wrap: wrap;
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
  gap: 1rem;
  justify-content: space-between;
  height: -webkit-fill-available;
`

const ListBox = styled(Box)`
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.color.gray200};
  padding: 0 12px 12px 12px;
  height: -webkit-fill-available;
`
const ChartWrapper = styled.div`
  //width: 45%;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  h3 {
    ${({ theme }) => theme.typography.subtitle};
    padding-left: 1rem;
  }
`

const StyledCalendarButton = styled.div`
  display: flex;
  padding: 0.5rem 0;
  justify-content: flex-end;
`
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
interface ResponseAll {
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
  bar: { label: string; value: number }[]
}

interface ResponseTop10 {
  topChannelList: { label: string; value: number }[]
}

const DashBoardPage = () => {
  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false)
  const dummySkeletons = [...Array(10)]

  // 조회기간 (화면상)
  const [date, setDate] = useState({
    startdate: dayjs().startOf('year').format('YYYY-MM-DD'),
    enddate: dayjs().format('YYYY-MM-DD'),
  })

  // 조회기간 (API REQUEST)
  const [reqDate, setReqDate] = useState({
    startdate: dayjs().startOf('year').format('YYYY-MM-DD'),
    enddate: dayjs().format('YYYY-MM-DD'),
  })

  // 바 차트, 파이 차트 대응 건수
  const getResponseAll = useQueries<{ data: ResponseAll }>({
    queryKey: `responseAll`,
    method: 'POST',
    url: `/api/main/dashboard/all`,
    body: reqDate,
  })

  // 대응 이력 현황 데이터 조회 API
  const getResponseList = useQueries<{ data: ResponseListType[] }>({
    queryKey: `responseList`,
    method: 'POST',
    url: `/api/issue/history`,
    body: {
      type: 'M',
      page: 1,
      startdate: reqDate.startdate,
      enddate: reqDate.enddate,
      institution: '',
      channelName: '',
      targetType: '',
      incidentType: '',
      keyword: '',
      apiType: '',
      originType: '',
    },
  })

  const getResponseTop10 = useQueries<{ data: ResponseTop10 }>({
    queryKey: `responseTop10`,
    method: 'POST',
    url: `/api/main/dashboard/top10`,
    body: reqDate,
    enabled: getResponseAll.isSuccess,
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
        const matching = targetIncludeIndOptions
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
    {
      header: '키워드',
      accessorKey: 'keyword',
    },
  ]

  const rangePresets: RangePickerProps['presets'] = [
    { label: '최근 7일', value: [dayjs().add(-7, 'd'), dayjs()] },
    { label: '최근 30일', value: [dayjs().add(-30, 'd'), dayjs()] },
    { label: '최근 90일', value: [dayjs().add(-90, 'd'), dayjs()] },
  ]

  // 기간 선택 체인지 핸들러
  const onRangeChange = (
    dates: null | (Dayjs | null)[],
    dateStrings: string[]
  ) => {
    if (dates) {
      setDate({ startdate: dateStrings[0], enddate: dateStrings[1] })
    }
  }

  // 오늘 이후 선택 못하게
  const disabledDate: RangePickerProps['disabledDate'] = (current) => {
    return current && current > dayjs().endOf('day')
  }

  return (
    <>
      <Grid templateColumns={{ base: '1fr', md: '3fr 1fr' }} gap={4}>
        <GridItem>
          <Flex direction='column' height='100%'>
            <PageTitle
              text={'대응현황'}
              children={
                <div>
                  <ConfigProvider locale={ko_KR}>
                    <RangePicker
                      presets={rangePresets}
                      onChange={onRangeChange}
                      disabledDate={disabledDate}
                      value={
                        date
                          ? [dayjs(date.startdate), dayjs(date.enddate)]
                          : [dayjs().subtract(7, 'd'), dayjs()]
                      }
                      renderExtraFooter={() => (
                        <StyledCalendarButton>
                          <Button
                            type='primary'
                            text='적용'
                            onClick={() => {
                              setReqDate(date)
                              setIsCalendarOpen(false)
                            }} // 🔹 버튼을 눌러야 닫힘
                          />
                        </StyledCalendarButton>
                      )}
                      open={isCalendarOpen}
                      onOpenChange={() => setIsCalendarOpen(true)}
                    />
                  </ConfigProvider>
                </div>
              }
            />
            <ChartBox>
              <ChartWrapper>
                <h3>사고 유형</h3>
                <Bar
                  series={getResponseAll.data?.data.bar?.map((v) => v.value)}
                  categories={getResponseAll.data?.data.bar?.map(
                    (v) => v.label
                  )}
                  loading={getResponseAll.isLoading}
                />
              </ChartWrapper>
              <ChartWrapper>
                <h3>대응 현황</h3>
                <Pie
                  series={getResponseAll.data?.data.pie?.map((v) => v.value)}
                  categories={getResponseAll.data?.data.pie?.map(
                    (v) => v.label
                  )}
                  loading={getResponseAll.isLoading}
                />
              </ChartWrapper>
            </ChartBox>
          </Flex>
        </GridItem>
        <GridItem>
          <Flex direction='column' height='100%' paddingTop={'0.5rem'}>
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
                  value={getResponseAll.data?.data.list.darkweb?.hacking || 0}
                  loading={getResponseAll.isLoading}
                />
                <CustomList
                  label={'텔레그램 해킹 판단 건수'}
                  value={getResponseAll.data?.data.list.telegram?.hacking || 0}
                  loading={getResponseAll.isLoading}
                />
                <CustomList
                  label={'다크웹 대응 건수'}
                  value={getResponseAll.data?.data.list.darkweb?.response || 0}
                  loading={getResponseAll.isLoading}
                />
                <CustomList
                  label={'텔레그램 대응 건수'}
                  value={getResponseAll.data?.data.list.telegram?.response || 0}
                  loading={getResponseAll.isLoading}
                />
                <ListSubTitle>Top 10 채널</ListSubTitle>
                {getResponseTop10.isSuccess
                  ? getResponseTop10.data?.data?.topChannelList?.map(
                      (v, index) => (
                        <CustomList
                          key={index}
                          label={v.label}
                          value={v.value}
                        />
                      )
                    )
                  : dummySkeletons.map((index) => (
                      <CustomSkeleton key={index} lines={1} height={5} />
                    ))}
                {getResponseTop10.data?.data.topChannelList.length === 0 && (
                  <Empty />
                )}
              </VStack>
            </ListBox>
          </Flex>
        </GridItem>
      </Grid>
      <Box mt={4}>
        <PageTitle text={'대응 이력 현황'} />
        <CustomTable
          loading={getResponseList.isLoading}
          data={getResponseList.data?.data ? getResponseList.data?.data : []}
          columns={responseListColumns}
          maxHeight={400}
          detailIdx={'seqidx'}
        />
      </Box>
    </>
  )
}

export default DashBoardPage
