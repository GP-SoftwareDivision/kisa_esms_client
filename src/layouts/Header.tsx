import { useState } from 'react'
import styled from '@emotion/styled'

import NavBar from '@/components/NavBar.tsx'

const Header = () => {
  const [selectedSubMenu, setSelectedSubMenu] = useState<string | null>(null)

  const onSubMenuSelect = (subItem: string | null) => {
    console.log('부모 컴포넌트에서 받은 메뉴: ', selectedSubMenu)
    setSelectedSubMenu(subItem)
  }

  const menus = [
    {
      title: '메인',
      subMenu: { title: '메인', items: ['대시보드'] },
    },
    {
      title: '이슈 대응',
      subMenu: { title: '이슈 대응', items: ['대응 이력'] },
    },
    {
      title: '데이터 조회',
      subMenu: { title: '데이터 조회', items: ['전체', '다크웹', '텔레그램'] },
    },
    {
      title: '관리',
      subMenu: {
        title: '관리',
        items: [
          '유저 관리',
          '알림 관리',
          '수집 키워드 관리',
          '룰셋 관리',
          '스케줄 관리',
        ],
      },
    },
  ]

  return (
    <HeaderContainer>
      <NavBar menus={menus} onSubMenuSelect={onSubMenuSelect} />
    </HeaderContainer>
  )
}

export default Header

const HeaderContainer = styled.div`
  display: flex;
  position: fixed;
  left: 12rem;
  top: 0;
  width: 100%;
`
