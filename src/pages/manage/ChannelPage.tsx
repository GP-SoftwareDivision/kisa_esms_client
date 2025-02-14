import { useState } from 'react'
import styled from '@emotion/styled'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  ButtonContainer,
  ContentBox,
  ContentContainer,
  SelectContainer,
} from '@/assets/styles/global.ts'
import { Box, Flex } from '@chakra-ui/react'
import dayjs from 'dayjs'

import PageTitle from '@/components/elements/PageTitle.tsx'
import CustomTable from '@/components/charts/Table.tsx'
import CustomPagination from '@/components/elements/Pagination.tsx'
import { usePagination } from '@/hooks/common/usePagination.tsx'
import { useQueries } from '@/hooks/queries/useQueries.tsx'
import Button from '@/components/elements/Button.tsx'
import CustomInput from '@/components/elements/Input.tsx'
import queryToJson from '@/utils/queryToJson.ts'
import { useExcelDownload } from '@/hooks/common/useExcelDownload.tsx'
import CustomModal from '@/components/elements/Modal.tsx'
import CustomButton from '@/components/elements/Button.tsx'
import {
  ChannelRowType,
  useChannelUpdateMutation,
} from '@/hooks/mutations/useChaanelUpdateMutation.tsx'

const ChannelPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const { page, handlePageChange } = usePagination(
    Number(queryParams.get('page')) || 1
  )
  const now = dayjs()
  const { excelDownload } = useExcelDownload()

  // 채널 관리 수정 훅
  const {
    updateChannel,
    openUpdateChannel,
    closeUpdateChannel,
    updateChannelOpen,
    updateData,
    setUpdateData,
    handleOnUpdateText,
  } = useChannelUpdateMutation()

  // 채널명
  const [domain, setDomain] = useState<string>(queryParams.get('domain') || '')

  const channelList = useQueries<{ data: ChannelRowType[]; count: number }>({
    queryKey: `channelList`,
    method: 'POST',
    url: '/api/manage/channel/list',
    body: queryToJson(location.search),
  })

  // 검색 조회 이벤트
  const handleOnSearch = () => {
    const params = new URLSearchParams({
      page: '1',
      domain: domain,
    }).toString()
    navigate(`?${params}`)
  }

  // 채널 수정 취소 액션
  const handleOnCancelAction = () => {
    closeUpdateChannel()
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
      // cell: ({ row }: any) =>
      //   row.original?.channelType === 'DT' ? (
      //     <span>다크웹</span>
      //   ) : row.original?.channelType === 'TT' ? (
      //     <span>텔레그램</span>
      //   ) : (
      //     ''
      //   ),
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
    {
      header: '',
      accessorKey: '수정',
      id: 'update',
      cell: ({ row }: any) => (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            type={'secondary'}
            text={'수정'}
            onClick={() => {
              openUpdateChannel()
              setUpdateData(row.original)
            }}
          />
        </div>
      ),
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
                params: location.search,
                fileName: `수집채널관리_${now.format('YYYY-MM-DD HH:mm:ss')}.xlsx`,
              })
            }
            text={'엑셀 다운로드'}
          />
        }
      />
      <SelectContainer columns={[1, 2]}>
        <StyledBox>
          <CustomInput
            id={'domain'}
            label={'사이트(도메인)'}
            placeholder={'내용을 입력하세요.'}
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
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

      {/*수집 채널 관리 수정 모달*/}
      <CustomModal
        isOpen={updateChannelOpen}
        title='수집 채널 수정'
        onCancel={closeUpdateChannel}
        content={
          <ModalContents>
            <Flex direction='column' gap={4} padding={4}>
              <CustomInput
                id='channelType'
                value={updateData.channelType || ''}
                label='채널구분'
                placeholder={'내용을 입력하세요.'}
                onChange={handleOnUpdateText}
              />
              <CustomInput
                id='channelName'
                value={updateData.channelName || ''}
                label='채널명'
                placeholder={'내용을 입력하세요.'}
                onChange={handleOnUpdateText}
              />
              <CustomInput
                id='hackGroup'
                value={updateData.hackGroup || ''}
                label='해커그룹'
                placeholder={'내용을 입력하세요.'}
                onChange={handleOnUpdateText}
              />
              <CustomInput
                id='comment'
                value={updateData.comment || ''}
                label='비고'
                placeholder={'내용을 입력하세요.'}
                onChange={handleOnUpdateText}
              />
            </Flex>
            <ButtonWrapper>
              <CustomButton
                type='outline'
                text='취소'
                onClick={handleOnCancelAction}
              />
              <CustomButton
                type='primary'
                text='수정'
                onClick={updateChannel.mutate}
              />
            </ButtonWrapper>
          </ModalContents>
        }
      />
    </ContentContainer>
  )
}
export default ChannelPage

const StyledBox = styled(Box)`
  input {
    max-width: 15rem;
  }
`
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 0.5rem;
  gap: 10px;
`

const ModalContents = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`
