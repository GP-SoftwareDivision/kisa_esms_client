import { useState } from 'react'
import styled from '@emotion/styled'
import { Box, Flex, Input } from '@chakra-ui/react'
import { withMask } from 'use-mask-input'

import { ContentBox, ContentContainer } from '@/assets/styles/global.ts'
import CustomTable from '@/components/charts/Table.tsx'
import PageTitle from '@/components/elements/PageTitle.tsx'
import Button from '@/components/elements/Button.tsx'
import CustomPagination from '@/components/elements/Pagination.tsx'
import CustomModal from '@/components/elements/Modal.tsx'
import CustomInput from '@/components/elements/Input.tsx'
import CustomSelect from '@/components/elements/Select.tsx'
import CustomButton from '@/components/elements/Button.tsx'
import { Field } from '@/components/ui/field.tsx'
import { PasswordInput } from '@/components/ui/password-input.tsx'
import { useQueries } from '@/hooks/queries/useQueries.tsx'
import { usePagination } from '@/hooks/common/usePagination.tsx'
import { useUserAddMutation } from '@/hooks/mutations/useUserAddMutation.tsx'
import { useForm } from '@/hooks/common/useForm.tsx'
import { useUserUpdateMutation } from '@/hooks/mutations/useUserUpdateMutation.tsx'
import { formatPhoneNumber } from '@/utils/regexChecks.ts'
import { Checkbox } from '@/components/ui/checkbox.tsx'
import { usePasswordUpdateMutation } from '@/hooks/mutations/usePasswordUpdateMutation.tsx'

interface UserType {
  seqidx: number
  email: string
  usertype: string
  name: string
  phonenum: string
  groupcode: string
  groupname: string
  useflag: string
}

interface UserGroupType {
  value: string
  label: string
}

