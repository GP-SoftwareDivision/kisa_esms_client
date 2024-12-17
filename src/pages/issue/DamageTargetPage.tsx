import { useState } from 'react'
import styled from '@emotion/styled'
import { Box, Flex } from '@chakra-ui/react'

import {
  ButtonContainer,
  ContentBox,
  ContentContainer,
  SelectContainer,
} from '@/assets/styles/global.ts'
import PageTitle from '@/components/elements/PageTitle.tsx'
import Button from '@/components/elements/Button.tsx'
import CustomTable from '@/components/charts/Table.tsx'
import CustomPagination from '@/components/elements/Pagination.tsx'
import { useForm } from '@/hooks/common/useForm.tsx'
import { usePagination } from '@/hooks/common/usePagination.tsx'
import { useRulesetUpdateMutation } from '@/hooks/mutations/useRulesetUpdateMutation.tsx'
import CustomModal from '@/components/elements/Modal.tsx'
import CustomInput from '@/components/elements/Input.tsx'
import CustomSelect from '@/components/elements/Select.tsx'
import CustomButton from '@/components/elements/Button.tsx'
import CustomDatePicker from '@/components/elements/DatePicker.tsx'
import { useQueries } from '@/hooks/queries/useQueries.tsx'

interface DamageTargetListType {
  seqidx: number
  createdAt: string
  targetType: string
  institution: string
  reportFlag: string
  incidentId: string
  supportFlag: string
  rejectionReason: string
}

