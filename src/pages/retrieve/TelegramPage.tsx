import React, { useMemo, useState } from 'react'
import { Box, SimpleGrid } from '@chakra-ui/react'
import { Stack } from '@chakra-ui/react'
import { Checkbox } from '@/components/ui/checkbox'
import styled from '@emotion/styled'

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
import useOptions from '@/hooks/common/useOptions.tsx'
import { useQueries } from '@/hooks/queries/useQueries.tsx'
import { useLocation, useNavigate } from 'react-router-dom'
import Empty from '@/components/elements/Empty.tsx'
import { Loading } from '@/components/elements/Loading.tsx'

interface ttListType {
  channelurl: string
  contents: string
  contents2: string
  trancontents: string
  trancontents2: string
  responseflag: string
  keyword: string
  seqidx: number
  channel: string
  threatflag: string
  threatlog: string
  username: string
  writetime: string
}

const Telegram = () => {
  const navigate = useNavigate()

  const { page, setPage, handlePageChange } = usePagination()
  const { hackingOptions, responseOptions } = useOptions()

  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)

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

  // 텔레그램 데이터 조회 API
  const ttList = useQueries<{ data: ttListType[]; count: number }>({
    queryKey: `ttList`,
    method: 'GET',
    url: `/api/monitoring/ttList${location.search}&page=${page}`,
  })

  // 검색 조건 적용 후 파라미터 변경
  const handleOnSearch = () => {
    const params = new URLSearchParams({
      startdate: date.startdate,
      enddate: date.enddate,
      threatflag,
      username: writer,
      channel,
      contents,
      responseflag,
    }).toString()
    setPage(1)
    navigate(`?${params}`)
  }

  // 로딩 중 경우 | 데이터 없는 경우 | 데이터 렌더링 경우 처리
  const renderTelegramList = useMemo(() => {
    if (ttList.isLoading) return <Loading />
    if (ttList.isSuccess && ttList.data.count === 0)
      return (
        <EmptyBox>
          <Empty />
        </EmptyBox>
      )
    if (ttList.isSuccess && ttList.data.count > 0)
      return (
        <>
          <Stack margin={'1rem 0'}>
            {ttList.data.data?.map((v) => (
              <TelegramCard
                key={v.seqidx}
                channelurl={v.channelurl}
                contents={v.contents + v.contents2}
                trancontents={
                  v.trancontents ? v.trancontents + v.trancontents2 : ''
                }
                issueresponseflag={v.responseflag}
                keyword={v.keyword}
                seqidx={v.seqidx}
                threatflag={v.threatflag}
                threatlog={v.threatlog}
                username={v.username}
                channel={v.channel}
                writetime={v.writetime}
                onClick={() => navigate(`detail?id=${v.seqidx}`)}
              />
            ))}
            <CustomPagination
              total={ttList.data.count || 1}
              page={page}
              handlePageChange={(newPage) =>
                handlePageChange(newPage as number)
              }
            />
          </Stack>
        </>
      )
  }, [page, handlePageChange, navigate, ttList])

  const handleOnSelectChange = () => {}

  return (
    <ContentContainer>
      <PageTitle
        text={'텔레그램 데이터'}
        children={
          <Button
            type={'secondary'}
            onClick={handleOnSelectChange}
            text={'엑셀 다운로드'}
          />
        }
      />
      <Stack position={'relative'}>
        <StyledLoad>
          <CustomSelect
            label={'불러오기'}
            options={[{ value: '식', label: '식' }]}
          />
          <Button
            type={'primary'}
            onClick={handleOnSelectChange}
            text={'적용'}
          />
        </StyledLoad>
        <SelectContainer columns={[1, 2, 3, 4]}>
          <Box>
            <CustomDatePicker
              label={'조회 기간'}
              date={date}
              setDate={setDate}
            />
          </Box>
          <Box>
            <CustomSelect
              label={'해킹 여부'}
              options={hackingOptions}
              value={threatflag}
              setState={setThreatFlag}
            />
          </Box>
          <Box>
            <CustomSelect
              label={'대응 여부'}
              options={responseOptions}
              value={responseflag}
              setState={setResponseFlag}
            />
          </Box>
          <Box>
            <CustomInput
              id={'writer'}
              label={'작성자'}
              placeholder={'내용을 입력하세요.'}
              value={writer}
              onChange={(e) => setWriter(e.target.value)}
            />
          </Box>
          <Box>
            <CustomInput
              id={'channel'}
              label={'대화방'}
              placeholder={'내용을 입력하세요.'}
              value={channel}
              onChange={(e) => setChannel(e.target.value)}
            />
          </Box>
          <Box>
            <CustomInput
              id={'content'}
              label={'내용'}
              placeholder={'내용을 입력하세요.'}
              value={contents}
              onChange={(e) => setContents(e.target.value)}
            />
          </Box>
          <Box></Box>
          <Box></Box>
          <Box>
            <CustomSelect
              label={'정규표현식'}
              options={responseOptions}
              value={responseflag}
              setState={setResponseFlag}
            />
          </Box>
          <Box></Box>
          <Box></Box>
          <Box>
            <ButtonContainer>
              <Button type={'primary'} onClick={handleOnSearch} text={'조회'} />
              <Button
                type={'secondary'}
                onClick={handleOnSelectChange}
                text={'조회 조건 저장'}
              />
            </ButtonContainer>
          </Box>
        </SelectContainer>

        {/*결과 내 재검색 아코디언*/}
        <CustomAccordion
          id={'telegram'}
          trigger={<StyledCheckBox size={'sm'}>결과 내 재검색</StyledCheckBox>}
          content={
            <AccordionContainer columns={[1, 2, 3, 4]}>
              <Box>
                <CustomInput
                  id={'writer'}
                  label={'작성자'}
                  placeholder={'내용을 입력하세요.'}
                  value={writer}
                  onChange={(e) => setWriter(e.target.value)}
                />
              </Box>
              <Box>
                <CustomInput
                  id={'channel'}
                  label={'대화방'}
                  placeholder={'내용을 입력하세요.'}
                  value={channel}
                  onChange={(e) => setChannel(e.target.value)}
                />
              </Box>
              <Box>
                <CustomInput
                  id={'content'}
                  label={'내용'}
                  placeholder={'내용을 입력하세요.'}
                  value={contents}
                  onChange={(e) => setContents(e.target.value)}
                />
              </Box>
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
const EmptyBox = styled(Box)`
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.color.gray200};
`
