import dayjs from 'dayjs'
import styled from '@emotion/styled'
import { Box, Grid, GridItem, Flex, VStack } from '@chakra-ui/react'

import PageTitle from '@/components/elements/PageTitle.tsx'
import Bar from '@/components/charts/Bar.tsx'
import Pie from '@/components/charts/Pie.tsx'
import CustomTable from '@/components/charts/Table.tsx'
import CustomList from '@/components/charts/List.tsx'
import { useQueries } from '@/hooks/queries/useQueries.tsx'
import { Loading } from '@/components/elements/Loading.tsx'

// 대응 이력 현황 타입 정의
interface HackingListType {
  seqidx: number
  regdate: string
  targettype: string
  hackedorganization: string
  incidenttype: string
  channeltype: string
  darktelegramname: string
  firstrecogition: string
}

const DashBoardPage = () => {
  const targetList = [
    // { value: '', label: '전체' },
    { value: 'ind', label: '개인' },
    { value: 'company', label: '기업' },
    { value: 'pub', label: '공공' },
    { value: 'edu', label: '교육' },
    { value: 'fin', label: '금융' },
    { value: 'med', label: '의료' },
    { value: 'other', label: '기타(해외)' },
  ]

  // 모니터링 데이터 조회 API
  const responseList = useQueries<{ data: HackingListType[] }>({
    queryKey: `responseList`,
    method: 'POST',
    url: `/api/issue/history`,
    body: {
      type: 'I',
      page: 1,
      startdate: dayjs().subtract(7, 'd').format('YYYY-MM-DD'),
      enddate: dayjs().format('YYYY-MM-DD'),
      institution: '',
      channelName: '',
      targetType: 'pub',
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
        const matching = targetList
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
      accessorKey: 'incidentId',
    },
    {
      header: '채널구분',
      accessorKey: 'domain',
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

  return (
    <>
      <Grid templateColumns={{ base: '1fr', md: '3fr 1fr' }} gap={4}>
        <GridItem>
          <Flex direction='column' height='100%'>
            <PageTitle
              text={'대응현황'}
              children={
                <TitleCaption>
                  {dayjs().subtract(7, 'd').format('YYYY-MM-DD')} ~{' '}
                  {dayjs().format('YYYY-MM-DD')}
                </TitleCaption>
              }
            />
            <ChartBox>
              <ChartWrapper>
                <h3>사고 유형</h3>
                <Bar />
              </ChartWrapper>
              <ChartWrapper>
                <h3>대응 현황</h3>
                <Pie />
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
                gap={'0.2rem'}
              >
                <ListSubTitle>데이터 수집</ListSubTitle>
                <CustomList label={'수집 건수'} value={'1'} />
                <CustomList label={'해킹 판단 건수'} value={'10'} />
                <CustomList label={'대응 건수'} value={'30'} />
                <ListSubTitle>Top 10 채널</ListSubTitle>
                <CustomList label={'t.me/Dark_Telegram1'} value={'190'} />
                <CustomList label={'t.me/piarc_new'} value={'98'} />
                <CustomList label={'t.me/tgkpzq'} value={'46'} />
                <CustomList label={'t.me/Neverbroke43'} value={'23'} />
                <CustomList label={'t.me/instaprolikecomment5'} value={'12'} />
                <CustomList label={'cracked.io'} value={'10'} />
                <CustomList label={'www.nulled.to'} value={'9'} />
                <CustomList label={'t.me/bwallagang'} value={'8'} />
                <CustomList label={'breachforums'} value={'5'} />
                <CustomList label={'awuohcqkwnaohnc.onion'} value={'4'} />
                <CustomList label={'t.me/SELLERS_EMPIRE'} value={'30'} />
              </VStack>
            </ListBox>
          </Flex>
        </GridItem>
      </Grid>
      <Box mt={4}>
        <PageTitle text={'대응 이력 현황'} />
        <ChartBox>
          {responseList.isLoading ? (
            <Loading />
          ) : (
            <CustomTable
              loading={false}
              data={responseList.data?.data ? responseList.data?.data : []}
              columns={responseListColumns}
              maxHeight={400}
            />
          )}
        </ChartBox>
      </Box>
    </>
  )
}
export default DashBoardPage

const ListSubTitle = styled.p`
  padding: 0.3rem 0;
  ${({ theme }) => theme.typography.subtitle};
`
const TitleCaption = styled.span`
  ${({ theme }) => theme.typography.caption1};
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
