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
import { usePagination } from '@/hooks/common/usePagination.tsx'
import CustomPagination from '@/components/elements/Pagination.tsx'
import { TelegramColumns } from '@/constants/tableColumns.ts'
import useOptions from '@/hooks/common/useOptions.tsx'

const Telegram = () => {
  const { page, handlePageChange } = usePagination()
  const [title, setTitle] = useState<string>('')
  const { hackingOptions } = useOptions()

  const handleOnSelectChange = () => {}

  return (
    <ContentContainer>
      <PageTitle text={'텔레그램 데이터'} />
      <SelectContainer columns={[1, 2, 3, 4]}>
        <Box>
          <CustomDatePicker label={'조회 기간'} />
        </Box>
        <Box>
          <CustomSelect label={'해킹 여부'} options={hackingOptions} />
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
              text={'엑셀 다운로드'}
            />
          </ButtonContainer>
        </Box>
      </SelectContainer>
      <ContentBox>
        <CustomTable data={data} columns={TelegramColumns} loading={false} />
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
