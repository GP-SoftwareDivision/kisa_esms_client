import { useState } from 'react'
import styled from '@emotion/styled'
import { Flex } from '@chakra-ui/react'

import { ContentBox, ContentContainer } from '@/assets/styles/global.ts'
import PageTitle from '@/components/elements/PageTitle.tsx'
import CustomTable from '@/components/charts/Table.tsx'
import CustomPagination from '@/components/elements/Pagination.tsx'
import { Checkbox } from '@/components/ui/checkbox'
import Button from '@/components/elements/Button.tsx'
import { usePagination } from '@/hooks/common/usePagination.tsx'
import { useQueries } from '@/hooks/queries/useQueries.tsx'
import { useKeywordAddMutation } from '@/hooks/mutations/useKeywordAddMutation.tsx'
import CustomModal from '@/components/elements/Modal.tsx'
import CustomInput from '@/components/elements/Input.tsx'
import CustomSelect from '@/components/elements/Select.tsx'
import CustomButton from '@/components/elements/Button.tsx'
import { useForm } from '@/hooks/common/useForm.tsx'
import { useKeywordUpdateMutation } from '@/hooks/mutations/useKeywordUpdateMutation.tsx'

interface KeywordType {
  apitype: string
  keyword: string
  useflag: string
  regdate: string
}

const KeywordPage = () => {
  // api 타입
  const [apitype, setApitype] = useState<string>('')

  // 삭제 목록
  const [deleteItems, setDeleteItems] = useState<number[]>([])

  const { page, handlePageChange } = usePagination(1)
  const { fields, handleOnChange, handleOnCleanForm } = useForm()

  // 키워드 추가 hooks
  const {
    insertKeyword,
    openInsertKeyword,
    closeInsertKeyword,
    insertKeywordOpen,
  } = useKeywordAddMutation()

  // 키워드 수정 hooks
  const {
    updateKeyword,
    deleteKeyword,
    openUpdateKeyword,
    closeUpdateKeyword,
    updateKeywordOpen,
    updateData,
    setUpdateData,
    handleUpdateOption,
    handleOnUpdateText,
  } = useKeywordUpdateMutation()

  // 그룹 리스트 조회 hooks
  const keywordList = useQueries<{ data: KeywordType[]; count: number }>({
    queryKey: 'keywordList',
    method: 'POST',
    url: '/api/manage/keyword',
    body: {
      page: page,
    },
  })

  // 키워드 추가 액션
  const handleInsertKeywordAction = () => {
    const { keyword } = fields
    insertKeyword.mutate({ keyword, apitype })
    handleOnCleanForm()
  }

  // 키워드 추가 취소 액션
  const handleOnCancelAction = () => {
    closeInsertKeyword()
    handleOnCleanForm()
  }

  const SearchHistoryColumns = [
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
      accessorKey: 'apitype',
      cell: ({ row }: any) =>
        row.original?.apitype === 'DT' ? (
          <span>다크웹</span>
        ) : (
          <span>텔레그램</span>
        ),
    },
    {
      header: '사용여부',
      accessorKey: 'useflag',
      cell: ({ row }: any) =>
        row.original?.useflag === 'Y' ? <span>사용</span> : <span>미사용</span>,
    },
    {
      header: '키워드',
      accessorKey: 'keyword',
    },
    {
      header: '생성일시(최근 수정일)',
      accessorKey: 'regdate',
    },
    {
      header: '',
      accessorKey: '수정',
      id: 'update',
      cell: ({ row }: any) => (
        <Button
          type={'secondary'}
          text={'수정'}
          onClick={() => {
            const { keyword, seqidx, apitype, useflag } = row.original
            openUpdateKeyword()
            setUpdateData({ keyword, seqidx, apitype, useflag })
          }}
        />
      ),
    },
  ]
  return (
    <ContentContainer>
      <PageTitle
        text={'수집 키워드 관리'}
        children={
          <TitleButtonWrapper>
            <Button
              type={'secondary'}
              onClick={openInsertKeyword}
              text={'추가'}
            />
            <Button
              type={deleteItems.length === 0 ? 'ghost' : 'primary'}
              onClick={() => {
                deleteKeyword.mutate({ items: deleteItems })
                setDeleteItems([])
              }}
              disabled={deleteItems.length === 0}
              text={'삭제'}
            />
          </TitleButtonWrapper>
        }
      />
      <ContentBox>
        {keywordList.isSuccess && (
          <>
            <CustomTable
              loading={keywordList.isLoading}
              data={keywordList.data.data}
              columns={SearchHistoryColumns}
            />
            <CustomPagination
              total={keywordList.data?.count}
              page={page}
              handlePageChange={(newPage) =>
                handlePageChange(newPage as number)
              }
            />
          </>
        )}
      </ContentBox>

      {/*키워드 추가 모달*/}
      <CustomModal
        isOpen={insertKeywordOpen}
        title='수집 키워드 추가'
        onCancel={handleOnCancelAction}
        content={
          <ModalContents>
            <Flex direction='column' gap={4} padding={4}>
              <CustomInput
                id='keyword'
                value={fields.keyword}
                label='키워드'
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
                setState={setApitype}
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

      {/*키워드 수정 모달*/}
      <CustomModal
        isOpen={updateKeywordOpen}
        title='그룹 수정'
        onCancel={closeUpdateKeyword}
        content={
          <ModalContents>
            <Flex direction='column' gap={4} padding={4}>
              <CustomInput
                id='update_keyword'
                value={updateData.keyword || ''}
                label='키워드'
                placeholder={'키워드를 입력하세요.'}
                onChange={handleOnUpdateText}
                required
              />
              <CustomSelect
                label={'타입'}
                value={updateData.apitype}
                options={[
                  { value: 'DT', label: '다크웹' },
                  { value: 'TT', label: '텔레그램' },
                ]}
                setState={(value) =>
                  handleUpdateOption('apitype', value as string)
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
                onClick={updateKeyword.mutate}
              />
            </ButtonWrapper>
          </ModalContents>
        }
      />
    </ContentContainer>
  )
}
export default KeywordPage

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
