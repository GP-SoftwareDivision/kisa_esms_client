import React, { useMemo, useState } from 'react'
import { Box, SimpleGrid, Stack, HStack } from '@chakra-ui/react'
import { InputGroup } from '@/components/ui/input-group'
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
import { usePagination } from '@/hooks/common/usePagination.tsx'
import { Loading } from '@/components/elements/Loading.tsx'
import { useSearchSaveMutation } from '@/hooks/mutations/useSearchSaveMutation.tsx'
import CustomModal from '@/components/elements/Modal.tsx'
import CustomButton from '@/components/elements/Button.tsx'
import { useForm } from '@/hooks/common/useForm.tsx'
import { notifyError } from '@/utils/notify.ts'
import { useQuery } from '@tanstack/react-query'
import instance from '@/apis/instance.ts'
import { responseOptions, hackingOptions } from '@/data/selectOptions.ts'
import queryToJson from '@/utils/queryToJson.ts'
import { useLogicalSelect } from '@/hooks/common/useLogicalSelect.tsx'

export interface dtListType {
  seqidx: number
  target: string
  keyword: string
  writetime: string
  url: string
  writer: string
  title: string
  contents: string
  trancontents: string
  threatflag: string
  threatlog: string
  issueresponseflag: string
  htmlpath: string
  regdate: string
}

const DarkWebPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const { page, setPage, handlePageChange } = usePagination(
    Number(queryParams.get('page'))
  )
  const { fields, handleOnChange, handleOnCleanForm } = useForm()

  // 논리연산자 훅
  const { RenderLogicalSelect } = useLogicalSelect()

  // 조회 조건 저장
  const {
    SaveSearch,
    handleOnAddSearch,
    handleOnAddSearchCancel,
    insertSearchOpen,
  } = useSearchSaveMutation()

  // 조회 조건 불러오기
  const [savedSearchCondition, setSavedSearchCondition] = useState<string>('')

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

  // 작성자
  const [writer, setWriter] = useState<string>(queryParams.get('writer') || '')

  // 재검색 제목
  const [reTitle, setRetitle] = useState<string>(
    queryParams.get('re_title') || ''
  )

  // 키워드
  const [keyword, setKeyword] = useState<string>(
    queryParams.get('keyword') || ''
  )

  // 재검색 키워드
  const [reKeyword, setReKeyword] = useState<string>(
    queryParams.get('re_keyword') || ''
  )

  // URL
  const [url, setUrl] = useState<string>(queryParams.get('url') || '')

  // 정규표현식
  const [regex, setRegex] = useState<string>(queryParams.get('regex') || '')

  // 결과 내 재검색
  const [isReSearch, setIsReSearch] = useState<boolean>(
    queryParams.get('re_title') !== '' || queryParams.get('re_keyword') !== ''
  )

  // 다크웹 데이터 조회 API
  const dtList = useQueries<{ data: dtListType[]; count: number }>({
    queryKey: `dtList`,
    method: 'GET',
    url: `/api/monitoring/dtList${location.search}`,
  })

  // 검색조건 불러오기
  const searchHistory = useQuery<{
    data: { searchlog: string; title: string }[]
    message: string
  }>({
    queryKey: ['searchHistoryList'],
    queryFn: async () => {
      try {
        const response = await instance.post(
          '/api/manage/search/history/data',
          { type: 'DT' }
        )
        return response.data
      } catch (error) {
        console.error(error)
      }
    },
  })

  // 검색 조건 적용 후 파라미터 변경
  const handleOnSearch = () => {
    setPage(1)
    const params = new URLSearchParams({
      startdate: date.startdate,
      enddate: date.enddate,
      threatflag,
      responseflag,
      category,
      title,
      writer,
      keyword,
      url,
      regex,
      re_title: reTitle,
      re_keyword: reKeyword,
      page: page.toString(),
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
      type: 'DT',
      searchlog: new URLSearchParams({
        startdate: date.startdate,
        enddate: date.enddate,
        threatflag,
        responseflag,
        category,
        title,
        writer,
        keyword,
        url,
        regex,
        re_title: reTitle,
        re_keyword: reKeyword,
        page: '1',
      }).toString(),
      title: fields.searchName,
    })
    handleOnCleanForm()
    handleOnAddSearchCancel()
  }

  // 불러오기 후 적용 클릭 이벤트
  const handleOnApplySavedCondition = () => {
    if (savedSearchCondition) {
      const jsonSavedData = queryToJson(savedSearchCondition)

      setDate({
        startdate: jsonSavedData.startdate as string,
        enddate: jsonSavedData.enddate as string,
      })
      setCategory(jsonSavedData.category as string)
      setResponseFlag(jsonSavedData.responseflag as string)
      setTitle(jsonSavedData.title as string)
      setWriter(jsonSavedData.writer as string)
      setRetitle(jsonSavedData.re_title as string)
      setKeyword(jsonSavedData.keyword as string)
      setReKeyword(jsonSavedData.re_keyword as string)
      setUrl(jsonSavedData.url as string)
      setRegex(jsonSavedData.regex as string)
      setIsReSearch(
        jsonSavedData.re_title !== '' || jsonSavedData.re_keyword !== ''
      )
    }
  }

  // 로딩 중 경우 | 데이터 없는 경우 | 데이터 렌더링 경우 처리
  const renderDarkwebList = useMemo(() => {
    if (dtList.isLoading) return <Loading />
    if (!dtList.data || dtList.data.count === 0) return <Empty />
    if (!dtList.data || dtList.data.count > 0)
      return (
        <>
          <Stack margin={'1rem 0'}>
            {dtList.data?.data.map((v: dtListType) => (
              <DarkwebCard
                key={v.seqidx}
                onClick={() => navigate(`detail?id=${v.seqidx}`)}
                contents={v.contents}
                trancontents={v.trancontents}
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
                regdate={v.regdate}
                htmlpath={v.htmlpath}
              />
            ))}
          </Stack>
          <CustomPagination
            total={dtList.data?.count || 1}
            page={page}
            handlePageChange={(newPage) => {
              handlePageChange(newPage as number)
              queryParams.set('page', newPage.toString())
              navigate(`?${queryParams.toString()}`)
            }}
          />
        </>
      )
  }, [page, navigate, dtList])

  return (
    <ContentContainer>
      <PageTitle
        text={'다크웹 데이터'}
        children={
          <Button
            type={'secondary'}
            onClick={() => {}}
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
              label={'수집 기간'}
              date={date}
              setDate={setDate}
              disabled={isReSearch}
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
              onChange={(item: { items: any; value: string[] }) =>
                setCategory(item.value.join(','))
              }
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
              id={'title'}
              label={'제목'}
              placeholder={'내용을 입력하세요.'}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
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
              id={'keyword'}
              label={'키워드'}
              placeholder={'내용을 입력하세요.'}
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              disabled={isReSearch}
            />
          </Box>
          <Box>
            <CustomInput
              id={'url'}
              label={'URL'}
              placeholder={'내용을 입력하세요.'}
              value={url}
              onChange={(e) => setUrl(e.target.value)}
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
              <Box>
                <CustomInput
                  id={'title'}
                  label={'제목'}
                  placeholder={'내용을 입력하세요.'}
                  value={reTitle}
                  onChange={(e) => setRetitle(e.target.value)}
                />
              </Box>
              <Box>
                <HStack gap='10' width='full'>
                  <InputGroup flex='1' endElement={<RenderLogicalSelect />}>
                    <CustomInput
                      id={'keyword'}
                      label={'키워드'}
                      placeholder={'내용을 입력하세요.'}
                      value={reKeyword}
                      onChange={(e) => setReKeyword(e.target.value)}
                    />
                  </InputGroup>
                </HStack>
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