const DamageTargetPage = () => {
  const { page, handlePageChange } = usePagination(1)
  const { fields, handleOnChange, handleOnCleanForm } = useForm()

  // 조회기간
  const [date, setDate] = useState({
    startdate: '2024-12-03',
    enddate: '2024-12-03',
  })

  // 대상 구분 / 피해 기관 / 신고 여부 /  채널 구분
  const [selectFields, setSelectFields] = useState({
    targetType: '',
    institution: '',
    reportFlag: '',
    supportFlag: '',
  })

  // 요청 파라미터
  const [request, setRequest] = useState({
    page: 1,
    ...date,
    ...selectFields,
    ...fields,
  })

  const damageTargetList = useQueries<{
    data: DamageTargetListType[]
    count: number
  }>({
    queryKey: `damageTargetList`,
    method: 'POST',
    url: '/api/issue/victims',
    body: request,
  })

  const {
    updateRuleset,
    openUpdateRuleset,
    closeUpdateRuleset,
    updateRulesetOpen,
    updateData,
    setUpdateData,
    handleUpdateOption,
    handleOnUpdateText,
  } = useRulesetUpdateMutation()

  // 판단 키워드 관리 테이블 컬럼 정의
  const damageTargetColumns = [
    {
      header: '순번',
      accessorKey: 'type',
      cell: ({ row }: any) =>
        row.original?.type === 'DT' ? (
          <span>다크웹</span>
        ) : (
          <span>텔레그램</span>
        ),
    },
    {
      header: '일시',
      accessorKey: 'createdAt',
    },
    {
      header: '대상구분',
      accessorKey: 'targetType',
    },
    {
      header: '피해기관',
      accessorKey: 'institution',
    },
    {
      header: '신고여부',
      accessorKey: 'reportFlag',
    },
    {
      header: '사고번호',
      accessorKey: 'incidentId',
    },
    {
      header: '기술지원여부',
      accessorKey: 'supportFlag',
    },
    {
      header: '거부사유',
      accessorKey: 'rejectionReason',
    },
    {
      header: '대응이력보기',
      accessorKey: '',
      id: 'view',
      cell: ({ row }: any) => (
        <Button
          type={'secondary'}
          text={'수정'}
          onClick={() => {
            console.log(row)
          }}
        />
      ),
    },
    {
      header: '수정',
      accessorKey: '',
      id: 'update',
      cell: ({ row }: any) => (
        <Button
          type={'secondary'}
          text={'수정'}
          onClick={() => {
            const { rule, seqidx, type, useflag, hackingflag } = row.original
            openUpdateRuleset()
            setUpdateData({ rule, seqidx, type, useflag, hackingflag })
          }}
        />
      ),
    },
  ]

  // 판단 키워드 추가 액션
  // const handleInsertKeywordAction = () => {
  //   const { rule } = fields
  //   insertRuleset.mutate({ rule, apitype, hackingflag })
  // }

  // 판단 키워드 추가 취소 액션 이벤트
  const handleOnCancelAction = () => {
    handleOnCleanForm()
  }

  // 셀렉트 박스 옵션 변경 이벤트
  const handleSelectChange = (field: string, value: any) => {
    setSelectFields((prev) => ({ ...prev, [field]: value }))
  }

  // 조회 이벤트
  const handleOnClick = () => {
    setRequest({
      page: 1,
      ...date,
      ...selectFields,
      ...fields,
    })
  }

  return (
    <ContentContainer>
      <PageTitle
        text={'피해 대상 관리'}
        children={
          <Button
            type={'secondary'}
            onClick={() => {}}
            text={'엑셀 다운로드'}
          />
        }
      />
      <SelectContainer columns={[1, 2, 3, 4]}>
        <Box>
          <CustomDatePicker label={'조회 기간'} date={date} setDate={setDate} />
        </Box>
        <Box>
          <CustomSelect
            label={'대상구분'}
            options={[
              { value: '', label: '전체' },
              { value: '개인', label: '개인' },
              { value: '기업', label: '기업' },
              { value: '협회', label: '협회' },
              { value: '공공', label: '공공' },
              { value: '교육', label: '교육' },
              { value: '금융', label: '금융' },
              { value: '의료', label: '의료' },
              { value: '기타', label: '기타' },
            ]}
            value={selectFields.targetType}
            setState={(value) => handleSelectChange('targetType', value)}
          />
        </Box>
        <Box>
          <CustomInput
            id={'institution'}
            label={'피해기관'}
            placeholder={'내용을 입력하세요.'}
            value={fields.institution}
            onChange={handleOnChange}
          />
        </Box>
        <Box>
          <CustomSelect
            label={'신고여부'}
            options={[
              { value: '', label: '전체' },
              { value: '신고', label: '신고' },
              { value: '미신고', label: '미신고' },
            ]}
            value={selectFields.reportFlag}
            setState={(value) => handleSelectChange('reportFlag', value)}
          />
        </Box>
        <Box>
          <CustomSelect
            label={'기술지원'}
            options={[
              { value: '', label: '전체' },
              { value: '동의', label: '동의' },
              { value: '미동의', label: '미동의' },
            ]}
            value={selectFields.supportFlag}
            setState={(value) => handleSelectChange('supportFlag', value)}
          />
        </Box>
        <Box></Box>
        <Box></Box>
        <ButtonContainer>
          <Button type={'primary'} onClick={handleOnClick} text={'조회'} />
        </ButtonContainer>
      </SelectContainer>
      <ContentBox>
        {damageTargetList.isSuccess && (
          <>
            <CustomTable
              loading={false}
              data={damageTargetList.data?.data || []}
              columns={damageTargetColumns}
            />
            <CustomPagination
              total={damageTargetList.data.count}
              page={page}
              handlePageChange={(newPage) =>
                handlePageChange(newPage as number)
              }
            />
          </>
        )}
      </ContentBox>

      {/*판단 키워드 수정 모달*/}
      <CustomModal
        isOpen={updateRulesetOpen}
        title='그룹 수정'
        onCancel={closeUpdateRuleset}
        content={
          <ModalContents>
            <Flex direction='column' gap={4} padding={4}>
              <CustomInput
                id='update_rule'
                value={updateData.rule || ''}
                label='키워드'
                placeholder={'키워드를 입력하세요.'}
                onChange={handleOnUpdateText}
                required
              />
              <CustomSelect
                label={'타입'}
                value={updateData.type}
                options={[
                  { value: 'DT', label: '다크웹' },
                  { value: 'TT', label: '텔레그램' },
                ]}
                setState={(value) =>
                  handleUpdateOption('type', value as string)
                }
                required
              />
              <CustomSelect
                label={'사용여부'}
                value={updateData.useflag}
                options={[
                  { value: 'Y', label: '사용' },
                  { value: 'N', label: '미사용' },
                ]}
                setState={(value) =>
                  handleUpdateOption('useflag', value as string)
                }
                required
              />
              <CustomSelect
                label={'해킹여부'}
                value={updateData.hackingflag}
                options={[
                  { value: 'Y', label: '해킹' },
                  { value: 'N', label: '미해킹' },
                ]}
                setState={(value) =>
                  handleUpdateOption('hackingflag', value as string)
                }
                required
              />
            </Flex>
            <ButtonWrapper>
              <CustomButton
                type='outline'
                text='취소'
                onClick={handleOnCancelAction}
              />
              <CustomButton
                type='primary'
                text='수정'
                onClick={updateRuleset.mutate}
              />
            </ButtonWrapper>
          </ModalContents>
        }
      />
    </ContentContainer>
  )
}
export default DamageTargetPage

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 0.5rem;
  gap: 10px;
`

const ModalContents = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`
