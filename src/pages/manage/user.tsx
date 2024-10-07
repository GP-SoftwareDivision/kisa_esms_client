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

const User = () => {
  const data: UserType[] = [
    {
      userName: '진서영',
      groupName: '신규업체',
      phone: '010-0000-0000',
      email: 'test@goldenplanet.co.kr',
      isTalk: 'y',
      isSms: 'y',
      isEmail: 'y',
      autoSend: 'y',
      update: '수정',
    },
    {
      userName: '이범수',
      groupName: '신규업체',
      phone: '010-0000-0000',
      email: 'test@goldenplanet.co.kr',
      isTalk: 'y',
      isSms: 'y',
      isEmail: 'y',
      autoSend: 'y',
      update: '수정',
    },
    {
      userName: '오세은',
      groupName: '신규업체',
      phone: '010-0000-0000',
      email: 'test@goldenplanet.co.kr',
      isTalk: 'y',
      isSms: 'y',
      isEmail: 'y',
      autoSend: 'y',
      update: '수정',
    },
  ]
  console.log(data)
  return <div></div>
}
export default User
