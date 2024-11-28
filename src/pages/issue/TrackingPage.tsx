import React, { useState } from 'react'
import { Box } from '@chakra-ui/react'

import PageTitle from '@/components/elements/PageTitle.tsx'
import CustomTable from '@/components/charts/Table.tsx'
import { issueTrackingColumns } from '@/constants/tableColumns.ts'
import CustomInput from '@/components/elements/Input.tsx'
import CustomSelect from '@/components/elements/Select.tsx'
import CustomDatePicker from '@/components/elements/DatePicker.tsx'
import {
  ButtonContainer,
  ContentBox,
  ContentContainer,
  SelectContainer,
} from '@/assets/styles/global.ts'
import Button from '@/components/elements/Button.tsx'
import CustomPagination from '@/components/elements/Pagination.tsx'
import { usePagination } from '@/hooks/common/usePagination.tsx'
import useOptions from '@/hooks/common/useOptions.tsx'
import data from '@/data/tracking.json'

const TrackingPage = () => {
  const { responseOptions } = useOptions()
  const [title, setTitle] = useState<string>('')
  const { page, handlePageChange } = usePagination()

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setTitle(e.target.value)
  }

  const handleOnClick = () => {}

  return (
    <ContentContainer>
      <PageTitle
        text={'이슈 대응 이력'}
        children={
          <ButtonContainer>
            <Button
              type={'tertiary'}
              // onClick={() => navigate('/issue/tracking/detail/post')}
              onClick={() => console.log('')}
              text={'추가'}
            />
            <Button
              type={'secondary'}
              onClick={handleOnClick}
              text={'엑셀 다운로드'}
            />
          </ButtonContainer>
        }
      />
      <SelectContainer columns={[1, 2, 3, 4]}>
        <Box>
          <CustomDatePicker label={'조회 기간'} />
        </Box>
        <Box>
          <CustomSelect
            label={'API 타입'}
            options={[
              { value: '전체', label: '전체' },
              { value: 'DT', label: 'DT' },
              { value: 'TT', label: 'TT' },
            ]}
          />
        </Box>
        <Box>
          <CustomSelect
            label={'사고유형'}
            options={[
              { value: '전체', label: '전체' },
              { value: '정보유출', label: '정보유출' },
              { value: '서버해킹', label: '서버해킹' },
              { value: '기타', label: '기타' },
            ]}
          />
        </Box>
        <Box>
          <CustomSelect label={'상태'} options={responseOptions} />
        </Box>
        <Box>
          <CustomInput
            id={'title'}
            label={'제목'}
            placeholder={'내용을 입력하세요.'}
            value={title}
            onChange={handleOnChange}
          />
        </Box>
        <Box>
          <CustomInput
            id={'description'}
            label={'피해기관'}
            placeholder={'내용을 입력하세요.'}
            value={title}
            onChange={handleOnChange}
          />
        </Box>
        <Box></Box>
        <ButtonContainer>
          <Button type={'primary'} onClick={handleOnClick} text={'조회'} />
        </ButtonContainer>
      </SelectContainer>
      <ContentBox mt={4}>
        <CustomTable
          data={data}
          loading={false}
          columns={issueTrackingColumns}
        />
        <CustomPagination
          total={1}
          page={page}
          handlePageChange={(newPage) => handlePageChange(newPage as number)}
        />
      </ContentBox>
    </ContentContainer>
  )
}
export default TrackingPage
