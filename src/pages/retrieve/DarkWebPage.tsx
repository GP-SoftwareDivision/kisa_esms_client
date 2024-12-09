import { useState } from 'react'
import { Box, SimpleGrid, Stack } from '@chakra-ui/react'
import { useNavigate, useLocation } from 'react-router-dom'

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
import { usePagination } from '@/hooks/common/usePagination.tsx'
import useOptions from '@/hooks/common/useOptions.tsx'
import DarkwebCard from '@/components/templates/DarkwebCard.tsx'
import styled from '@emotion/styled'
import CustomAccordion from '@/components/elements/Accordion.tsx'
import { useQueries } from '@/hooks/queries/useQueries.tsx'
import TelegramCard from '@/components/templates/TelegramCard.tsx'

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
  const { page, handlePageChange } = usePagination()
  const { responseOptions, hackingOptions } = useOptions()

  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)

  const [date, setDate] = useState({
    startdate: queryParams.get('startdate') || '',
    enddate: queryParams.get('enddate') || '',
  })
  const [category, setCategory] = useState<string>(
    queryParams.get('category') || ''
  )
  const [threatflag, setThreatFlag] = useState<string>(
    queryParams.get('threatflag') || ''
  )
  const [responseflag, setResponseFlag] = useState<string>(
    queryParams.get('responseflag') || ''
  )
  const [title, setTitle] = useState<string>(queryParams.get('title') || '')
  const [keyword, setKeyword] = useState<string>(
    queryParams.get('keyword') || ''
  )
  const [url, setUrl] = useState<string>(queryParams.get('url') || '')

  const dtList = useQueries<{ data: dtListType[]; count: number }>({
    queryKey: 'dtList',
    method: 'GET',
    url: `/api/monitoring/dtList?${new URLSearchParams({
      startdate: date.startdate,
      enddate: date.enddate,
      page: page.toString(),
      threatflag,
      category,
      responseflag,
      title,
      keyword,
      url,
    }).toString()}`,
  })

  console.log(dtList)
  const handleOnSelectChange = () => {}

  return (
    <ContentContainer>
      <PageTitle
        text={'다크웹 데이터'}
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
            <CustomDatePicker label={'조회 기간'} />
          </Box>
          <Box>
            <CustomSelect
              label={'카테고리'}
              options={[{ value: '카테고리', label: '카테고리' }]}
            />
          </Box>
          <Box>
            <CustomSelect label={'해킹 여부'} options={hackingOptions} />
          </Box>
          <Box>
            <CustomSelect label={'대응 여부'} options={responseOptions} />
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
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Box>
          <Box>
            <CustomInput
              id={'url'}
              label={'URL'}
              placeholder={'내용을 입력하세요.'}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Box>
          <Box></Box>
          <Box></Box>
          <Box></Box>
          <Box></Box>
          <Box>
            <ButtonContainer>
              <Button
                type={'primary'}
                onClick={handleOnSelectChange}
                text={'조회'}
              />
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
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Box>
              <Box></Box>
              <ButtonContainer>
                <Button
                  type={'primary'}
                  onClick={handleOnSelectChange}
                  text={'재검색'}
                />
              </ButtonContainer>
            </AccordionContainer>
          }
        />
      </Stack>
      <Stack margin={'1rem 0'}>
        {dtList.isSuccess &&
          dtList.data?.data.map((v: dtListType) => (
            <DarkwebCard
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
            />
          ))}
      </Stack>
      <CustomPagination
        total={dtList.data?.count || 1}
        page={page}
        handlePageChange={(newPage) => handlePageChange(newPage as number)}
      />
    </ContentContainer>
  )
}
export default DarkWebPage

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
