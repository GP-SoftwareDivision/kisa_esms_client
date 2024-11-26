import styled from '@emotion/styled'
import { ContentBox, ContentContainer } from '@/assets/styles/global.ts'
import CustomTable from '@/components/charts/Table.tsx'
import PageTitle from '@/components/elements/PageTitle.tsx'
import Button from '@/components/elements/Button.tsx'
import { useQueries } from '@/hooks/queries/useQueries.tsx'
import CustomPagination from '@/components/elements/Pagination.tsx'
import { usePagination } from '@/hooks/common/usePagination.tsx'
import { UserColumns } from '@/constants/tableColumns.ts'
import CustomModal from '@/components/elements/Modal.tsx'
import { Flex } from '@chakra-ui/react'
import CustomInput from '@/components/elements/Input.tsx'
import CustomSelect from '@/components/elements/Select.tsx'
import CustomButton from '@/components/elements/Button.tsx'
import { useUserAddMutation } from '@/hooks/mutations/useUserAddMutation.tsx'
import { useForm } from '@/hooks/common/useForm.tsx'

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
  const { fields, handleOnChange } = useForm()
  const { insertUser, handleOnAddUser, handleOnAddUserCancel, insertUserOpen } =
    useUserAddMutation()

  const userList = useQueries<{ data: UserType[] }>({
    queryKey: 'userList',
    method: 'POST',
    url: '/api/manage/userList',
  })

  const userGroupList = useQueries<{ grouplist: UserGroupType[] }>({
    queryKey: 'userGroupList',
    method: 'POST',
    url: '/api/manage/userGroupList',
  })

  const columns = [
    {
      header: '다운로드',
      accessorKey: '',
      id: 'actions',
      cell: ({ row }: any) => (
        <TableButtonWrapper>
          <Button
            type={'download'}
            text={'수정'}
            onClick={() => console.log(row.original.seqidx)}
          />
        </TableButtonWrapper>
      ),
    },
  ]

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
      <CustomModal
        isOpen={insertUserOpen}
        title='유저 추가'
        onCancel={handleOnAddUserCancel}
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
              <CustomSelect
                label={'그룹'}
                options={
                  userGroupList.isSuccess ? userGroupList.data?.grouplist : []
                }
                multiple
                // setState={(value) =>
                //   handleUpdateFlag('useflag', value as string)
                // }
              />
              <CustomInput
                id='email'
                value={fields.email}
                label='이메일'
                placeholder={'이메일을 입력하세요.'}
                onChange={handleOnChange}
              />
              <CustomInput
                id='phoneNumber'
                value={fields.phoneNumber}
                label='전화번호'
                placeholder={'전화번호를 입력하세요.'}
                onChange={handleOnChange}
              />
            </Flex>
            <ButtonWrapper>
              <CustomButton
                type='outline'
                text='취소'
                onClick={handleOnAddUserCancel}
              />
              <CustomButton
                type='primary'
                text='추가'
                onClick={insertUser.mutate}
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
