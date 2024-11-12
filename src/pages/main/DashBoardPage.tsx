import dayjs from 'dayjs'
import styled from '@emotion/styled'
import { Box, Grid, GridItem, Flex, VStack } from '@chakra-ui/react'

import data from '@/data/dashboard.json'
import PageTitle from '@/components/elements/PageTitle.tsx'
import Bar from '@/components/charts/Bar.tsx'
import Pie from '@/components/charts/Pie.tsx'
import CustomTable from '@/components/charts/Table.tsx'
import CustomList from '@/components/charts/List.tsx'
import { dashBoardColumns } from '@/constants/tableColumns.ts'
import { usePagination } from '@/hooks/usePagination.tsx'
import CustomPagination from '@/components/elements/Pagination.tsx'

const MainPage = () => {
  const today = dayjs()
  const oneWeekAgo = today.subtract(1, 'month').format('YYYY-MM-DD')
  const { page, handlePageChange } = usePagination()

  return (
    <>
      <Grid templateColumns={{ base: '1fr', md: '3fr 1fr' }} gap={4}>
        <GridItem>
          <Flex direction='column' height='100%'>
            <PageTitle
              text={'이슈 모니터링'}
              children={
                <TitleCaption>
                  {oneWeekAgo} ~ {today.format('YYYY-MM-DD')}
                </TitleCaption>
              }
            />
            <Grid
              templateColumns={{ base: '1fr', md: '1fr 1fr' }}
              gap={4}
              border='1px solid'
              borderColor='gray.100'
              borderRadius='4px'
              p={4}
              flex={1}
            >
              <GridItem>
                <Bar />
              </GridItem>
              <GridItem>
                <Pie />
              </GridItem>
            </Grid>
          </Flex>
        </GridItem>
        <GridItem>
          <Flex direction='column' height='100%'>
            <PageTitle text={'금주 이슈 내역'} />
            <Box
              border='1px solid'
              borderColor='gray.100'
              borderRadius='4px'
              p={4}
            >
              <VStack align='stretch'>
                <Box>
                  <ListSubTitle>해킹 탐지 건수</ListSubTitle>
                  <CustomList label={'금일'} value={'1'} />
                  <CustomList label={'금주'} value={'10'} />
                  <CustomList label={'금월'} value={'30'} />
                  <ListSubTitle>대응 완료 건수</ListSubTitle>
                  <CustomList label={'금일'} value={'1'} />
                  <CustomList label={'금주'} value={'10'} />
                  <CustomList label={'금월'} value={'30'} />
                </Box>
              </VStack>
            </Box>
          </Flex>
        </GridItem>
      </Grid>
      <Box mt={4}>
        <PageTitle text={'해킹 데이터 현황'} />
        <Box border='1px solid' borderColor='gray.100' borderRadius='4px' p={4}>
          <CustomTable loading={false} data={data} columns={dashBoardColumns} />
          <CustomPagination
            total={1}
            page={page}
            handlePageChange={(newPage) => handlePageChange(newPage as number)}
          />
        </Box>
      </Box>
    </>
  )
}
export default MainPage

const ListSubTitle = styled.p`
  padding: 0.5em 0.3rem;
  ${({ theme }) => theme.typography.subtitle};
`
const TitleCaption = styled.span`
  ${({ theme }) => theme.typography.caption1};
`