const UserPage = () => {
  const { page, handlePageChange } = usePagination(1)
  const { fields, handleOnChange, handleOnCleanForm } = useForm()

  // 사용자 추가 hooks
  const {
    insertUser,
    handleOnAddUser,
    handleOnAddUserCancel,
    insertUserOpen,
    setUserType,
    setGroupCode,
  } = useUserAddMutation()

  // 사용자 수정 hooks
  const {
    updateUser,
    deleteUser,
    updateData,
    setUpdateData,
    handleOnUpdateUser,
    handleOnUpdateUserCancel,
    updateUserOpen,
    handleUpdateOption,
    handleOnUpdateText,
  } = useUserUpdateMutation()

  // 사용자 비밀번호 hooks
  const {
    updatePassword,
    OpenUpdatePassword,
    CancelUpdatePassword,
    isUpdatePasswordOpen,
  } = usePasswordUpdateMutation()

  // 삭제 목록
  const [deleteItems, setDeleteItems] = useState<number[]>([])

  // 사용자 관리 전체 리스트
  const userList = useQueries<{ data: UserType[] }>({
    queryKey: 'userList',
    method: 'POST',
    url: '/api/setting/user',
    gcTime: 0,
  })

  // 추가 시 그룹 리스트
  const userGroupList = useQueries<{ data: UserGroupType[] }>({
    queryKey: 'userGroupList',
    method: 'POST',
    url: '/api/setting/user/groups',
    enabled: userList.isSuccess && !!userList.data.data?.length,
    gcTime: 0,
  })

  const columns = [
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
      header: 'ID',
      accessorKey: 'id',
    },
    {
      header: '이름',
      accessorKey: 'name',
    },
    {
      header: '권한',
      accessorKey: 'usertype',
      cell: ({ row }: any) =>
        row.original?.usertype === 'administrator' ? (
          <span>관리자</span>
        ) : (
          <span>사용자</span>
        ),
    },
    {
      header: '번호',
      accessorKey: 'phonenum',
    },
    {
      header: '이메일',
      accessorKey: 'email',
    },
    {
      header: '그룹명',
      accessorKey: 'groupname',
    },
    {
      header: '등록일',
      accessorKey: 'regdate',
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
              handleOnUpdateUser()
              setUpdateData(row.original)
            }}
          />
        </TableButtonWrapper>
      ),
    },
  ]

  // 사용자 추가 액션
  const handleInsertUserAction = () => {
    const { name, email, id, password, passwordConfirm, phonenum } = fields
    insertUser.mutate({
      name,
      email,
      id,
      password,
      passwordConfirm,
      phonenum: phonenum && formatPhoneNumber(phonenum),
    })
  }

  // 사용자 추가 취소 액션
  const handleOnCancelAction = () => {
    handleOnAddUserCancel()
    handleOnCleanForm()
  }

  // 비밀번호 변경 액션
  const handleOnChangePassword = () => {
    handleOnUpdateUserCancel()
    OpenUpdatePassword()
  }

  return (
    <ContentContainer>
      <PageTitle
        text={'사용자 관리'}
        children={
          <TitleButtonWrapper>
            <Button
              type={'secondary'}
              onClick={handleOnAddUser}
              text={'추가'}
            />
            <Button
              type={deleteItems.length === 0 ? 'ghost' : 'primary'}
              onClick={() => {
                deleteUser.mutate({ items: deleteItems })
                setDeleteItems([])
              }}
              disabled={deleteItems.length === 0}
              text={'삭제'}
            />
          </TitleButtonWrapper>
        }
      />
      <ContentBox>
        {userList.isSuccess && (
          <>
            <CustomTable
              loading={userList.isLoading}
              data={userList.data.data}
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

      {/*사용 추가 모달*/}
      <CustomModal
        isOpen={insertUserOpen}
        title='사용자 추가'
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
                required
              />
              <CustomInput
                id='id'
                value={fields.id}
                label='ID'
                placeholder={'ID를 입력하세요.'}
                onChange={handleOnChange}
                required
              />
              <CustomInput
                id='email'
                value={fields.email}
                label='이메일'
                placeholder={'이메일을 입력하세요.'}
                onChange={handleOnChange}
                required
              />
              <StyledField label={'비밀번호'} required>
                <PasswordInput
                  id='password'
                  value={fields.password || ''}
                  placeholder={
                    '영문,숫자,특수문자를 포함한 8자 이상을 입력하세요.'
                  }
                  onChange={handleOnChange}
                />
              </StyledField>
              <StyledField label={' '}>
                <PasswordInput
                  id='passwordConfirm'
                  value={fields.passwordConfirm || ''}
                  placeholder={'비밀번호를 한 번 더 입력하세요.'}
                  onChange={handleOnChange}
                />
              </StyledField>
              <StyledField label={'전화번호'} required>
                <Input
                  id='phonenum'
                  value={fields.phonenum || ''}
                  placeholder={'숫자만 입력하세요'}
                  onChange={handleOnChange}
                  ref={withMask('999-9999-9999')}
                />
              </StyledField>
              <CustomSelect
                label={'권한'}
                options={[
                  { label: '사용자', value: 'user' },
                  { label: '관리자', value: 'administrator' },
                ]}
                onChange={(item: { items: any; value: string[] }) =>
                  setUserType(item.value.join(','))
                }
                required
              />
              <CustomSelect
                label={'그룹'}
                options={
                  userGroupList.isSuccess ? userGroupList.data?.data : []
                }
                multiple
                onChange={(item: { items: any; value: string[] }) =>
                  setGroupCode(item.value.join(','))
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
                onClick={handleInsertUserAction}
              />
            </ButtonWrapper>
          </ModalContents>
        }
      />

      {/*사용자 수정 모달*/}
      <CustomModal
        isOpen={updateUserOpen}
        title='사용자 수정'
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
                required
              />
              <CustomInput
                id='update_email'
                value={updateData?.email || ''}
                label='이메일'
                placeholder={'이메일을 입력하세요.'}
                onChange={handleOnUpdateText}
                required
              />

              <StyledField label={'전화번호'} required>
                <Input
                  id='update_phonenum'
                  value={updateData?.phonenum || ''}
                  placeholder={'숫자만 입력하세요'}
                  onChange={handleOnUpdateText}
                  ref={withMask('999-9999-9999')}
                />
              </StyledField>
              <CustomSelect
                label={'권한'}
                value={updateData.usertype}
                options={[
                  { label: '사용자', value: 'user' },
                  { label: '관리자', value: 'administrator' },
                ]}
                onChange={(item: { items: any; value: string[] }) =>
                  handleUpdateOption('usertype', item.value.join(','))
                }
                required
              />
              <CustomSelect
                label={'그룹'}
                value={updateData.groupcode}
                options={
                  userGroupList.isSuccess ? userGroupList.data?.data : []
                }
                multiple
                onChange={(item: { items: any; value: string[] }) =>
                  handleUpdateOption('groupcode', item.value.join(','))
                }
                required
              />
              <CustomSelect
                label={'사용여부'}
                value={updateData.useflag}
                options={[
                  { label: '사용', value: 'Y' },
                  { label: '미사용', value: 'N' },
                ]}
                onChange={(item: { items: any; value: string[] }) =>
                  handleUpdateOption('useflag', item.value.join(','))
                }
                required
              />
            </Flex>
            <Box
              display={'flex'}
              justifyContent={'space-between'}
              alignItems={'center'}
            >
              <CustomButton
                type='primary'
                text='비밀번호 변경'
                onClick={handleOnChangePassword}
              />
              <ButtonWrapper>
                <CustomButton
                  type='outline'
                  text='취소'
                  onClick={handleOnUpdateUserCancel}
                />
                <CustomButton
                  type='primary'
                  text='수정'
                  onClick={() =>
                    updateUser.mutate({
                      seqidx: updateData.seqidx,
                      groupcode: updateData.groupcode,
                      email: updateData.email,
                      name: updateData.name,
                      phonenum: updateData.phonenum,
                      usertype: updateData.usertype,
                      useflag: updateData.useflag,
                    })
                  }
                />
              </ButtonWrapper>
            </Box>
          </ModalContents>
        }
      />
      <CustomModal
        isOpen={isUpdatePasswordOpen}
        title='비밀번호 변경'
        onCancel={CancelUpdatePassword}
        content={
          <ModalContents>
            <StyledField label={'비밀번호'} required>
              <PasswordInput
                id='updatePassword'
                value={fields.updatePassword || ''}
                placeholder={
                  '영문,숫자,특수문자를 포함한 8자 이상을 입력하세요.'
                }
                onChange={handleOnChange}
              />
            </StyledField>
            <StyledField label={' '}>
              <PasswordInput
                id='updatePasswordConfirm'
                value={fields.updatePasswordConfirm || ''}
                placeholder={'비밀번호를 한 번 더 입력하세요.'}
                onChange={handleOnChange}
              />
            </StyledField>
            <ButtonWrapper>
              <CustomButton
                type='outline'
                text='취소'
                onClick={CancelUpdatePassword}
              />
              <CustomButton
                type='primary'
                text='변경'
                onClick={() =>
                  updatePassword.mutate({
                    seqidx: updateData.seqidx,
                    updatePassword: fields.updatePassword,
                    updatePasswordConfirm: fields.updatePasswordConfirm,
                  })
                }
              />
            </ButtonWrapper>
          </ModalContents>
        }
      />
    </ContentContainer>
  )
}
export default UserPage

const TitleButtonWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
`

const TableButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`

const ModalContents = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const StyledField = styled(Field)`
  width: 100%;
  flex-direction: row;
  align-items: center;

  label {
    min-width: 60px;
    ${({ theme }) => theme.typography.body2};
  }

  input {
    height: 30px;
    outline: none;
    ${({ theme }) => theme.typography.body3};
  }

  svg {
    color: #a1a1aa;
  }
`
