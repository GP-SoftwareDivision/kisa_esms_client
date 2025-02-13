import styled from '@emotion/styled'
import { Box, Flex, Input } from '@chakra-ui/react'
import { withMask } from 'use-mask-input'

import { ContentBox, ContentContainer } from '@/assets/styles/global.ts'
import CustomTable from '@/components/charts/Table.tsx'
import PageTitle from '@/components/elements/PageTitle.tsx'
import Button from '@/components/elements/Button.tsx'
import CustomModal from '@/components/elements/Modal.tsx'
import CustomInput from '@/components/elements/Input.tsx'
import CustomButton from '@/components/elements/Button.tsx'
import { Field } from '@/components/ui/field.tsx'
import { PasswordInput } from '@/components/ui/password-input.tsx'
import { useQueries } from '@/hooks/queries/useQueries.tsx'
import { useForm } from '@/hooks/common/useForm.tsx'
import { useUserUpdateMutation } from '@/hooks/mutations/useUserUpdateMutation.tsx'
import { usePasswordUpdateMutation } from '@/hooks/mutations/usePasswordUpdateMutation.tsx'

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

const UserPage = () => {
  const { fields, handleOnChange } = useForm()

  // 사용자 수정 hooks
  const {
    updateUser,
    updateData,
    setUpdateData,
    handleOnUpdateUser,
    handleOnUpdateUserCancel,
    updateUserOpen,
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

  // 사용자 관리 전체 리스트
  const userList = useQueries<{ data: UserType[] }>({
    queryKey: 'userList',
    method: 'POST',
    url: '/api/setting/user',
    gcTime: 0,
    staleTime: 0,
  })

  const columns = [
    {
      header: 'ID',
      accessorKey: 'id',
    },
    {
      header: '이름',
      accessorKey: 'name',
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

  // 비밀번호 변경 액션
  const handleOnChangePassword = () => {
    handleOnUpdateUserCancel()
    OpenUpdatePassword()
  }

  return (
    <ContentContainer>
      <PageTitle text={'사용자 관리'} />
      <ContentBox>
        {userList.isSuccess && (
          <CustomTable
            loading={userList.isLoading}
            data={userList.data.data}
            columns={columns}
          />
        )}
      </ContentBox>

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
                      email: updateData.email,
                      name: updateData.name,
                      phonenum: updateData.phonenum,
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
