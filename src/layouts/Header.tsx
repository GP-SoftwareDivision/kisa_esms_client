import { useState, useEffect } from 'react'
import styled from '@emotion/styled'

import NavBar from '@/components/elements/NavBar.tsx'
import { useNavigate } from 'react-router-dom'

const Header = () => {
  const [selectedSubMenu, setSelectedSubMenu] = useState<string | null>(null)
  const navigate = useNavigate()

  const onSubMenuSelect = (subItemKey: string | null) => {
    setSelectedSubMenu(subItemKey)
    if (subItemKey) {
      navigate(`/${subItemKey}`) // 서브 메뉴 클릭 시 도메인 변경
    }
  }

  useEffect(() => {
    if (selectedSubMenu) {
      console.log('부모 컴포넌트에서 받은 메뉴: ', selectedSubMenu)
    }
  }, [selectedSubMenu])

  const menus = [
    {
      label: '메인',
      key: 'mainMenu',
      subMenu: { title: '메인', items: [{ label: '대시보드', key: 'main' }] },
    },
    {
      label: '이슈 대응',
      key: 'issue',
      subMenu: {
        title: '이슈 대응',
        items: [{ label: '대응 이력', key: 'tracking' }],
      },
    },
    {
      label: '데이터 조회',
      key: 'retrieve',
      subMenu: {
        title: '데이터 조회',
        items: [
          { label: '다크웹', key: 'darkweb' },
          { label: '텔레그램', key: 'telegram' },
        ],
      },
    },
    {
      label: '관리',
      key: 'management',
      subMenu: {
        title: '관리',
        items: [
          { label: '유저 관리', key: 'user' },
          { label: '알림 관리', key: 'alert' },
          { label: '수집 키워드 관리', key: 'keyword' },
          { label: '룰셋 관리', key: 'ruleset' },
          { label: '스케줄 관리', key: 'schedule' },
        ],
      },
    },
  ]

  return (
    <HeaderContainer>
      <HeaderContent>
        <HeaderLogo>
          <img src={'/logo.jpeg'} alt='logo' />
        </HeaderLogo>
        <NavBar menus={menus} onSubMenuSelect={onSubMenuSelect} />
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
`

const HeaderContent = styled.div`
  display: flex;
  padding: 0 4rem;
`

const HeaderLogo = styled.div`
  padding: 8px 16px;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 9rem;
    height: 3.5rem;
  }
`
// #061f5c
