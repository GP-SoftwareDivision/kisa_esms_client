import React from 'react'
import { Box } from '@chakra-ui/react'
import styled from '@emotion/styled'
import Dropzone from 'react-dropzone'
import { MdUploadFile } from 'react-icons/md'
import {
  ButtonContainer,
  ContentBox,
  ContentContainer,
  SelectContainer,
} from '@/assets/styles/global'
import CustomDatePicker from '@/components/elements/DatePicker'
import CustomSelect from '@/components/elements/Select'
import CustomInput from '@/components/elements/Input'
import Button from '@/components/elements/Button'
import CustomTable from '@/components/charts/Table'
import PageTitle from '@/components/elements/PageTitle'
import { InfringementColumns } from '@/constants/tableColumns'
import { CloseButton } from '@/components/ui/close-button'
import { useInfringement } from '@/hooks/useInfringement.tsx'

const InfringementPage: React.FC = () => {
  const {
    uploadFile,
    uploadFileName,
    setPageNum,
    filename,
    setFilename,
    setFiletype,
    setUploader,
    setIsResponse,
    setDate,
    accountList,
    handleUpload,
    memoizedResponseOptions,
    memoizedFileTypeOptions,
    handleOnSearch,
    onDrop,
    canCleUpload,
  } = useInfringement()

  const columns = [
    {
      header: '다운로드',
      accessorKey: '',
      id: 'actions',
      cell: ({ row }: any) => (
        <ButtonWrapper>
          <Button
            type={'download'}
            text={'다운로드'}
            onClick={() => console.log(row.original)}
          />
        </ButtonWrapper>
      ),
    },
  ]

  return (
    <ContentContainer>
      <PageTitle text={'침해 정보 판별'} />
      <UploadContainer>
        <Dropzone onDrop={onDrop}>
          {({ getRootProps, getInputProps }) => (
            <StyledFileUpload {...getRootProps()}>
              <input
                {...getInputProps()}
                accept={
                  '.xlsx,.csv,.txt,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,text/csv,text/plain'
                }
              />
              <StyledFileIcon />
              <p>
                {uploadFileName
                  ? uploadFileName
                  : '업로드할 파일 놓기 또는 파일 선택'}
              </p>
              {uploadFile && (
                <CloseButton
                  me='-1'
                  size='xs'
                  variant='plain'
                  focusVisibleRing='inside'
                  focusRingWidth='2px'
                  pointerEvents='auto'
                  color='fg.subtle'
                  height={'auto'}
                  onClick={canCleUpload}
                />
              )}
            </StyledFileUpload>
          )}
        </Dropzone>
        <Button
          text={'파일 업로드'}
          type={
            uploadFileName && accountList.data?.progress === 'N'
              ? 'primary'
              : 'disabled'
          }
          disabled={!uploadFileName && accountList.data?.progress === 'Y'}
          onClick={handleUpload}
        />
      </UploadContainer>
      <SelectContainer columns={[1, 2, 3, 4]}>
        <Box>
          <CustomDatePicker label={'조회 기간'} setDate={setDate} />
        </Box>
        <Box>
          <CustomSelect
            label={'파일형식'}
            setState={setFiletype}
            options={memoizedFileTypeOptions}
          />
        </Box>
        <Box>
          {accountList.isSuccess && (
            <CustomSelect
              label={'담당자'}
              setState={setUploader}
              options={accountList.data.uploaderlist?.map((v) => ({
                value: v,
                label: v,
              }))}
            />
          )}
        </Box>
        <Box>
          <CustomSelect
            label={'대응여부'}
            setState={setIsResponse}
            options={memoizedResponseOptions}
          />
        </Box>
        <Box>
          <CustomInput
            label={'파일명'}
            placeholder={'내용을 입력하세요.'}
            value={filename}
            onchange={(e) => setFilename(e.target.value)}
          />
        </Box>
        <Box></Box>
        <Box></Box>
        <Box>
          <ButtonContainer>
            <div></div>
            <Button type={'primary'} onClick={handleOnSearch} text={'조회'} />
          </ButtonContainer>
        </Box>
      </SelectContainer>
      <ContentBox>
        {accountList.isSuccess && (
          <CustomTable
            loading={accountList.isLoading}
            data={accountList.data.data}
            columns={InfringementColumns.concat(columns)}
            pagination={true}
            setPageNum={setPageNum}
            total={accountList.data.count}
          />
        )}
      </ContentBox>
    </ContentContainer>
  )
}

export default InfringementPage

const UploadContainer = styled.div`
  display: flex;
  margin-top: 0.5rem;
  gap: 1rem;
`

const StyledFileUpload = styled.div`
  width: 100%;
  display: flex;
  border-width: 1px;
  border-style: solid;
  border-radius: 0.25rem;
  align-items: center;
  padding: 0.3rem 0.6rem;
  cursor: pointer;

  p {
    ${({ theme }) => theme.typography.body2};
  }
`

const StyledFileIcon = styled(MdUploadFile)`
  margin-right: 0.3rem;
  color: ${({ theme }) => theme.color.gray800};
`
const ButtonWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`
