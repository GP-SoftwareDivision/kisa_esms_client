import React, { useState } from 'react'
import { Box } from '@chakra-ui/react'

import PageTitle from '@/components/elements/PageTitle.tsx'
import CustomTable from '@/components/charts/Table.tsx'
import { issueTrackingcolumns } from '@/data/columns/tracking.ts'
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

const Tracking = () => {
  const [title, setTitle] = useState<string>('')

  const data = [
    {
      api_type: 'DT',
      title: 'Terminal High Altitude Area Defense',
      write_time: '2024-02-04 09:12:44',
      hacked_organization: '기관',
      incident_type: '사고유형',
      response_status: '잔행중',
      leaked_data: '개인정보',
      target_type: '기업',
    },
    {
      api_type: 'DT',
      title: 'Terminal High Altitude Area Defense',
      write_time: '2024-02-04 09:12:44',
      hacked_organization: '기관',
      incident_type: '사고유형',
      response_status: '진행중',
      leaked_data: '개인정보',
      target_type: '기업',
    },
    {
      api_type: 'DT',
      title: 'Terminal High Altitude Area Defense',
      write_time: '2024-02-04 09:12:44',
      hacked_organization: '기관명',
      incident_type: '사고유형',
      response_status: '진행중',
      leaked_data: '개인정보',
      target_type: '기업',
    },
  ]

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setTitle(e.target.value)
  }

  const handleOnSelectChange = () => {}

  return (
    <ContentContainer>
      <PageTitle text={'이슈 대응 이력'} />
      <SelectContainer columns={[1, 2, 3, 4]}>
        <Box>
          <CustomDatePicker label={'조회 기간'} />
        </Box>
        <Box>
          <CustomSelect
            label={'API 타입'}
            onchange={handleOnSelectChange}
            options={[
              { value: 'DT', label: 'DT' },
              { value: 'TT', label: 'TT' },
            ]}
          />
        </Box>
        <Box>
          <CustomSelect
            label={'사고유형'}
            onchange={handleOnSelectChange}
            options={[
              { value: '정보유출', label: '정보유출' },
              { value: '서버해킹', label: '서버해킹' },
              { value: '기타', label: '기타' },
            ]}
          />
        </Box>
        <Box>
          <CustomSelect
            label={'상태'}
            onchange={handleOnSelectChange}
            options={[
              { value: '대기', label: '대기' },
              { value: '진행중', label: '진행중' },
              { value: '완료', label: '완료' },
            ]}
          />
        </Box>
        <Box>
          <CustomInput
            label={'제목'}
            placeholder={'내용을 입력하세요.'}
            value={title}
            onchange={handleOnChange}
          />
        </Box>
        <Box>
          <CustomInput
            label={'피해기관'}
            placeholder={'내용을 입력하세요.'}
            value={title}
            onchange={handleOnChange}
          />
        </Box>
        <Box></Box>
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
      </SelectContainer>
      <ContentBox mt={4}>
        <CustomTable
          loading={false}
          data={data}
          columns={issueTrackingcolumns}
          pagination={true}
        />
      </ContentBox>
    </ContentContainer>
  )
}
export default Tracking
