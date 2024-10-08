import { useState, useEffect } from 'react'
import styled from '@emotion/styled'

import NavBar from '@/components/NavBar.tsx'
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
      title: '메인',
      key: 'mainMenu',
      subMenu: { title: '메인', items: [{ label: '대시보드', key: 'main' }] },
    },
    {
      title: '이슈 대응',
      key: 'issue',
      subMenu: {
        title: '이슈 대응',
        items: [{ label: '대응 이력', key: 'history' }],
      },
    },
    {
      title: '데이터 조회',
      key: 'data',
      subMenu: {
        title: '데이터 조회',
        items: [
          { label: '다크웹', key: 'darkweb' },
          { label: '텔레그램', key: 'telegram' },
        ],
      },
    },
    {
      title: '관리',
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
      <HeaderLogo>
        <img src={'/logo.jpeg'} alt='logo' />
      </HeaderLogo>
      <NavBar menus={menus} onSubMenuSelect={onSubMenuSelect} />
    </HeaderContainer>
  )
}

export default Header

const HeaderContainer = styled.header`
  display: flex;
  position: fixed;
  //left: 12rem;
  top: 0;
  width: 100%;
`

const HeaderLogo = styled.div`
  background-color: #fff;
  padding: 8px 16px;
  height: 6.2rem;
  //width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 8rem;
    height: 3rem;
  }
`
