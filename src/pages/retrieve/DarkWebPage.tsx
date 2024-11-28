import { useState } from 'react'
import { Box } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { Checkbox } from '@/components/ui/checkbox'

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
import CustomPagination from '@/components/elements/Pagination.tsx'
import { usePagination } from '@/hooks/common/usePagination.tsx'
import useOptions from '@/hooks/common/useOptions.tsx'
import DarkwebCard from '@/components/templates/DarkwebCard.tsx'
import styled from '@emotion/styled'

const DarkWebPage = () => {
  const navigate = useNavigate()
  const { page, handlePageChange } = usePagination()
  const { responseOptions, hackingOptions } = useOptions()
  const [title, setTitle] = useState<string>('')

  const handleOnSelectChange = () => {}

  return (
    <ContentContainer>
      <PageTitle text={'다크웹 데이터'} />
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
          <CustomSelect
            label={'분석여부'}
            options={[
              { value: '전체', label: '전체' },
              { value: '대기', label: '대기' },
              { value: '완료', label: '완료' },
            ]}
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
          <StyledCheckBox size={'sm'} colorPalette={'gray'}>
            결과 내 재검색
          </StyledCheckBox>
        </Box>
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
      <DarkwebCard onClick={() => navigate('detail')} />
      <CustomPagination
        total={1}
        page={page}
        handlePageChange={(newPage) => handlePageChange(newPage as number)}
      />
    </ContentContainer>
  )
}
export default DarkWebPage

const StyledCheckBox = styled(Checkbox)`
  position: absolute;
  right: 260px;
  bottom: 6px;

  span {
    ${({ theme }) => theme.typography.body2};
  }
`
