import React, { useMemo, useState } from 'react'
import { Box, SimpleGrid, Stack } from '@chakra-ui/react'
import { useNavigate, useLocation } from 'react-router-dom'
import styled from '@emotion/styled'

import {
  ButtonContainer,
  ContentContainer,
  SelectContainer,
} from '@/assets/styles/global.ts'
import { Checkbox } from '@/components/ui/checkbox'
import PageTitle from '@/components/elements/PageTitle.tsx'
import CustomDatePicker from '@/components/elements/DatePicker.tsx'
import CustomSelect from '@/components/elements/Select.tsx'
import CustomInput from '@/components/elements/Input.tsx'
import Button from '@/components/elements/Button.tsx'
import CustomPagination from '@/components/elements/Pagination.tsx'
import CustomAccordion from '@/components/elements/Accordion.tsx'
import DarkwebCard from '@/components/templates/DarkwebCard.tsx'
import Empty from '@/components/elements/Empty.tsx'
import { useQueries } from '@/hooks/queries/useQueries.tsx'
import useOptions from '@/hooks/common/useOptions.tsx'
import { usePagination } from '@/hooks/common/usePagination.tsx'
import { Loading } from '@/components/elements/Loading.tsx'
import { useSearchSave } from '@/hooks/mutations/useSearchSave.tsx'

interface dtListType {
  seqidx: number
  target: string
  keyword: string
  writetime: string
  url: string
  writer: string
  title: string
  contents: string
  threatflag: string
  threatlog: string
  issueresponseflag: string
  htmlpath: string
}

const DarkWebPage = () => {
  const navigate = useNavigate()
  const { page, setPage, handlePageChange } = usePagination()
  const { responseOptions, hackingOptions, regularExpressionOptions } =
    useOptions()

  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)

  // 조회기간
  const [date, setDate] = useState({
    startdate: queryParams.get('startdate') || '',
    enddate: queryParams.get('enddate') || '',
  })

  // 카테고리
  const [category, setCategory] = useState<string>(
    queryParams.get('category') || ''
  )

  // 해킹 여부
  const [threatflag, setThreatFlag] = useState<string>(
    queryParams.get('threatflag') || ''
  )

  // 대응 여부
  const [responseflag, setResponseFlag] = useState<string>(
    queryParams.get('responseflag') || ''
  )

  // 제목
  const [title, setTitle] = useState<string>(queryParams.get('title') || '')

  // 키워드
  const [keyword, setKeyword] = useState<string>(
    queryParams.get('keyword') || ''
  )

  // URL
  const [url, setUrl] = useState<string>(queryParams.get('url') || '')

  // 다크웹 데이터 조회 API
  const dtList = useQueries<{ data: dtListType[]; count: number }>({
    queryKey: `dtList`,
    method: 'GET',
    url: `/api/monitoring/dtList${location.search}&page=${page}`,
  })

  // 검색조건 저장
  const SaveSearch = useSearchSave()

  // 검색 조건 적용 후 파라미터 변경
  const handleOnSearch = () => {
    const params = new URLSearchParams({
      startdate: date.startdate,
      enddate: date.enddate,
      threatflag,
      responseflag,
      category,
      title,
      keyword,
      url,
    }).toString()

    setPage(1)
    navigate(`?${params}`)
  }

  // 로딩 중 경우 | 데이터 없는 경우 | 데이터 렌더링 경우 처리
  const renderDarkwebList = useMemo(() => {
    if (dtList.isLoading) return <Loading />
    if (dtList.isSuccess && dtList.data.count === 0)
      return (
        <EmptyBox>
          <Empty />
        </EmptyBox>
      )
    if (dtList.isSuccess && dtList.data.count > 0)
      return (
        <>
          <Stack margin={'1rem 0'}>
            {dtList.data?.data.map((v: dtListType) => (
              <DarkwebCard
                key={v.seqidx}
                onClick={() => navigate(`detail?id=${v.seqidx}`)}
                contents={v.contents}
                issueresponseflag={v.issueresponseflag}
                keyword={v.keyword}
                seqidx={v.seqidx}
                threatflag={v.threatflag}
                threatlog={v.threatlog}
                title={v.title}
                url={v.url}
                writer={v.writer}
                writetime={v.writetime}
                target={v.target}
                htmlpath={v.htmlpath}
              />
            ))}
          </Stack>
          <CustomPagination
            total={dtList.data?.count || 1}
            page={page}
            handlePageChange={(newPage) => handlePageChange(newPage as number)}
          />
        </>
      )
  }, [page, handlePageChange, navigate, dtList])

  return (
    <ContentContainer>
      <PageTitle
        text={'다크웹 데이터'}
        children={
          <Button
            type={'secondary'}
            onClick={() => console.log('')}
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
            onClick={() => console.log('')}
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
              label={'카테고리'}
              options={[
                { value: '', label: '전체' },
                { value: 'torurl', label: 'torurl' },
                { value: 'url-deepweb', label: 'url-deepweb' },
              ]}
              value={category}
              setState={setCategory}
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
              id={'title'}
              label={'제목'}
              placeholder={'내용을 입력하세요.'}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Box>
          <Box>
            <CustomInput
              id={'keyword'}
              label={'키워드'}
              placeholder={'내용을 입력하세요.'}
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </Box>
          <Box>
            <CustomInput
              id={'url'}
              label={'URL'}
              placeholder={'내용을 입력하세요.'}
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </Box>
          <Box></Box>
          <Box>
            <CustomSelect
              label={'정규표현식'}
              options={regularExpressionOptions}
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
                onClick={() =>
                  SaveSearch.mutate({
                    type: 'dt',
                    searchlog: new URLSearchParams({
                      startdate: date.startdate,
                      enddate: date.enddate,
                      threatflag,
                      responseflag,
                      category,
                      title,
                      keyword,
                      url,
                    }).toString(),
                  })
                }
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
                  id={'title'}
                  label={'제목'}
                  placeholder={'내용을 입력하세요.'}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Box>
              <Box>
                <CustomInput
                  id={'keyword'}
                  label={'키워드'}
                  placeholder={'내용을 입력하세요.'}
                  value={title}
                  onChange={(e) => setKeyword(e.target.value)}
                />
              </Box>
              <Box></Box>
              <ButtonContainer>
                <Button
                  type={'primary'}
                  onClick={handleOnSearch}
                  text={'재검색'}
                />
              </ButtonContainer>
            </AccordionContainer>
          }
        />
      </Stack>
      {renderDarkwebList}
    </ContentContainer>
  )
}
export default React.memo(DarkWebPage)

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
