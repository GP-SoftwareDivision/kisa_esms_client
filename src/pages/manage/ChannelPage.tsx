import { useState } from 'react'
import styled from '@emotion/styled'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  ButtonContainer,
  ContentBox,
  ContentContainer,
  SelectContainer,
} from '@/assets/styles/global.ts'
import { Box } from '@chakra-ui/react'

import PageTitle from '@/components/elements/PageTitle.tsx'
import CustomTable from '@/components/charts/Table.tsx'
import CustomPagination from '@/components/elements/Pagination.tsx'
import { usePagination } from '@/hooks/common/usePagination.tsx'
import { useQueries } from '@/hooks/queries/useQueries.tsx'
import Button from '@/components/elements/Button.tsx'
import CustomInput from '@/components/elements/Input.tsx'
import queryToJson from '@/utils/queryToJson.ts'
import { useExcelDownload } from '@/hooks/common/useExcelDownload.tsx'
import dayjs from 'dayjs'

interface ServerType {
  ip: string
  count: number
  apitype: string
  lastcrawl: string
  servername: string
}

const ChannelPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const { page, setPage, handlePageChange } = usePagination(
    Number(queryParams.get('page')) || 1
  )
  const now = dayjs()
  const excelDownload = useExcelDownload()

  // 채널명
  const [channelName, setChannelName] = useState<string>(
    queryParams.get('channelName') || ''
  )

  const channelList = useQueries<{ data: ServerType[]; count: number }>({
    queryKey: `channelList`,
    method: 'POST',
    url: '/api/manage/channel/list',
    body: queryToJson(location.search),
  })

  // 검색 조회 이벤트
  const handleOnSearch = () => {
    setPage(1)
    const params = new URLSearchParams({
      page: page.toString(),
      channelName: channelName,
    }).toString()
    navigate(`?${params}`)
  }

  const DomainColumns = [
    {
      header: '사이트(도메인)',
      accessorKey: 'domain',
    },
    {
      header: '최초 수집일',
      accessorKey: 'firstcrawl',
    },
    {
      header: '최근 수집일',
      accessorKey: 'lastcrawl',
    },
    {
      header: '구분',
      accessorKey: 'channelType',
      cell: ({ row }: any) =>
        row.original?.channelType === 'DT' ? (
          <span>다크웹</span>
        ) : row.original?.channelType === 'TT' ? (
          <span>텔레그램</span>
        ) : (
          ''
        ),
    },
    {
      header: '채널명',
      accessorKey: 'channelName',
    },
    {
      header: '해커그룹(특정시)',
      accessorKey: 'hackGroup',
    },
    {
      header: '비고',
      accessorKey: 'comment',
    },
  ]

  return (
    <ContentContainer>
      <PageTitle
        text={'수집 채널 관리'}
        children={
          <Button
            type={'secondary'}
            onClick={() =>
              excelDownload.mutate({
                endpoint: '/channel',
                params: { channelName: channelName },
                fileName: `수집채널관리_${now.format('YYYY-MM-DD HH:mm:ss')}`,
              })
            }
            text={'엑셀 다운로드'}
          />
        }
      />
      <SelectContainer columns={[1, 2]}>
        <StyledBox>
          <CustomInput
            id={'channel'}
            label={'채널명'}
            placeholder={'내용을 입력하세요.'}
            value={channelName}
            onChange={(e) => setChannelName(e.target.value)}
          />
        </StyledBox>
        <ButtonContainer>
          <Button type={'primary'} onClick={handleOnSearch} text={'조회'} />
        </ButtonContainer>
      </SelectContainer>
      <ContentBox>
        {channelList.isSuccess && (
          <>
            <CustomTable
              loading={channelList.isLoading}
              data={channelList.data.data}
              columns={DomainColumns}
            />
            <CustomPagination
              total={channelList.data.count}
              page={page}
              handlePageChange={(newPage) => {
                handlePageChange(newPage as number)
                queryParams.set('page', newPage.toString())
                navigate(`?${queryParams.toString()}`)
              }}
            />
          </>
        )}
      </ContentBox>
    </ContentContainer>
  )
}
export default ChannelPage

const StyledBox = styled(Box)`
  input {
    max-width: 15rem;
  }
`
