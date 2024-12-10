import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import styled from '@emotion/styled'

import menu from '@/data/menu.json'
import NavBar from '@/components/elements/NavBar.tsx'
import { mq } from '@/utils/mediaQueries.ts'
import instance from '../apis/instance.ts'
import dayjs from 'dayjs'

interface UserInfoType {
  name: string
  type: string
}

const Header = () => {
  const navigate = useNavigate()

  // 유저 정보
  const accountInfo = useQuery<{ data: UserInfoType }>({
    queryKey: ['account'],
    queryFn: async () => {
      try {
        const response = await instance.post('/api/loginInfo')
        return response.data
      } catch (error) {
        console.error(error)
      }
    },
  })

  const onSubMenuSelect = (subItemKey: string | null) => {
    const darkwebParams = new URLSearchParams({
      startdate: '2024-11-03',
      enddate: '2024-11-03',
      threatflag: '',
      category: '',
      keyword: '',
      title: '',
      url: '',
      responseflag: '',
    }).toString()

    const telegramParams = new URLSearchParams({
      // startdate: dayjs().subtract(7, 'd').format('YYYY-MM-DD'),
      startdate: '2024-11-01',
      enddate: dayjs().format('YYYY-MM-DD'),
      threatflag: '',
      username: '',
      channel: '',
      contents: '',
      responseflag: '',
    }).toString()

    if (subItemKey) {
      const pathName = subItemKey.split('/')[1]
      if (pathName === 'darkweb') navigate(`/${subItemKey}?${darkwebParams}`)
      else if (pathName === 'telegram')
        navigate(`/${subItemKey}?${telegramParams}`)
      else navigate(`/${subItemKey}`)
    }
  }

  return (
    <HeaderContainer>
      <HeaderContent>
        <NavBar
          menus={menu.list}
          onSubMenuSelect={onSubMenuSelect}
          account={accountInfo.data?.data}
        />
      </HeaderContent>
    </HeaderContainer>
  )
}

export default Header

const HeaderContainer = styled.header`
  width: 100%;
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  border-bottom: 1px solid #f5f5f5;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.04);
  background-color: #fff;
  z-index: 1;

  ${mq.sm} {
    padding-top: 0.5rem;
  }
`

const HeaderContent = styled.div`
  display: flex;
  width: 100%;
  margin: 0 auto;
`
