import styled from '@emotion/styled'
import { Flex } from '@chakra-ui/react'

import { ContentBox, ContentContainer } from '@/assets/styles/global.ts'
import CustomTable from '@/components/charts/Table.tsx'
import PageTitle from '@/components/elements/PageTitle.tsx'
import Button from '@/components/elements/Button.tsx'
import CustomPagination from '@/components/elements/Pagination.tsx'
import CustomModal from '@/components/elements/Modal.tsx'
import CustomInput from '@/components/elements/Input.tsx'
import CustomSelect from '@/components/elements/Select.tsx'
import CustomButton from '@/components/elements/Button.tsx'
import { UserColumns } from '@/constants/tableColumns.ts'
import { useQueries } from '@/hooks/queries/useQueries.tsx'
import { usePagination } from '@/hooks/common/usePagination.tsx'
import { useUserAddMutation } from '@/hooks/mutations/useUserAddMutation.tsx'
import { useForm } from '@/hooks/common/useForm.tsx'
import { formatPhoneNumber } from '@/utils/regexChecks.ts'
import { useUserUpdateMutation } from '@/hooks/mutations/useUserUpdateMutation.tsx'

interface UserType {
  seqidx: number
  email: string
  usertype: string
  name: string
  phonenum: string
  groupcode: string
  groupname: string
}

interface UserGroupType {
  value: string
  label: string
}

const UserPage = () => {
  const { page, handlePageChange } = usePagination()
  const { fields, handleOnChange, handleOnCleanForm } = useForm()
  const {
    insertUser,
    handleOnAddUser,
    handleOnAddUserCancel,
    insertUserOpen,
    setUserType,
    setGroupCode,
  } = useUserAddMutation()

  const {
    updateUser,
    updateData,
    setUpdateData,
    handleOnUpdateUser,
    handleOnUpdateUserCancel,
    updateUserOpen,
    handleUpdateOption,
    handleOnUpdateText,
  } = useUserUpdateMutation()

  // 유저 관리 전체 리스트
  const userList = useQueries<{ data: UserType[] }>({
    queryKey: 'userList',
    method: 'POST',
    url: '/api/manage/userList',
  })

  // 추가 시 그룹 리스트
  const userGroupList = useQueries<{ data: UserGroupType[] }>({
    queryKey: 'userGroupList',
    method: 'POST',
    url: '/api/manage/userGroupList',
    enabled: userList.isSuccess && !!userList.data.data?.length,
  })

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
              handleOnUpdateUser()
              setUpdateData(row.original)
            }}
          />
        </TableButtonWrapper>
      ),
    },
  ]

  // 유저 추가 액션
  const handleInsertUserAction = () => {
    const { name, email, id, password, phonenum } = fields
    insertUser.mutate({
      name,
      email,
      id,
      password,
      phonenum: formatPhoneNumber(phonenum),
    })
  }

  // 유저 추가 취소 액션
  const handleOnCancelAction = () => {
    handleOnAddUserCancel()
    handleOnCleanForm()
  }

  return (
    <ContentContainer>
      <PageTitle text={'유저 관리'} />
      <ButtonWrapper>
        <Button type={'download'} onClick={handleOnAddUser} text={'추가'} />
      </ButtonWrapper>
      <ContentBox>
        {userList.isSuccess && (
          <>
            <CustomTable
              loading={userList.isLoading}
              data={userList.data.data}
              columns={UserColumns.concat(columns)}
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

      {/*유저 추가 모달*/}
      <CustomModal
        isOpen={insertUserOpen}
        title='유저 추가'
        onCancel={handleOnCancelAction}
        content={
          <ModalContents>
            <Flex direction='column' gap={4} padding={4}>
              <CustomInput
                id='name'
                value={fields.name}
                label='이름'
                placeholder={'이름을 입력하세요.'}
                onChange={handleOnChange}
              />
              <CustomInput
                id='id'
                value={fields.id}
                label='ID'
                placeholder={'ID를 입력하세요.'}
                onChange={handleOnChange}
              />
              <CustomInput
                id='email'
                value={fields.email}
                type={'email'}
                label='이메일'
                placeholder={'이메일을 입력하세요.'}
                onChange={handleOnChange}
              />
              <CustomInput
                id='password'
                value={fields.password}
                type={'password'}
                label='비밀번호'
                placeholder={'비밀번호를 입력하세요.'}
                onChange={handleOnChange}
              />
              <CustomInput
                id='phonenum'
                type={'number'}
                value={fields.phonenum}
                label='전화번호'
                placeholder={'숫자만 입력하세요'}
                onChange={handleOnChange}
              />
              <CustomSelect
                label={'권한'}
                options={[
                  { label: '사용자', value: 'user' },
                  { label: '관리자', value: 'administrator' },
                ]}
                setState={setUserType}
              />
              <CustomSelect
                label={'그룹'}
                options={
                  userGroupList.isSuccess ? userGroupList.data?.data : []
                }
                multiple
                setState={setGroupCode}
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
                onClick={handleInsertUserAction}
              />
            </ButtonWrapper>
          </ModalContents>
        }
      />

      {/*유저 수정 모달*/}
      <CustomModal
        isOpen={updateUserOpen}
        title='유저 수정'
        onCancel={handleOnUpdateUserCancel}
        content={
          <ModalContents>
            <Flex direction='column' gap={4} padding={4}>
              <CustomInput
                id='update_name'
                value={updateData?.name || ''}
                label='이름'
                placeholder={'이름을 입력하세요.'}
                onChange={handleOnUpdateText}
              />
              <CustomInput
                id='update_id'
                value={updateData?.id || ''}
                label='ID'
                placeholder={'ID를 입력하세요.'}
                onChange={handleOnUpdateText}
              />
              <CustomInput
                id='update_email'
                value={updateData?.email || ''}
                type={'email'}
                label='이메일'
                placeholder={'이메일을 입력하세요.'}
                onChange={handleOnUpdateText}
              />
              <CustomInput
                id='update_phonenum'
                value={updateData?.phonenum || ''}
                label='전화번호'
                placeholder={'숫자만 입력하세요'}
                onChange={handleOnUpdateText}
              />
              <CustomSelect
                label={'권한'}
                value={updateData.usertype}
                options={[
                  { label: '사용자', value: 'user' },
                  { label: '관리자', value: 'administrator' },
                ]}
                setState={(value) =>
                  handleUpdateOption('usertype', value as string)
                }
              />
              <CustomSelect
                label={'그룹'}
                value={updateData.groupcode}
                options={
                  userGroupList.isSuccess ? userGroupList.data?.data : []
                }
                multiple
                setState={(value) =>
                  handleUpdateOption('groupcode', value as string)
                }
              />
            </Flex>
            <ButtonWrapper>
              <CustomButton
                type='outline'
                text='취소'
                onClick={handleOnUpdateUserCancel}
              />
              <CustomButton
                type='primary'
                text='수정'
                onClick={updateUser.mutate}
              />
            </ButtonWrapper>
          </ModalContents>
        }
      />
    </ContentContainer>
  )
}
export default UserPage

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
