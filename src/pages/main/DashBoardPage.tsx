import dayjs from 'dayjs'
import styled from '@emotion/styled'
import { Box, Grid, GridItem, Flex, VStack } from '@chakra-ui/react'

import PageTitle from '@/components/elements/PageTitle.tsx'
import Bar from '@/components/charts/Bar.tsx'
import Pie from '@/components/charts/Pie.tsx'
import CustomTable from '@/components/charts/Table.tsx'
import CustomList from '@/components/charts/List.tsx'
import { hackingListColumns } from '@/constants/tableColumns.ts'
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
  // 모니터링 데이터 조회 API
  const hackingList = useQueries<{ data: HackingListType[] }>({
    queryKey: `hackingList`,
    method: 'POST',
    url: `/api/main/hacking/status`,
    body: {
      page: 1,
    },
  })

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
                <h3>유출 사고 유형</h3>
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
            <PageTitle text={'금주 이슈 내역'} />
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
                <ListSubTitle>Top 10 수집 채널</ListSubTitle>
                <CustomList label={'t.me/Dark_Telegram1'} value={'1390'} />
                <CustomList label={'t.me/piarc_new'} value={'998'} />
                <CustomList label={'t.me/tgkpzq'} value={'464'} />
                <CustomList label={'t.me/Neverbroke43'} value={'234'} />
                <CustomList label={'t.me/instaprolikecomment5'} value={'129'} />
                <CustomList label={'cracked.io'} value={'108'} />
                <CustomList label={'www.nulled.to'} value={'99'} />
                <CustomList label={'t.me/bwallagang'} value={'80'} />
                <CustomList label={'breachforums'} value={'50'} />
                <CustomList label={'awuohcqkwnaohnc.onion'} value={'45'} />
                <CustomList label={'t.me/SELLERS_EMPIRE'} value={'30'} />
              </VStack>
            </ListBox>
          </Flex>
        </GridItem>
      </Grid>
      <Box mt={4}>
        <PageTitle text={'대응 이력 현황'} />
        <ChartBox>
          {hackingList.isLoading ? (
            <Loading />
          ) : (
            <CustomTable
              loading={false}
              data={hackingList.data?.data ? hackingList.data?.data : []}
              columns={hackingListColumns}
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
  }
`
