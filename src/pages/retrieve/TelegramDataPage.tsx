import { useState } from 'react'
import { Box } from '@chakra-ui/react'
import CustomTable from '@/components/charts/Table.tsx'
import data from '@/data/telegram.json'
import {
  ButtonContainer,
  ContentBox,
  ContentContainer,
  SelectContainer,
} from '@/assets/styles/global.ts'
import PageTitle from '@/components/elements/PageTitle.tsx'
import CustomDatePicker from '@/components/elements/DatePicker.tsx'
import CustomSelect from '@/components/elements/Select.tsx'
import CustomInput from '@/components/elements/Input.tsx'
import Button from '@/components/elements/Button.tsx'
import { usePagination } from '@/hooks/usePagination.tsx'
import CustomPagination from '@/components/elements/Pagination.tsx'

const Telegram = () => {
  const { page, handlePageChange } = usePagination()
  const [title, setTitle] = useState<string>('')

  const columns = [
    {
      header: '수집 키워드',
      accessorKey: 'keyword',
    },
    {
      header: '채팅방명',
      accessorKey: 'channel',
    },
    {
      header: '작성시간',
      accessorKey: 'write_time',
    },
    {
      header: '채팅방 URL',
      accessorKey: 'url',
    },
    {
      header: '작성자',
      accessorKey: 'user_name',
    },
    {
      header: '메시지',
      accessorKey: 'content',
    },
    {
      header: '분석여부',
      accessorKey: 'analysis_flag',
    },
    {
      header: '해킹여부',
      accessorKey: 'threat_flag',
    },
    {
      header: '대응여부',
      accessorKey: 'response_flag',
    },
    {
      header: '분석로그',
      accessorKey: 'threat_log',
    },
  ]

  const handleOnSelectChange = () => {}

  return (
    <ContentContainer>
      <PageTitle text={'텔레그램 데이터'} />
      <SelectContainer columns={[1, 2, 3, 4]}>
        <Box>
          <CustomDatePicker label={'조회 기간'} />
        </Box>
        <Box>
          <CustomSelect
            label={'해킹 여부'}
            onchange={handleOnSelectChange}
            options={[
              { value: '해킹', label: '해킹' },
              { value: '미해킹', label: '미해킹' },
              { value: '대기', label: '대기' },
            ]}
          />
        </Box>
        <Box>
          <CustomInput
            label={'작성자'}
            placeholder={'내용을 입력하세요.'}
            value={title}
            onchange={(e) => setTitle(e.target.value)}
          />
        </Box>
        <Box>
          <CustomInput
            label={'대화방'}
            placeholder={'내용을 입력하세요.'}
            value={title}
            onchange={(e) => setTitle(e.target.value)}
          />
        </Box>
        <Box>
          <CustomInput
            label={'내용'}
            placeholder={'내용을 입력하세요.'}
            value={title}
            onchange={(e) => setTitle(e.target.value)}
          />
        </Box>
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
              type={'download'}
              onClick={handleOnSelectChange}
              text={'엑셀 다운로드'}
            />
          </ButtonContainer>
        </Box>
      </SelectContainer>
      <ContentBox>
        <CustomTable data={data} columns={columns} loading={false} />
        <CustomPagination
          total={1}
          page={page}
          handlePageChange={(newPage) => handlePageChange(newPage as number)}
        />
      </ContentBox>
    </ContentContainer>
  )
}
export default Telegram
