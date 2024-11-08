import { useState } from 'react'
import { Box } from '@chakra-ui/react'

import CustomTable from '@/components/charts/Table.tsx'
import data from '@/data/dark.json'
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

const DarkWeb = () => {
  const [title, setTitle] = useState<string>('')
  const columns = [
    {
      header: '카테고리',
      accessorKey: 'category',
    },
    {
      header: '수집 키워드',
      accessorKey: 'keyword',
    },
    {
      header: 'URL',
      accessorKey: 'url',
    },
    {
      header: '제목',
      accessorKey: 'title',
    },
    {
      header: '작성시간',
      accessorKey: 'write_time',
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
      <PageTitle text={'다크웹 데이터'} />
      <SelectContainer columns={[1, 2, 3, 4]}>
        <Box>
          <CustomDatePicker label={'조회 기간'} />
        </Box>
        <Box>
          <CustomSelect
            label={'카테고리'}
            onchange={handleOnSelectChange}
            options={[{ value: '카테고리', label: '카테고리' }]}
          />
        </Box>
        <Box>
          <CustomSelect
            label={'분석여부'}
            onchange={handleOnSelectChange}
            options={[
              { value: '분석 대기', label: '분석 대기' },
              { value: '분석 완료', label: '분석 완료' },
            ]}
          />
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
          <CustomSelect
            label={'대응 여부'}
            onchange={handleOnSelectChange}
            options={[
              { value: '대기', label: '대기' },
              { value: '완료', label: '완료' },
            ]}
          />
        </Box>
        <Box>
          <CustomInput
            label={'제목'}
            placeholder={'내용을 입력하세요.'}
            value={title}
            onchange={(e) => setTitle(e.target.value)}
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
              type={'download'}
              onClick={handleOnSelectChange}
              text={'엑셀 다운로드'}
            />
          </ButtonContainer>
        </Box>
      </SelectContainer>
      <ContentBox>
        <CustomTable data={data} columns={columns} pagination={false} />
      </ContentBox>
    </ContentContainer>
  )
}
export default DarkWeb
