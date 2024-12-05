import { useState } from 'react'
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

interface ttListType {
  channelurl: string
  contents: string
  issueresponseflag: string
  keyword: string
  seqidx: number
  channel: string
  threatflag: string
  threatlog: string
  username: string
  writetime: string
}

const Telegram = () => {
  const { page, handlePageChange } = usePagination()
  const [title, setTitle] = useState<string>('')
  const { hackingOptions, responseOptions } = useOptions()

  // 유저 관리 전체 리스트
  const ttList = useQueries<{ data: ttListType[] }>({
    queryKey: 'ttList',
    method: 'POST',
    url: '/api/monitoring/ttList',
    body: {
      startdate: '2024-11-01',
      enddate: '2024-11-06',
      page: 1,
      threatflag: '',
      username: '',
      channel: '',
      contents: '',
    },
  })

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
            <CustomDatePicker label={'조회 기간'} />
          </Box>
          <Box>
            <CustomSelect label={'해킹 여부'} options={hackingOptions} />
          </Box>
          <Box>
            <CustomSelect label={'대응 여부'} options={responseOptions} />
          </Box>
          <Box>
            <CustomInput
              id={'writer'}
              label={'작성자'}
              placeholder={'내용을 입력하세요.'}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Box>
          <Box>
            <CustomInput
              id={'channel'}
              label={'대화방'}
              placeholder={'내용을 입력하세요.'}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Box>
          <Box>
            <CustomInput
              id={'content'}
              label={'내용'}
              placeholder={'내용을 입력하세요.'}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Box>
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
                  id={'writer'}
                  label={'작성자'}
                  placeholder={'내용을 입력하세요.'}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Box>
              <Box>
                <CustomInput
                  id={'channel'}
                  label={'대화방'}
                  placeholder={'내용을 입력하세요.'}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Box>
              <Box>
                <CustomInput
                  id={'content'}
                  label={'내용'}
                  placeholder={'내용을 입력하세요.'}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Box>
              <Box display={'flex'} justifyContent={'flex-end'}>
                <Button
                  type={'primary'}
                  onClick={handleOnSelectChange}
                  text={'재검색'}
                />
              </Box>
            </AccordionContainer>
          }
        />
      </Stack>
      <Stack margin={'1rem 0'}>
        {ttList.isSuccess &&
          ttList.data.data?.map((v) => (
            <TelegramCard
              channelurl={v.channelurl}
              contents={v.contents}
              issueresponseflag={v.issueresponseflag}
              keyword={v.keyword}
              seqidx={v.seqidx}
              threatflag={v.threatflag}
              threatlog={v.threatlog}
              username={v.username}
              channel={v.channel}
              writetime={v.writetime}
            />
          ))}
      </Stack>
      {/*<CustomTable data={data} columns={TelegramColumns} loading={false} />*/}
      <CustomPagination
        total={1}
        page={page}
        handlePageChange={(newPage) => handlePageChange(newPage as number)}
      />
    </ContentContainer>
  )
}
export default Telegram

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
    top: 325px;
  }

  @media (min-width: 577px) and (max-width: 767px) {
    top: 202px;
  }

  @media (min-width: 768px) and (max-width: 991px) {
    top: 156px;
    right: 550px;
  }

  @media (min-width: 992px) {
    top: 109px;
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
