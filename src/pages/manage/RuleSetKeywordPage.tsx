import { useState } from 'react'
import styled from '@emotion/styled'
import { usePagination } from '@/hooks/common/usePagination.tsx'
import { ContentBox, ContentContainer } from '@/assets/styles/global.ts'
import PageTitle from '@/components/elements/PageTitle.tsx'
import Button from '@/components/elements/Button.tsx'
import { useQueries } from '@/hooks/queries/useQueries.tsx'
import CustomTable from '@/components/charts/Table.tsx'
import CustomPagination from '@/components/elements/Pagination.tsx'
import { Checkbox } from '@/components/ui/checkbox.tsx'
import { useForm } from '@/hooks/common/useForm.tsx'
import { useRulesetAddMutation } from '@/hooks/mutations/useRulesetAddMutation.tsx'
import { useRulesetUpdateMutation } from '@/hooks/mutations/useRulesetUpdateMutation.tsx'
import CustomModal from '@/components/elements/Modal.tsx'
import { Flex } from '@chakra-ui/react'
import CustomInput from '@/components/elements/Input.tsx'
import CustomSelect from '@/components/elements/Select.tsx'
import CustomButton from '@/components/elements/Button.tsx'

interface JudgmentListType {
  seqidx: number
  type: string
  rule: string
  useflag: string
  hackingflag: string
  regdate: string
}

const RuleSetKeywordPage = () => {
  // 삭제 목록
  const [deleteItems, setDeleteItems] = useState<number[]>([])

  const { page, handlePageChange } = usePagination(1)
  const { fields, handleOnChange, handleOnCleanForm } = useForm()

  const [hackingflag, setHackingflag] = useState<string>('')
  const [apitype, setApitype] = useState<string>('')

  // 키워드 추가 hooks
  const {
    insertRuleset,
    openInsertRuleset,
    closeInsertRuleset,
    insertRulesetOpen,
  } = useRulesetAddMutation()

  // 키워드 수정 hooks
  const {
    updateRuleset,
    deleteRuleset,
    openUpdateRuleset,
    closeUpdateRuleset,
    updateRulesetOpen,
    updateData,
    setUpdateData,
    handleUpdateOption,
    handleOnUpdateText,
  } = useRulesetUpdateMutation()

  const ruleList = useQueries<{ data: JudgmentListType[]; count: number }>({
    queryKey: `judgmentList`,
    method: 'POST',
    url: '/api/manage/rule',
    body: {
      page: page,
    },
  })

  // 판단 키워드 관리 테이블 컬럼 정의
  const RulesetColumns = [
    {
      header: '',
      accessorKey: '',
      id: 'delete',
      cell: ({ row }: any) => {
        return (
          <Checkbox
            checked={deleteItems.includes(row.original.seqidx)}
            size={'xs'}
            onCheckedChange={(checked) => {
              const itemId = row.original.seqidx
              if (checked.checked) {
                // 체크된 경우: 배열에 추가 (중복 방지)
                setDeleteItems((prev) =>
                  prev.includes(itemId) ? prev : [...prev, itemId]
                )
              } else {
                setDeleteItems((prev) => prev.filter((id) => id !== itemId))
              }
            }}
          />
        )
      },
    },
    {
      header: '수집타입',
      accessorKey: 'type',
      cell: ({ row }: any) =>
        row.original?.type === 'DT' ? (
          <span>다크웹</span>
        ) : (
          <span>텔레그램</span>
        ),
    },
    {
      header: '키워드',
      accessorKey: 'rule',
    },
    {
      header: '사용여부',
      accessorKey: 'useflag',
      cell: ({ row }: any) =>
        row.original?.useflag === 'Y' ? <span>사용</span> : <span>미사용</span>,
    },
    {
      header: '해킹여부',
      accessorKey: 'hackingflag',
      cell: ({ row }: any) =>
        row.original?.hackingflag === 'Y' ? (
          <span>해킹</span>
        ) : (
          <span>미해킹</span>
        ),
    },
    {
      header: '생성일시(최근수정일)',
      accessorKey: 'regdate',
    },
    {
      header: '',
      accessorKey: '수정',
      id: 'update',
      cell: ({ row }: any) => (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            type={'secondary'}
            text={'수정'}
            onClick={() => {
              const { rule, seqidx, type, useflag, hackingflag } = row.original
              openUpdateRuleset()
              setUpdateData({ rule, seqidx, type, useflag, hackingflag })
            }}
          />
        </div>
      ),
    },
  ]

  // 판단 키워드 추가 액션
  const handleInsertKeywordAction = () => {
    const { rule } = fields
    insertRuleset.mutate({ rule, apitype, hackingflag })
  }

  // 판단 키워드 추가 취소 액션
  const handleOnCancelAction = () => {
    closeInsertRuleset()
    handleOnCleanForm()
  }

  return (
    <ContentContainer>
      <PageTitle
        text={'판단 키워드 관리'}
        children={
          <TitleButtonWrapper>
            <Button
              type={'secondary'}
              onClick={openInsertRuleset}
              text={'추가'}
            />
            <Button
              type={deleteItems.length === 0 ? 'ghost' : 'primary'}
              onClick={() => {
                deleteRuleset.mutate({ items: deleteItems })
                setDeleteItems([])
              }}
              disabled={deleteItems.length === 0}
              text={'삭제'}
            />
          </TitleButtonWrapper>
        }
      />
      <ContentBox>
        {ruleList.isSuccess && (
          <>
            <CustomTable
              loading={ruleList.isLoading}
              data={ruleList?.data.data}
              columns={RulesetColumns}
            />
            <CustomPagination
              total={ruleList.data?.count}
              page={page}
              handlePageChange={(newPage) =>
                handlePageChange(newPage as number)
              }
            />
          </>
        )}
      </ContentBox>

      {/*판단 키워드 추가 모달*/}
      <CustomModal
        isOpen={insertRulesetOpen}
        title='수집 키워드 추가'
        onCancel={handleOnCancelAction}
        content={
          <ModalContents>
            <Flex direction='column' gap={4} padding={4}>
              <CustomInput
                id='rule'
                value={fields.rule}
                label='룰 키워드'
                placeholder={'키워드를 입력하세요.'}
                onChange={handleOnChange}
                required
              />
              <CustomSelect
                label={'타입'}
                options={[
                  { value: 'DT', label: '다크웹' },
                  { value: 'TT', label: '텔레그램' },
                ]}
                onChange={(item: { items: any; value: string[] }) =>
                  setApitype(item.value.join(','))
                }
                required
              />
              <CustomSelect
                label={'해킹여부'}
                options={[
                  { value: 'Y', label: '해킹' },
                  { value: 'N', label: '미해킹' },
                ]}
                onChange={(item: { items: any; value: string[] }) =>
                  setHackingflag(item.value.join(','))
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
                text='추가'
                onClick={handleInsertKeywordAction}
              />
            </ButtonWrapper>
          </ModalContents>
        }
      />

      {/*판단 키워드 수정 모달*/}
      <CustomModal
        isOpen={updateRulesetOpen}
        title='판단 키워드 수정'
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
                onChange={(item: { items: any; value: string[] }) =>
                  handleUpdateOption('type', item.value.join(','))
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
                onChange={(item: { items: any; value: string[] }) =>
                  handleUpdateOption('useflag', item.value.join(','))
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
                onChange={(item: { items: any; value: string[] }) =>
                  handleUpdateOption('hackingflag', item.value.join(','))
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
export default RuleSetKeywordPage

const TitleButtonWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
`

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
