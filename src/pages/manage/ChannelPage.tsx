import { useState } from 'react'
import styled from '@emotion/styled'
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
import { DomainColumns } from '@/constants/tableColumns.ts'
import { usePagination } from '@/hooks/common/usePagination.tsx'
import { useQueries } from '@/hooks/queries/useQueries.tsx'
import Button from '@/components/elements/Button.tsx'
import CustomInput from '@/components/elements/Input.tsx'

interface ServerType {
  servername: string
  ip: string
  lastcrawl: string
  count: number
  apitype: string
}

const ChannelPage = () => {
  const { page, handlePageChange } = usePagination(1)
  const [channelName, setChannelName] = useState<string>('')
  const [request, setRequest] = useState<{
    page: number
    channelName: string
  }>({ page, channelName })

  const channelList = useQueries<{ data: ServerType[]; count: number }>({
    queryKey: `channelList`,
    method: 'POST',
    url: '/api/manage/channel/list',
    body: request,
  })

  const handleOnClick = () => {
    setRequest({ page, channelName })
  }

  return (
    <ContentContainer>
      <PageTitle
        text={'수집 채널 관리'}
        children={
          <Button
            type={'secondary'}
            onClick={handleOnClick}
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
          <Button type={'primary'} onClick={handleOnClick} text={'조회'} />
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
export default ChannelPage

const StyledBox = styled(Box)`
  input {
    max-width: 15rem;
  }
`
