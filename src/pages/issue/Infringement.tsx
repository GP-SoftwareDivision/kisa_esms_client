import { useState } from 'react'
import axios from 'axios'
import { TableColumnsType, Col } from 'antd'
import type { UploadProps } from 'antd'
import Dragger from 'antd/es/upload/Dragger'

import {
  ButtonContainer,
  ContentBox,
  ContentContainer,
  SelectContainer,
} from '@/assets/styles/global.ts'
import CustomDatePicker from '@/components/elements/DatePicker.tsx'
import CustomSelect from '@/components/elements/Select.tsx'
import CustomInput from '@/components/elements/Input.tsx'
import Button from '@/components/elements/Button.tsx'
import CustomTable from '@/components/charts/Table.tsx'
import styled from '@emotion/styled'
import { convertXlsxToCsv, getFileName } from '@/utils/fileHelpers.ts'

const Infringement = () => {
  const [file, setFile] = useState<File | null>(null)
  const [fileName, setFileName] = useState<string | null>(null)
  const [searchFileName, setSearchFileName] = useState<string>('')

  const data = [
    {
      file_type: 'CSV',
      file_name: 'Terminal High Altitude Area Defense',
      reg_date: '2024-02-04 09:12:44',
      uploader: '홍길동',
      all_new_cnt: '100',
      all_cnt: '100',
      is_response: '완료',
      first_recognize: '기업',
      download: '',
    },
    {
      file_type: 'CSV',
      file_name: 'Terminal High Altitude Area Defense',
      reg_date: '2024-02-04 09:12:44',
      uploader: '홍길동',
      all_new_cnt: '100',
      all_cnt: '100',
      is_response: '완료',
      first_recognize: '기업',
      download: '',
    },
    {
      file_type: 'CSV',
      file_name: 'Terminal High Altitude Area Defense',
      reg_date: '2024-02-04 09:12:44',
      uploader: '홍길동',
      all_new_cnt: '100',
      all_cnt: '100',
      is_response: '완료',
      first_recognize: '기업',
      download: '',
    },
  ]

  const columns: TableColumnsType = [
    {
      title: '파일형식',
      dataIndex: 'file_type',
      align: 'center',
      responsive: ['md'],
    },
    {
      title: '파일명',
      dataIndex: 'file_name',
      align: 'center',
      responsive: ['md'],
    },
    {
      title: '업로드 날짜',
      dataIndex: 'reg_date',
      align: 'center',
      responsive: ['lg'],
    },
    {
      title: '담당자',
      dataIndex: 'uploader',
      align: 'center',
      responsive: ['md'],
    },
    {
      title: '신규 총 개수',
      dataIndex: 'all_new_cnt',
      align: 'center',
      responsive: ['md'],
    },
    {
      title: '총 개수',
      dataIndex: 'all_cnt',
      align: 'center',
    },
    {
      title: '대응 여부',
      dataIndex: 'is_response',
      align: 'center',
      responsive: ['md'],
    },
    {
      title: '최초 인지(출처)',
      dataIndex: 'first_recognize',
      align: 'center',
      responsive: ['lg'],
    },
    {
      title: '',
      dataIndex: 'download',
      align: 'center',
      responsive: ['lg'],
      render: (_: any, record: any) => (
        <Button
          type={'download'}
          text={'다운로드'}
          onClick={() => console.log(record)}
        />
      ),
    },
  ]

  const API_URL = import.meta.env.VITE_API_URL

  const handleUpload = async () => {
    if (!file) {
      alert('파일을 선택해주세요.')
      return
    }
    const formData = new FormData()
    const type = file.name.split('.').pop()
    const csvFile = await convertXlsxToCsv(file)

    if (type === 'xlsx')
      formData.append(
        'file',
        new Blob([csvFile], { type: 'text/csv' }),
        `${fileName}`
      )
    else formData.append('file', file, `${fileName}`)

    try {
      const response = await axios.post(
        'http://localhost:8080/upload', //172.17.0.2:8080
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      )
      if (response.status === 200) {
        const response2 = await axios.post(
          `${API_URL}/WebESMSUploadService.svc/TestUpload`,
          {
            filename: file.name,
            uploader: 'syjin',
          }
        )
        console.log(response2)
      }
    } catch (error) {
      console.error('Error uploading file', error)
    }
  }

  const handleOnSelectChange = () => {}

  const props: UploadProps = {
    accept:
      '.xlsx,.csv,.txt,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,text/csv,text/plain',
    onRemove: () => {
      setFile(null)
      setFileName(null)
    },
    beforeUpload: (file) => {
      const name = getFileName(file.name)
      setFile(file)
      setFileName(name)
      return false
    },
    onDrop: (e) => {
      const drag_file = e.dataTransfer.files[0]
      const name = getFileName(drag_file.name)

      const fileName = drag_file.name.split('.')
      const fileExtension = fileName[fileName.length - 1].toLowerCase()
      const isCorrectType = ['xlsx', 'csv', 'txt'].includes(fileExtension)

      if (!isCorrectType) {
        alert(
          '지원하는 형식이 아닙니다. xlsx, csv, txt의 파일 형식만 가능합니다.'
        )
        setFile(null)
        setFileName(null)
      } else {
        setFile(drag_file)
        setFileName(name)
      }
    },
    maxCount: 1,
    showUploadList: !!fileName,
  }

  return (
    <ContentContainer>
      <UploadContainer>
        <StyledDragger {...props}>
          {!fileName && '업로드할 파일 놓기 또는 파일 선택'}
        </StyledDragger>
        <Button text={'파일 업로드'} type={'primary'} onClick={handleUpload} />
      </UploadContainer>
      <SelectContainer gutter={[16, 16]}>
        <Col xs={24} sm={12} md={8} lg={6}>
          <CustomDatePicker label={'조회 기간'} />
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <CustomSelect
            label={'파일형식'}
            onchange={handleOnSelectChange}
            options={[
              { value: '전체', label: '전체' },
              { value: 'xlsx', label: 'xlsx' },
              { value: 'csv', label: 'csv' },
              { value: 'txt', label: 'txt' },
            ]}
          />
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <CustomSelect
            label={'담당자'}
            onchange={handleOnSelectChange}
            options={[
              { value: '전체', label: '전체' },
              { value: '홍길동', label: '홍길동' },
              { value: '길동이', label: '길동이' },
            ]}
          />
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <CustomSelect
            label={'대응여부'}
            onchange={handleOnSelectChange}
            options={[
              { value: '전체', label: '전체' },
              { value: '대기', label: '대기' },
              { value: '진행중', label: '진행중' },
              { value: '완료', label: '완료' },
            ]}
          />
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <CustomInput
            label={'파일명'}
            placeholder={'내용을 입력하세요.'}
            value={searchFileName}
            onchange={(e) => setSearchFileName(e.target.value)}
          />
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}></Col>
        <Col xs={24} sm={12} md={8} lg={6}></Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <ButtonContainer>
            <div></div>
            <Button
              type={'primary'}
              onClick={handleOnSelectChange}
              text={'조회'}
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
export default Infringement

const UploadContainer = styled.div`
  display: flex;
  margin: 1rem 0;
  gap: 1rem;
  position: relative;

  .ant-upload-wrapper .ant-upload-drag .ant-upload {
    padding: 4px 8px;
  }
`

const StyledDragger = styled(Dragger)`
  width: 100%;
`
