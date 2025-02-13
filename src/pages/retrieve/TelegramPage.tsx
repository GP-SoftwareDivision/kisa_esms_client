import React, { Dispatch, SetStateAction, useMemo, useState } from 'react'
import { Box, HStack, SimpleGrid } from '@chakra-ui/react'
import { Stack } from '@chakra-ui/react'
import { Checkbox } from '@/components/ui/checkbox'
import styled from '@emotion/styled'
import dayjs from 'dayjs'

import {
  ButtonContainer,
  ContentContainer,
  SelectContainer,
} from '@/assets/styles/global.ts'
import PageTitle from '@/components/elements/PageTitle.tsx'
import CustomDatePicker from '@/components/elements/DatePicker.tsx'
import CustomSelect from '@/components/elements/Select.tsx'
import CustomInput from '@/components/elements/Input.tsx'
import Button from '@/components/elements/Button.tsx'
import { usePagination } from '@/hooks/common/usePagination.tsx'
import CustomPagination from '@/components/elements/Pagination.tsx'
import TelegramCard from '@/components/templates/TelegramCard.tsx'
import CustomAccordion from '@/components/elements/Accordion.tsx'
import { hackingOptions, responseOptions } from '@/data/selectOptions.ts'
import { useQueries } from '@/hooks/queries/useQueries.tsx'
import { useLocation, useNavigate } from 'react-router-dom'
import Empty from '@/components/elements/Empty.tsx'
import { Loading } from '@/components/elements/Loading.tsx'
import { useSearchSaveMutation } from '@/hooks/mutations/useSearchSaveMutation.tsx'
import CustomModal from '@/components/elements/Modal.tsx'
import CustomButton from '@/components/elements/Button.tsx'
import { useForm } from '@/hooks/common/useForm.tsx'
import { notifyError } from '@/utils/notify.ts'
import queryToJson from '@/utils/queryToJson.ts'
import { useExcelDownload } from '@/hooks/common/useExcelDownload.tsx'
import {
  NativeSelectField,
  NativeSelectRoot,
} from '@/components/ui/native-select.tsx'
import { InputGroup } from '@/components/ui/input-group.tsx'

export interface ttListType {
  channelurl: string
  contents: string
  contents2: string
  trancontents: string
  trancontents2: string
  responseflag: string
  keyword: string
  seqidx: number
  title: string
  threatflag: string
  threatlog: string
  username: string
  writetimes: string
  regdate: string
}

const RenderLogicalSelect = (props: {
  value: string
  setValue: Dispatch<SetStateAction<any>>
}) => (
  <NativeSelectRoot size='xs' variant='plain' width='auto' me='-1'>
    <NativeSelectField
      fontSize='xs'
      value={props.value}
      onChange={(e) => props.setValue(e.currentTarget.value)}
    >
      <option value='&&'>AND</option>
      <option value='!'>NOT</option>
    </NativeSelectField>
  </NativeSelectRoot>
)

