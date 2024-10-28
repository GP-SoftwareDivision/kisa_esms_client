import { Col, TableColumnsType } from 'antd'
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
import { useState } from 'react'

const Telegram = () => {
  const [title, setTitle] = useState<string>('')

  const columns: TableColumnsType = [
    {
      title: '수집 키워드',
      dataIndex: 'keyword',
      align: 'center',
      width: 7,
    },
    {
      title: '채팅방명',
      dataIndex: 'channel',
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
      title: '채팅방 URL',
      dataIndex: 'url',
      align: 'center',
      width: 10,
    },
    {
      title: '작성자',
      dataIndex: 'user_name',
      align: 'center',
      width: 5,
    },
    {
      title: '메시지',
      dataIndex: 'content',
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
      <PageTitle text={'텔레그램 데이터'} />
      <SelectContainer gutter={[16, 16]}>
        <Col xs={24} sm={12} md={8} lg={6}>
          <CustomDatePicker label={'조회 기간'} />
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
          <CustomInput
            label={'작성자'}
            placeholder={'내용을 입력하세요.'}
            value={title}
            onchange={(e) => setTitle(e.target.value)}
          />
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <CustomInput
            label={'대화방'}
            placeholder={'내용을 입력하세요.'}
            value={title}
            onchange={(e) => setTitle(e.target.value)}
          />
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <CustomInput
            label={'내용'}
            placeholder={'내용을 입력하세요.'}
            value={title}
            onchange={(e) => setTitle(e.target.value)}
          />
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}></Col>
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
export default Telegram
