import { Col, TableColumnsType } from 'antd'
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
import { useState } from 'react'

const DarkWeb = () => {
  const [title, setTitle] = useState<string>('')
  const columns: TableColumnsType = [
    {
      title: '카테고리',
      dataIndex: 'category',
      align: 'center',
      width: 5,
    },
    {
      title: '수집 키워드',
      dataIndex: 'keyword',
      align: 'center',
      width: 5,
    },
    {
      title: 'URL',
      dataIndex: 'url',
      align: 'center',
      width: 10,
    },
    {
      title: '제목',
      dataIndex: 'title',
      align: 'center',
      width: 10,
    },
    {
      title: '작성시간',
      dataIndex: 'write_time',
      align: 'center',
      width: 10,
    },
    {
      title: '분석여부',
      dataIndex: 'analysis_flag',
      align: 'center',
      width: 5,
    },
    {
      title: '해킹여부',
      dataIndex: 'threat_flag',
      align: 'center',
      width: 5,
    },
    {
      title: '대응여부',
      dataIndex: 'response_flag',
      align: 'center',
      width: 5,
    },
    {
      title: '분석로그',
      dataIndex: 'threat_log',
      align: 'center',
      width: 5,
    },
  ]

  const handleOnSelectChange = () => {}

  return (
    <ContentContainer>
      <PageTitle text={'다크웹 데이터'} />
      <SelectContainer gutter={[16, 16]}>
        <Col xs={24} sm={12} md={8} lg={6}>
          <CustomDatePicker label={'조회 기간'} />
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <CustomSelect
            label={'카테고리'}
            onchange={handleOnSelectChange}
            options={[{ value: '전체', label: '전체' }]}
          />
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <CustomSelect
            label={'분석여부'}
            onchange={handleOnSelectChange}
            options={[
              { value: '전체', label: '전체' },
              { value: '분석 대기', label: '분석 대기' },
              { value: '분석 완료', label: '분석 완료' },
            ]}
          />
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <CustomSelect
            label={'해킹 여부'}
            onchange={handleOnSelectChange}
            options={[
              { value: '전체', label: '전체' },
              { value: '해킹', label: '해킹' },
              { value: '미해킹', label: '미해킹' },
              { value: '대기', label: '대기' },
            ]}
          />
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <CustomSelect
            label={'대응 여부'}
            onchange={handleOnSelectChange}
            options={[
              { value: '전체', label: '전체' },
              { value: '대기', label: '대기' },
              { value: '완료', label: '완료' },
            ]}
          />
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <CustomInput
            label={'제목'}
            placeholder={'내용을 입력하세요.'}
            value={title}
            onchange={(e) => setTitle(e.target.value)}
          />
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}></Col>
        <Col xs={24} sm={12} md={8} lg={6}>
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
        </Col>
      </SelectContainer>
      <ContentBox>
        <CustomTable data={data} columns={columns} pagination={true} />
      </ContentBox>
    </ContentContainer>
  )
}
export default DarkWeb