const Telegram = () => {
  const now = dayjs()
  const navigate = useNavigate()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const { fields, handleOnChange, handleOnCleanForm } = useForm()
  const { excelDownload, excelDownloadLoading } = useExcelDownload()

  // 조회 조건 저장
  const {
    SaveSearch,
    handleOnAddSearch,
    handleOnAddSearchCancel,
    insertSearchOpen,
  } = useSearchSaveMutation()

  const { page, setPage, handlePageChange } = usePagination(
    Number(queryParams.get('page'))
  )

  // 검색 조건 불러오기
  const [savedSearchCondition, setSavedSearchCondition] = useState<string>('')

  // 조회기간
  const [date, setDate] = useState({
    startdate: queryParams.get('startdate') || '',
    enddate: queryParams.get('enddate') || '',
  })

  // 해킹 여부
  const [threatflag, setThreatFlag] = useState<string>(
    queryParams.get('threatflag') || ''
  )

  // 대응 여부
  const [responseflag, setResponseFlag] = useState<string>(
    queryParams.get('responseflag') || ''
  )

  // 작성자
  const [writer, setWriter] = useState<string>(queryParams.get('writer') || '')

  // 대화방
  const [channel, setChannel] = useState<string>(
    queryParams.get('channel') || ''
  )

  // 내용
  const [contents, setContents] = useState<string>(
    queryParams.get('contents') || ''
  )

  // 재검색 내용
  const [reContents, setReContents] = useState<string>(
    queryParams.get('re_contents')?.split(':')[1] || ''
  )

  // 재검색 내용 논리연산자
  const [reContentsLogic, setReContentsLogic] = useState<string>(
    queryParams.get('re_contents')?.split(':')[0] || '&&'
  )

  // 재검색 대화방
  const [reChannel, setReChannel] = useState<string>(
    queryParams.get('re_channel')?.split(':')[1] || ''
  )

  // 재검색 대화방 논리연산자
  const [reChannelLogic, setReChannelLogic] = useState<string>(
    queryParams.get('re_channel')?.split(':')[0] || '&&'
  )

  // 재검색 작성자
  const [reUsername, setReUsername] = useState<string>(
    queryParams.get('re_username')?.split(':')[1] || ''
  )

  // 재검색 작성자 논리연산자
  const [reUsernameLogic, setReUsernameLogic] = useState<string>(
    queryParams.get('re_username')?.split(':')[0] || '&&'
  )

  // 정규표현식
  const [regex, setRegex] = useState<string>(queryParams.get('regex') || '')

  // 결과 내 재검색
  const [isReSearch, setIsReSearch] = useState<boolean>(
    queryParams.get('re_contents') !== '&&:' ||
      queryParams.get('re_channel') !== '&&:' ||
      queryParams.get('re_username') !== '&&:'
  )

  // 텔레그램 데이터 조회 API
  const ttList = useQueries<{ data: ttListType[]; count: number }>({
    queryKey: `ttList`,
    method: 'GET',
    url: `/api/monitoring/ttList${location.search}`,
  })

  // 검색조건 불러오기
  const searchHistory = useQueries<{
    data: { searchlog: string; title: string }[]
    message: string
  }>({
    queryKey: 'searchHistoryList',
    method: 'POST',
    url: '/api/manage/search/history/data',
    body: {
      type: 'TT',
    },
  })

  // 불러오기 후 적용 클릭 이벤트
  const handleOnApplySavedCondition = () => {
    if (savedSearchCondition) {
      const jsonSavedData = queryToJson(savedSearchCondition)
      setDate({
        startdate: jsonSavedData.startdate as string,
        enddate: jsonSavedData.enddate as string,
      })
      setThreatFlag(jsonSavedData.threatflag as string)
      setResponseFlag(jsonSavedData.responseflag as string)
      setWriter(jsonSavedData.writer as string)
      setChannel(jsonSavedData.channel as string)
      setContents(jsonSavedData.contents as string)
      setReContents(jsonSavedData.re_contents as string)
      setReChannel(jsonSavedData.re_channel as string)
      setReUsername(jsonSavedData.re_username as string)
      setRegex(jsonSavedData.regex as string)

      setIsReSearch(
        jsonSavedData.re_contents !== '' ||
          jsonSavedData.re_channel !== '' ||
          jsonSavedData.re_username !== ''
      )
    }
  }

  // 검색 조건 적용 후 파라미터 변경
  const handleOnSearch = () => {
    setPage(1)
    const resetContents = !isReSearch ? '' : reContents
    const resetContentsLogic = !isReSearch ? '&&' : reContentsLogic
    const resetChannel = !isReSearch ? '' : reChannel
    const resetChannelLogic = !isReSearch ? '&&' : reChannelLogic
    const resetUsername = !isReSearch ? '' : reUsername
    const resetUsernameLogic = !isReSearch ? '&&' : reUsernameLogic

    const params = new URLSearchParams({
      startdate: date.startdate,
      enddate: date.enddate,
      threatflag,
      username: writer,
      channel,
      regex,
      contents,
      responseflag,
      page: '1',
      re_contents: `${resetContentsLogic}:${resetContents}`,
      re_channel: `${resetChannelLogic}:${resetChannel}`,
      re_username: `${resetUsernameLogic}:${resetUsername}`,
    }).toString()
    navigate(`?${params}`)
  }

  // 조회조건 저장
  const handleOnAddSearchAction = () => {
    if (!fields.searchName) {
      notifyError('저장명을 입력해주세요')
      return
    }

    SaveSearch.mutate({
      type: 'TT',
      searchlog: new URLSearchParams({
        startdate: date.startdate,
        enddate: date.enddate,
        threatflag,
        username: writer,
        channel,
        contents,
        responseflag,
        page: '1',
        regex,
        re_contents: `${reContentsLogic}:${reContents}`,
        re_channel: `${reChannelLogic}:${reChannel}`,
        re_username: `${reUsernameLogic}:${reUsername}`,
      }).toString(),
      title: fields.searchName,
    })

    handleOnCleanForm()
    handleOnAddSearchCancel()
  }

  // 로딩 중 경우 | 데이터 없는 경우 | 데이터 렌더링 경우 처리
  const renderTelegramList = useMemo(() => {
    if (ttList.isLoading || excelDownloadLoading) return <Loading />
    if (!ttList.data || ttList.data.count === 0) {
      return <Empty />
    }
    if (ttList.isSuccess && ttList.data.count > 0)
      return (
        <>
          <Stack margin={'1rem 0'}>
            {ttList.data.data?.map((v: ttListType) => (
              <TelegramCard
                key={v.seqidx}
                channelurl={v.channelurl}
                contents={v.contents + v.contents2}
                trancontents={
                  v.trancontents ? v.trancontents + v.trancontents2 : ''
                }
                responseflag={v.responseflag}
                keyword={v.keyword}
                seqidx={v.seqidx}
                threatflag={v.threatflag}
                threatlog={v.threatlog}
                username={v.username}
                title={v.title}
                writetimes={v.writetimes}
                regdate={v.regdate}
                onClick={() => navigate(`detail?id=${v.seqidx}`)}
              />
            ))}
            <CustomPagination
              total={ttList.data.count || 1}
              page={page}
              handlePageChange={(newPage) => {
                handlePageChange(newPage as number)
                queryParams.set('page', newPage.toString())
                navigate(`?${queryParams.toString()}`)
              }}
            />
          </Stack>
        </>
      )
  }, [page, handlePageChange, navigate, ttList.data, excelDownloadLoading])

  return (
    <ContentContainer>
      <PageTitle
        text={'텔레그램 데이터'}
        children={
          <Button
            type={'secondary'}
            onClick={() =>
              excelDownload.mutate({
                endpoint: '/telegram',
                params: location.search,
                fileName: `텔레그램_${now.format('YYYY-MM-DD HH:mm:ss')}.csv`,
              })
            }
            text={'엑셀 다운로드'}
          />
        }
      />
      <Stack position={'relative'}>
        <StyledLoad>
          <CustomSelect
            label={'불러오기'}
            value={
              searchHistory.data?.data.find(
                (history) => history.searchlog === location.search.split('?')[1]
              )?.searchlog || ''
            }
            options={
              searchHistory.isSuccess &&
              searchHistory.data?.message !== 'nodata'
                ? searchHistory.data?.data?.map((v) => ({
                    label: v.title,
                    value: v.searchlog,
                  }))
                : []
            }
            onChange={(item: { items: any; value: string[] }) =>
              setSavedSearchCondition(item.value.join(','))
            }
          />
          <Button
            type={savedSearchCondition ? 'primary' : 'ghost'}
            onClick={handleOnApplySavedCondition}
            text={'적용'}
          />
        </StyledLoad>
        <SelectContainer columns={[1, 2, 3, 4]}>
          <Box>
            <CustomDatePicker
              label={'작성기간'}
              date={date}
              setDate={setDate}
              disabled={isReSearch}
            />
          </Box>
          <Box>
            <CustomSelect
              label={'해킹 여부'}
              options={hackingOptions}
              value={threatflag}
              onChange={(item: { items: any; value: string[] }) =>
                setThreatFlag(item.value.join(','))
              }
              disabled={isReSearch}
            />
          </Box>
          <Box>
            <CustomSelect
              label={'대응 여부'}
              options={responseOptions}
              value={responseflag}
              onChange={(item: { items: any; value: string[] }) =>
                setResponseFlag(item.value.join(','))
              }
              disabled={isReSearch}
            />
          </Box>
          <Box>
            <CustomInput
              id={'writer'}
              label={'작성자'}
              placeholder={'내용을 입력하세요.'}
              value={writer}
              onChange={(e) => setWriter(e.target.value)}
              disabled={isReSearch}
            />
          </Box>
          <Box>
            <CustomInput
              id={'channel'}
              label={'대화방'}
              placeholder={'내용을 입력하세요.'}
              value={channel}
              onChange={(e) => setChannel(e.target.value)}
              disabled={isReSearch}
            />
          </Box>
          <Box>
            <CustomInput
              id={'content'}
              label={'내용'}
              placeholder={'내용을 입력하세요.'}
              value={contents}
              onChange={(e) => setContents(e.target.value)}
              disabled={isReSearch}
            />
          </Box>
          <Box>
            <CustomInput
              id={'regex'}
              label={'정규표현식'}
              placeholder={'내용을 입력하세요.'}
              value={regex}
              onChange={(e) => setRegex(e.target.value)}
              disabled={isReSearch}
            />
          </Box>
          <Box></Box>
          <Box></Box>
          <Box></Box>
          <Box></Box>
          <Box>
            <ButtonContainer>
              <Button type={'primary'} onClick={handleOnSearch} text={'조회'} />
              <Button
                type={'secondary'}
                onClick={handleOnAddSearch}
                text={'조회 조건 저장'}
              />
            </ButtonContainer>
          </Box>
        </SelectContainer>

        {/*결과 내 재검색 아코디언*/}
        <CustomAccordion
          collapsible={isReSearch ? 'isReSearch' : ''}
          id={'telegram'}
          trigger={
            <StyledCheckBox
              size={'sm'}
              checked={isReSearch}
              onCheckedChange={(e) => setIsReSearch(!!e.checked)}
            >
              결과 내 재검색
            </StyledCheckBox>
          }
          content={
            <AccordionContainer columns={[1, 2, 3, 4]}>
              <HStack gap='10' width='full'>
                <InputGroup
                  flex='1'
                  endElement={
                    <RenderLogicalSelect
                      value={reUsernameLogic}
                      setValue={setReUsernameLogic}
                    />
                  }
                >
                  <CustomInput
                    id={'writer'}
                    label={'작성자'}
                    placeholder={'내용을 입력하세요.'}
                    value={reUsername}
                    onChange={(e) => setReUsername(e.target.value)}
                    tooltip={`여러 값을 입력하려면 쉼표( , )로 구분하세요.`}
                  />
                </InputGroup>
              </HStack>

              <HStack gap='10' width='full'>
                <InputGroup
                  flex='1'
                  endElement={
                    <RenderLogicalSelect
                      value={reChannelLogic}
                      setValue={setReChannelLogic}
                    />
                  }
                >
                  <CustomInput
                    id={'channel'}
                    label={'대화방'}
                    placeholder={'내용을 입력하세요.'}
                    value={reChannel}
                    onChange={(e) => setReChannel(e.target.value)}
                    tooltip={`여러 값을 입력하려면 쉼표( , )로 구분하세요.`}
                  />
                </InputGroup>
              </HStack>
              <HStack gap='10' width='full'>
                <InputGroup
                  flex='1'
                  endElement={
                    <RenderLogicalSelect
                      value={reContentsLogic}
                      setValue={setReContentsLogic}
                    />
                  }
                >
                  <CustomInput
                    id={'content'}
                    label={'내용'}
                    placeholder={'내용을 입력하세요.'}
                    value={reContents}
                    onChange={(e) => setReContents(e.target.value)}
                    tooltip={`여러 값을 입력하려면 쉼표( , )로 구분하세요.`}
                  />
                </InputGroup>
              </HStack>
              <Box display={'flex'} justifyContent={'flex-end'}>
                <Button
                  type={'primary'}
                  onClick={handleOnSearch}
                  text={'재검색'}
                />
              </Box>
            </AccordionContainer>
          }
        />
      </Stack>
      {renderTelegramList}
      <CustomModal
        isOpen={insertSearchOpen}
        title='조회 조건 저장'
        onCancel={handleOnAddSearchCancel}
        content={
          <ModalContents>
            <CustomInput
              id='searchName'
              value={fields.searchName}
              label='저장명'
              placeholder={'조회 조건 저장명을 입력하세요.'}
              onChange={handleOnChange}
              required
            />
            <ButtonWrapper>
              <CustomButton
                type='outline'
                text='취소'
                onClick={handleOnAddSearchCancel}
              />
              <CustomButton
                type='primary'
                text='저장'
                onClick={handleOnAddSearchAction}
              />
            </ButtonWrapper>
          </ModalContents>
        }
      />
    </ContentContainer>
  )
}
export default React.memo(Telegram)

const StyledLoad = styled.div`
  display: flex;
  gap: 0.5rem;

  button {
    min-width: 120px;
  }
`
const StyledCheckBox = styled(Checkbox)`
  position: absolute;
  right: 265px;

  @media (max-width: 576px) {
    top: 450px;
  }

  @media (min-width: 577px) and (max-width: 767px) {
    top: 265px;
  }

  @media (min-width: 768px) and (max-width: 991px) {
    top: 202px;
    right: 260px;
  }

  @media (min-width: 992px) {
    top: 155px;
  }

  svg {
    display: block;
  }

  span {
    ${({ theme }) => theme.typography.body2};
  }
`

const AccordionContainer = styled(SimpleGrid)`
  gap: 16px;
  background: #f6f6f6;
  padding: 0.5rem;
  align-items: center;

  button {
    width: 120px;
    height: 30px;
  }
`

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`

const ModalContents = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`
