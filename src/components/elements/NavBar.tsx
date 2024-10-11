/** @jsxImportSource @emotion/react */
import { useState, useEffect } from 'react'
import { css } from '@emotion/react'
import { useLocation } from 'react-router-dom'

interface SubMenu {
  title: string
  items: { label: string; key: string }[] // 아이템에 label(한글), key(영어) 추가
}

interface Props {
  menus: { label: string; key: string; subMenu?: SubMenu }[]
  onSubMenuSelect?: (subItemKey: string | null) => void // 영어로 선택된 서브메뉴의 키를 전달
}

const NavBar = ({ menus, onSubMenuSelect }: Props) => {
  const [activeMenu, setActiveMenu] = useState<string | null>('메인')
  const [selectedSubMenu, setSelectedSubMenu] = useState<string | null>('main')

  const location = useLocation()

  const handleMenuClick = (menuKey: string, subItemKey?: string) => {
    setActiveMenu(menuKey)
    if (subItemKey) {
      setSelectedSubMenu(subItemKey)
      onSubMenuSelect?.(subItemKey)
    }
  }

  // URL에서 현재 경로를 가져오고, 메뉴와 서브메뉴의 상태를 설정한다.
  useEffect(() => {
    const path = location.pathname.split('/')[1] // URL의 경로 가져오기
    console.log(path)
    if (path) {
      // URL에 맞는 메뉴와 서브 메뉴 찾기
      const matchingMenu = menus.find((menu) =>
        menu.subMenu?.items.some((subItem) => subItem.key === path)
      )
      console.log(matchingMenu)
      if (matchingMenu) {
        //상태 동기화
        setActiveMenu(matchingMenu.key)
        setSelectedSubMenu(path)
      }
    }
  }, [menus, location])

  const handlePositionSubMenu = (num: number): number => {
    const positions = [10, 115, 250, 390]
    return positions[num] ?? 0
  }

  return (
    <nav css={navBarStyle}>
      <ul css={menuListStyle}>
        {/* 메인 메뉴 */}
        {menus.map((menu) => (
          <li
            key={menu.key}
            onMouseEnter={() => setActiveMenu(menu.key)}
            onClick={() => handleMenuClick(menu.key)}
            css={[
              menuItemStyle,
              activeMenu === menu.key && selectedMainMenuStyle, // 메인 메뉴 스타일 적용
            ]}
          >
            {menu.label}
          </li>
        ))}
      </ul>
      <ul css={horizontalSubMenuStyle}>
        {/* 서브 메뉴 */}
        {menus.map((menu, index) => (
          <li
            key={menu.key}
            css={subMenuListStyle(
              activeMenu === menu.key,
              handlePositionSubMenu(index)
            )}
          >
            {activeMenu === menu.key &&
              menu.subMenu?.items.map((subItem) => (
                <ul
                  key={subItem.key}
                  onClick={() => {
                    handleMenuClick(menu.key, subItem.key)
                  }} // 서브 메뉴 선택 시
                  css={[
                    subMenuItemStyle,
                    selectedSubMenu === subItem.key && selectedSubMenuStyle, // 선택된 서브 메뉴 스타일 적용
                  ]}
                >
                  {subItem.label}
                </ul>
              ))}
          </li>
        ))}
      </ul>
    </nav>
  )
}

const navBarStyle = css`
  background-color: white;
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  justify-content: space-around;
  padding: 10px 0;
`

const menuListStyle = css`
  list-style: none;
  display: flex;
  gap: 2.5em;
  padding: 1rem;
`

const menuItemStyle = css`
  position: relative;
  margin: 0 1rem;
  color: black;
  cursor: pointer;
  font-weight: bold;
`

const selectedMainMenuStyle = css`
  font-weight: bold;
  color: #4f79a5;
  border-bottom: 2px solid #4f79a5;
`

const horizontalSubMenuStyle = css`
  list-style: none;
  display: flex;
  //background-color: #f5f5f5;
  //border-bottom: 1px solid #f5f5f5;
  padding: 0 1rem;
`

const subMenuListStyle = (isActive: boolean, index: number) => css`
  display: flex;
  list-style: none;
  position: relative;
  height: 1rem; // 서브메뉴 높이 고정
  visibility: ${isActive ? 'visible' : 'hidden'};
  transition: opacity 0.3s ease;
  padding: 1rem 0;
  gap: 2rem;
  left: ${index}px;
`

const subMenuItemStyle = css`
  cursor: pointer;
`

const selectedSubMenuStyle = css`
  font-weight: bold;
  color: #4f79a5;
`

export default NavBar
