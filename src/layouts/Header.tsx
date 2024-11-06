import { useNavigate } from 'react-router-dom'
import styled from '@emotion/styled'

import menu from '@/data/menu.json'
import NavBar from '@/components/elements/NavBar.tsx'
import { mq } from '@/utils/mediaQueries.ts'
import { useQueryHandler } from '@/hooks/useQueryHandler.tsx'

interface UserInfoType {
  name: string
  type: string
}

const Header = () => {
  const navigate = useNavigate()

  // 유저 정보
  const accountInfo = useQueryHandler<{ data: UserInfoType }>({
    method: 'POST',
    url: '/api/loginInfo',
  })

  const onSubMenuSelect = (subItemKey: string | null) => {
    if (subItemKey) {
      navigate(`/${subItemKey}`)
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
    margin-top: 1.5rem;
  }
`

const HeaderContent = styled.div`
  display: flex;
  width: 100%;
  margin: 0 auto;
`
