import styled from '@emotion/styled'
import { Flex } from '@chakra-ui/react'

import { ContentBox, ContentContainer } from '@/assets/styles/global.ts'
import CustomTable from '@/components/charts/Table.tsx'
import PageTitle from '@/components/elements/PageTitle.tsx'
import Button from '@/components/elements/Button.tsx'
import CustomPagination from '@/components/elements/Pagination.tsx'
import CustomButton from '@/components/elements/Button.tsx'
import CustomModal from '@/components/elements/Modal.tsx'
import CustomInput from '@/components/elements/Input.tsx'
import CustomSelect from '@/components/elements/Select.tsx'
import { GroupColumns } from '@/constants/tableColumns.ts'
import { useQueries } from '@/hooks/queries/useQueries.tsx'
import { usePagination } from '@/hooks/common/usePagination.tsx'
import { useGroupAddMutation } from '@/hooks/mutations/useGroupAddMutation.tsx'
import { useGroupUpdateMutation } from '@/hooks/mutations/useGroupUpdateMutation.tsx'
import { useForm } from '@/hooks/common/useForm.tsx'

// 테이블 전체 리스트 타입
interface GroupType {
  groupcode: number
  groupname: string
  comment: string
  alram: string
  autosendflag: string
  kakaoflag: string
  emailflag: string
  useflag: string
  updatedate: string
}

const GroupPage = () => {
  const { page, handlePageChange } = usePagination()
  const { fields, handleOnChange, handleOnCleanForm } = useForm()

  // 그룹 추가 hooks
  const {
    insertGroup,
    insertGroupOpen,
    handleOnAddGroup,
    handleOnAddGroupCancel,
    setAutoSendFlag,
    setUseFlag,
    setEmailFlag,
    setKakaoFlag,
  } = useGroupAddMutation()

  // 그룹 수정 hooks
  const {
    updateGroup,
    updateGroupOpen,
    handleOnUpdateGroup,
    handleOnUpdateGroupCancel,
    updateData,
    setUpdateData,
    handleUpdateOption,
    handleOnUpdateText,
  } = useGroupUpdateMutation()

  // 그룹 리스트 조회 hooks
  const groupList = useQueries<{ data: GroupType[] }>({
    queryKey: 'groupList',
    method: 'POST',
    url: '/api/manage/groupList',
  })

  // 그룹 추가 액션
  const handleInsertGroupAction = () => {
    const { groupname, comment } = fields
    insertGroup.mutate({ groupname, comment })
  }

  // 그룹 추가 취소 액션
  const handleOnCancelAction = () => {
    handleOnAddGroupCancel()
    handleOnCleanForm()
  }

  const columns = [
    {
      header: '수정',
      accessorKey: '',
      id: 'actions',
      cell: ({ row }: any) => (
        <TableButtonWrapper>
          <Button
            type={'download'}
            text={'수정'}
            onClick={() => {
              handleOnUpdateGroup()
              setUpdateData(row.original)
            }}
          />
        </TableButtonWrapper>
      ),
    },
  ]

  return (
    <ContentContainer>
      <PageTitle text={'그룹 관리'} />
      <ButtonWrapper>
        <Button type={'download'} onClick={handleOnAddGroup} text={'추가'} />
      </ButtonWrapper>
      <ContentBox>
        {groupList.isSuccess && (
          <>
            <CustomTable
              loading={groupList.isLoading}
              data={groupList.data.data}
              columns={GroupColumns.concat(columns)}
            />
            <CustomPagination
              total={1}
              page={page}
              handlePageChange={(newPage) =>
                handlePageChange(newPage as number)
              }
            />
          </>
        )}
      </ContentBox>

      {/*그룹 추가 모달*/}
      <CustomModal
        isOpen={insertGroupOpen}
        title='그룹 추가'
        onCancel={handleOnCancelAction}
        content={
          <ModalContents>
            <Flex direction='column' gap={4} padding={4}>
              <CustomInput
                id='groupname'
                value={fields.groupname}
                label='그룹 이름'
                placeholder={'그룹 이름을 입력하세요.'}
                onChange={handleOnChange}
              />
              <CustomInput
                id='comment'
                value={fields.comment}
                label='설명'
                placeholder={'설명을 입력하세요.'}
                onChange={handleOnChange}
              />
              <CustomSelect
                label={'사용'}
                options={[
                  { value: 'Y', label: '사용' },
                  { value: 'N', label: '미사용' },
                ]}
                setState={setUseFlag}
              />
              <CustomSelect
                label={'자동'}
                options={[
                  { value: 'Y', label: '발송' },
                  { value: 'N', label: '미발송' },
                ]}
                setState={setAutoSendFlag}
              />
              <CustomSelect
                label={'카카오톡'}
                options={[
                  { value: 'Y', label: '발송' },
                  { value: 'N', label: '미발송' },
                ]}
                setState={setKakaoFlag}
              />
              <CustomSelect
                label={'이메일'}
                options={[
                  { value: 'Y', label: '발송' },
                  { value: 'N', label: '미발송' },
                ]}
                setState={setEmailFlag}
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
                onClick={handleInsertGroupAction}
              />
            </ButtonWrapper>
          </ModalContents>
        }
      />

      {/*그룹 수정 모달*/}
      <CustomModal
        isOpen={updateGroupOpen}
        title='그룹 수정'
        onCancel={handleOnUpdateGroupCancel}
        content={
          <ModalContents>
            <Flex direction='column' gap={4} padding={4}>
              <CustomInput
                id='update_groupname'
                value={updateData?.groupname || ''}
                label='그룹 이름'
                onChange={handleOnUpdateText}
                placeholder={'그룹 이름을 입력하세요.'}
              />
              <CustomInput
                id='update_comment'
                value={updateData?.comment || ''}
                label='설명'
                onChange={handleOnUpdateText}
                placeholder={'설명을 입력하세요.'}
              />
              <CustomSelect
                label={'사용'}
                value={updateData?.useflag}
                options={[
                  { value: 'Y', label: '사용' },
                  { value: 'N', label: '미사용' },
                ]}
                setState={(value) =>
                  handleUpdateOption('useflag', value as string)
                }
              />
              <CustomSelect
                label={'자동'}
                value={updateData?.autosendflag}
                options={[
                  { value: 'Y', label: '발송' },
                  { value: 'N', label: '미발송' },
                ]}
                setState={(value) =>
                  handleUpdateOption('autosendflag', value as string)
                }
              />
              <CustomSelect
                label={'카카오톡'}
                value={updateData?.kakaoflag}
                options={[
                  { value: 'Y', label: '발송' },
                  { value: 'N', label: '미발송' },
                ]}
                setState={(value) =>
                  handleUpdateOption('kakaoflag', value as string)
                }
              />
              <CustomSelect
                label={'이메일'}
                value={updateData?.emailflag}
                options={[
                  { value: 'Y', label: '발송' },
                  { value: 'N', label: '미발송' },
                ]}
                setState={(value) =>
                  handleUpdateOption('emailflag', value as string)
                }
              />
            </Flex>
            <ButtonWrapper>
              <CustomButton
                type='outline'
                text='취소'
                onClick={handleOnUpdateGroupCancel}
              />
              <CustomButton
                type='primary'
                text='수정'
                onClick={updateGroup.mutate}
              />
            </ButtonWrapper>
          </ModalContents>
        }
      />
    </ContentContainer>
  )
}
export default GroupPage

const TableButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
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
