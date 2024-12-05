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
    openInsertGroup,
    closeInsertGroup,
    setAutoSendFlag,
    setUseFlag,
    setEmailFlag,
    setKakaoFlag,
  } = useGroupAddMutation()

  // 그룹 수정 hooks
  const {
    updateGroup,
    updateGroupOpen,
    openUpdateGroup,
    closeUpdateGroup,
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
    closeInsertGroup()
    handleOnCleanForm()
  }

  const columns = [
    // 그룹 관리 테이블 컬럼 정의
    {
      header: '그룹명',
      accessorKey: 'groupname',
    },
    {
      header: '설명',
      accessorKey: 'comment',
    },
    {
      header: '알람방식',
      accessorKey: 'alram',
    },
    {
      header: '사용여부',
      accessorKey: 'useflag',
      cell: ({ row }: any) =>
        row.original?.useflag === 'Y' ? <span>사용</span> : <span>미사용</span>,
    },
    {
      header: '수정',
      accessorKey: '',
      id: 'actions',
      cell: ({ row }: any) => (
        <TableButtonWrapper>
          <Button
            type={'secondary'}
            text={'수정'}
            onClick={() => {
              openUpdateGroup()
              setUpdateData(row.original)
            }}
          />
        </TableButtonWrapper>
      ),
    },
  ]

  return (
    <ContentContainer>
      <PageTitle
        text={'알람 관리'}
        children={
          <Button type={'secondary'} onClick={openInsertGroup} text={'추가'} />
        }
      />
      <ContentBox>
        {groupList.isSuccess && (
          <>
            <CustomTable
              loading={groupList.isLoading}
              data={groupList.data.data}
              columns={columns}
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
                required
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
                required
              />
              <CustomSelect
                label={'자동'}
                options={[
                  { value: 'Y', label: '발송' },
                  { value: 'N', label: '미발송' },
                ]}
                setState={setAutoSendFlag}
                required
              />
              <CustomSelect
                label={'카카오톡'}
                options={[
                  { value: 'Y', label: '발송' },
                  { value: 'N', label: '미발송' },
                ]}
                setState={setKakaoFlag}
                required
              />
              <CustomSelect
                label={'이메일'}
                options={[
                  { value: 'Y', label: '발송' },
                  { value: 'N', label: '미발송' },
                ]}
                setState={setEmailFlag}
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
        onCancel={closeUpdateGroup}
        content={
          <ModalContents>
            <Flex direction='column' gap={4} padding={4}>
              <CustomInput
                id='update_groupname'
                value={updateData?.groupname || ''}
                label='그룹 이름'
                onChange={handleOnUpdateText}
                placeholder={'그룹 이름을 입력하세요.'}
                required
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
                required
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
                required
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
                required
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
                required
              />
            </Flex>
            <ButtonWrapper>
              <CustomButton
                type='outline'
                text='취소'
                onClick={closeUpdateGroup}
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
