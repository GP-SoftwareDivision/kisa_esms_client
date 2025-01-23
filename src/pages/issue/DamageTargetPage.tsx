import { useMemo, useState } from 'react'
import styled from '@emotion/styled'
import { Box, Flex } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

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
import { usePagination } from '@/hooks/common/usePagination.tsx'
import CustomModal from '@/components/elements/Modal.tsx'
import CustomInput from '@/components/elements/Input.tsx'
import CustomSelect from '@/components/elements/Select.tsx'
import CustomButton from '@/components/elements/Button.tsx'
import CustomDatePicker from '@/components/elements/DatePicker.tsx'
import { useQueries } from '@/hooks/queries/useQueries.tsx'
import Empty from '@/components/elements/Empty.tsx'
import { targetOptions } from '@/data/selectOptions.ts'
import { useDamageTargetUpdateMutation } from '@/hooks/mutations/useDamageTargetUpdateMutation.tsx'
import queryToJson from '@/utils/queryToJson.ts'
import { updateSearchCondition } from '@/utils/stateHandlers.ts'
import { useExcelDownload } from '@/hooks/common/useExcelDownload.tsx'
import dayjs from 'dayjs'

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

const TableButtonWrapper = styled(Box)`
  display: flex;
  width: 100%;
  justify-content: center;
`

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
  const now = dayjs()
  const navigate = useNavigate()
  const queryParams = new URLSearchParams(location.search)
  const { page, setPage, handlePageChange } = usePagination(
    Number(queryParams.get('page')) || 1
  )
  const {
    updateDamageTarget,
    openUpdateDamageTarget,
    closeUpdateDamageTarget,
    updateDamageTargetOpen,
    updateData,
    setUpdateData,
    handleUpdateOption,
    handleOnUpdateText,
  } = useDamageTargetUpdateMutation()

  const { excelDownload, excelDownloadLoading } = useExcelDownload()

  // 조회기간
  const [date, setDate] = useState({
    startdate: queryParams.get('startdate') || '',
    enddate: queryParams.get('enddate') || '',
  })

  // 대상 구분 / 피해 기관 / 신고 여부 / 기술 지원 여부
  const [searchConditions, setSearchConditions] = useState({
    targetType: queryParams.get('targetType') || '',
    institution: queryParams.get('institution') || '',
    reportFlag: queryParams.get('reportFlag') || '',
    supportFlag: queryParams.get('supportFlag') || '',
  })

  // 검색 조회 이벤트
  const handleOnSearch = () => {
    setPage(1)
    const params = new URLSearchParams({
      page: page.toString(),
      startdate: date.startdate,
      enddate: date.enddate,
      ...searchConditions,
    }).toString()
    navigate(`?${params}`)
  }

  const damageTargetList = useQueries<{
    data: DamageTargetListType[]
    count: number
  }>({
    queryKey: `damageTargetList`,
    method: 'POST',
    url: '/api/issue/victims',
    body: queryToJson(location.search),
  })

  // 판단 키워드 관리 테이블 컬럼 정의
  const damageTargetColumns = [
    {
      header: '순번',
      accessorKey: 'seqidx',
    },
    {
      header: '일시',
      accessorKey: 'registrationDate',
    },
    {
      header: '대상구분',
      accessorKey: 'targetType',
      cell: ({ row }: any) =>
        targetOptions.find(
          (list: { value: string; label: string }) =>
            list.value === row.original?.targetType
        )?.label ?? '',
    },
    {
      header: '피해기관',
      accessorKey: 'institution',
    },
    {
      header: '신고여부',
      accessorKey: 'reportFlag',
      cell: ({ row }: any) =>
        row.original?.reportFlag === 'Y' ? (
          <span>신고</span>
        ) : (
          <span>미신고</span>
        ),
    },
    {
      header: '사고번호',
      accessorKey: 'incidentId',
    },
    {
      header: '기술지원여부',
      accessorKey: 'supportFlag',
      cell: ({ row }: any) =>
        row.original?.supportFlag === 'Y' ? (
          <span>동의</span>
        ) : (
          <span>미동의</span>
        ),
    },
    {
      header: '거부사유',
      accessorKey: 'reason',
    },
    {
      header: '대응이력보기',
      accessorKey: '',
      id: 'view',
      cell: ({ row }: any) => (
        <TableButtonWrapper>
          <Button
            type={'outline'}
            text={'이동'}
            onClick={() => {
              console.log(row.original)
              navigate(`/issue/tracking/detail?seqidx=${row.original.issueIdx}`)
            }}
          />
        </TableButtonWrapper>
      ),
    },
    {
      header: '수정',
      accessorKey: '',
      id: 'update',
      cell: ({ row }: any) => (
        <TableButtonWrapper>
          <Button
            type={'secondary'}
            text={'수정'}
            onClick={() => {
              openUpdateDamageTarget()
              setUpdateData(row.original)
            }}
          />
        </TableButtonWrapper>
      ),
    },
  ]

  const renderTable = useMemo(() => {
    if (!damageTargetList.data || excelDownloadLoading) return <Empty />
    if (damageTargetList.isSuccess)
      return (
        <>
          <CustomTable
            loading={false}
            data={damageTargetList.data?.data || []}
            columns={damageTargetColumns}
          />
          <CustomPagination
            total={damageTargetList.data.count}
            page={page}
            handlePageChange={(newPage) => {
              handlePageChange(newPage as number)
              queryParams.set('page', newPage.toString())
              navigate(`?${queryParams.toString()}`)
            }}
          />
        </>
      )
  }, [damageTargetList.data, excelDownloadLoading])

  return (
    <ContentContainer>
      <PageTitle
        text={'피해 대상 관리'}
        children={
          <Button
            type={'secondary'}
            onClick={() =>
              excelDownload.mutate({
                endpoint: '/issue/victims',
                params: location.search,
                fileName: `피해대상관리_${now.format('YYYY-MM-DD HH:mm:ss')}.xlsx`,
              })
            }
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
            options={[{ value: '', label: '전체' }, ...targetOptions]}
            value={searchConditions.targetType}
            onChange={(item: { items: any; value: string[] }) =>
              updateSearchCondition(
                setSearchConditions,
                'targetType',
                item.value.join(',')
              )
            }
          />
        </Box>
        <Box>
          <CustomInput
            id={'institution'}
            label={'피해기관'}
            placeholder={'내용을 입력하세요.'}
            value={searchConditions.institution}
            onChange={(e) =>
              updateSearchCondition(
                setSearchConditions,
                'institution',
                e.target.value
              )
            }
          />
        </Box>
        <Box>
          <CustomSelect
            label={'신고여부'}
            options={[
              { value: '', label: '전체' },
              { value: 'Y', label: '신고' },
              { value: 'N', label: '미신고' },
            ]}
            value={searchConditions.reportFlag}
            onChange={(item: { items: any; value: string[] }) =>
              updateSearchCondition(
                setSearchConditions,
                'reportFlag',
                item.value.join(',')
              )
            }
          />
        </Box>
        <Box>
          <CustomSelect
            label={'기술지원'}
            options={[
              { value: '', label: '전체' },
              { value: 'Y', label: '동의' },
              { value: 'N', label: '미동의' },
            ]}
            value={searchConditions.supportFlag}
            onChange={(item: { items: any; value: string[] }) =>
              updateSearchCondition(
                setSearchConditions,
                'supportFlag',
                item.value.join(',')
              )
            }
          />
        </Box>
        <Box></Box>
        <Box></Box>
        <ButtonContainer>
          <Button type={'primary'} onClick={handleOnSearch} text={'조회'} />
        </ButtonContainer>
      </SelectContainer>
      <ContentBox>{renderTable}</ContentBox>

      {/*판단 키워드 수정 모달*/}
      <CustomModal
        isOpen={updateDamageTargetOpen}
        title='피해 대상 관리 수정'
        onCancel={closeUpdateDamageTarget}
        content={
          <ModalContents>
            <Flex direction='column' gap={4} padding={4}>
              <CustomSelect
                label={'대상구분'}
                options={targetOptions}
                value={updateData.targetType}
                onChange={(item: { items: any; value: string[] }) =>
                  handleUpdateOption('targetType', item.value.join(','))
                }
              />
              <CustomInput
                id='update_institution'
                value={updateData.institution || ''}
                label='피해기관'
                placeholder={'피해기관을 입력하세요.'}
                onChange={handleOnUpdateText}
                required
              />
              <CustomSelect
                label={'신고여부'}
                value={updateData.reportFlag}
                options={[
                  { value: 'Y', label: '신고' },
                  { value: 'N', label: '미신고' },
                ]}
                onChange={(item: { items: any; value: string[] }) =>
                  handleUpdateOption('reportFlag', item.value.join(','))
                }
                required
              />
              <CustomInput
                id='update_incidentId'
                value={updateData.incidentId || ''}
                label='사고번호'
                placeholder={'사고번호를 입력하세요.'}
                onChange={handleOnUpdateText}
                required
              />
              <CustomSelect
                label={'기술지원'}
                value={updateData.supportFlag}
                options={[
                  { value: 'Y', label: '동의' },
                  { value: 'N', label: '미동의' },
                ]}
                onChange={(item: { items: any; value: string[] }) =>
                  handleUpdateOption('supportFlag', item.value.join(','))
                }
                required
              />
              <CustomInput
                id='update_reason'
                value={updateData.reason || ''}
                label='거부사유'
                placeholder={'거부사유를 입력하세요.'}
                onChange={handleOnUpdateText}
                required
              />
            </Flex>
            <ButtonWrapper>
              <CustomButton
                type='outline'
                text='취소'
                onClick={closeUpdateDamageTarget}
              />
              <CustomButton
                type='primary'
                text='수정'
                onClick={updateDamageTarget.mutate}
              />
            </ButtonWrapper>
          </ModalContents>
        }
      />
    </ContentContainer>
  )
}
export default DamageTargetPage
