import CustomTable from '@/components/charts/Table.tsx'
import type { TableColumnsType } from 'antd'
import PageTitle from '@/components/elements/PageTitle.tsx'

interface UserType {
  userName: string
  groupName: string
  phone: string
  email: string
  isTalk: string
  isSms: string
  isEmail: string
  autoSend: string
  update: string
}
// interface RecordType{
//   title: string
//   dataIndex: string
//   width?: string
// }
const User = () => {
  const data: UserType[] = [
    {
      userName: '진서영',
      groupName: '신규업체',
      phone: '010-0000-0000',
      email: 'test@goldenplanet.co.kr',
      isTalk: '허용',
      isSms: '허용',
      isEmail: '허용',
      autoSend: '자동',
      update: '수정',
    },
    {
      userName: '이범수',
      groupName: '신규업체',
      phone: '010-0000-0000',
      email: 'test@goldenplanet.co.kr',
      isTalk: '허용',
      isSms: '허용',
      isEmail: '허용',
      autoSend: '자동',
      update: '수정',
    },
    {
      userName: '오세은',
      groupName: '신규업체',
      phone: '010-0000-0000',
      email: 'test@goldenplanet.co.kr',
      isTalk: '허용',
      isSms: '허용',
      isEmail: '허용',
      autoSend: '자동',
      update: '수정',
    },
  ]

  const columns: TableColumnsType = [
    {
      title: '유저명',
      dataIndex: 'userName',
      align: 'center',
    },
    {
      title: '그룹',
      dataIndex: 'groupName',
      align: 'center',
    },
    {
      title: '연락처',
      dataIndex: 'phone',
      align: 'center',
    },
    {
      title: '이메일',
      dataIndex: 'email',
      align: 'center',
    },
    {
      title: '알림(카톡)',
      dataIndex: 'isTalk',
      align: 'center',
    },
    {
      title: '알림(SMS)',
      dataIndex: 'isSms',
      align: 'center',
    },
    {
      title: '알림(E-mail)',
      dataIndex: 'isEmail',
      align: 'center',
    },
    {
      title: '자동 발송',
      dataIndex: 'autoSend',
      align: 'center',
    },
    {
      title: '수정',
      dataIndex: 'update',
      align: 'center',
    },
  ]
  return (
    <>
      <PageTitle text={'유저관리'} />
      <CustomTable data={data} columns={columns} pagination={true} />
    </>
  )
}
export default User
