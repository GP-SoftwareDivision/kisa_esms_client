/** @jsxImportSource @emotion/react */
import { useState } from 'react'
import { css } from '@emotion/react'

interface SubMenu {
  title: string
  items: string[]
}

interface Props {
  menus: { title: string; subMenu?: SubMenu }[]
  onSubMenuSelect?: (subItem: string | null) => void // 선택된 서브 메뉴를 부모 컴포넌트로 전달하는 콜백 함수
}

const NavBar = ({ menus, onSubMenuSelect }: Props) => {
  const [activeMenu, setActiveMenu] = useState<string | null>('메인')
  const [selectedMainMenu, setSelectedMainMenu] = useState<string | null>(
    '메인'
  )
  const [selectedSubMenu, setSelectedSubMenu] = useState<string | null>(
    '대시보드'
  )

  const handleSubMenuClick = (subItem: string) => {
    setSelectedSubMenu(subItem)

    if (onSubMenuSelect) {
      onSubMenuSelect(subItem)
    }
  }

  const handleMainMenuClick = (menuTitle: string) => {
    setSelectedMainMenu(menuTitle)
    setActiveMenu(menuTitle)
  }

  const handlePositionSubMenu = (num: number): number => {
    const positions = [0, 68, 170, 280]
    return positions[num] ?? 0
  }

  return (
    <nav css={navBarStyle}>
      <ul css={menuListStyle}>
        {/*메인 메뉴 */}
        {menus.map((menu) => (
          <li
            key={menu.title}
            onMouseEnter={() => setActiveMenu(menu.title)}
            onClick={() => handleMainMenuClick(menu.title)}
            css={[
              menuItemStyle,
              selectedMainMenu === menu.title && selectedMainMenuStyle, // 메인 메뉴 스타일 적용
            ]}
          >
            {menu.title}
          </li>
        ))}
      </ul>
      <ul css={horizontalSubMenuStyle}>
        {/*서브 메뉴 */}
        {menus.map((menu, index) => (
          <li
            key={menu.title}
            css={subMenuListStyle(
              activeMenu === menu.title,
              handlePositionSubMenu(index)
            )}
          >
            {activeMenu === menu.title &&
              menu.subMenu?.items.map(
                (
                  subItem //활성화된 메인 메뉴 하위에 있는지 확인
                ) => (
                  <ul
                    key={subItem}
                    onClick={() => {
                      handleSubMenuClick(subItem)
                      handleMainMenuClick(menu.title)
                    }} // 서브 메뉴 선택시 상위 메인 메뉴 자동 선택
                    css={[
                      subMenuItemStyle,
                      selectedSubMenu === subItem && selectedSubMenuStyle, // 선택된 서브 메뉴 스타일 적용
                    ]}
                  >
                    {subItem}
                  </ul>
                )
              )}
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
  padding: 0 1rem;
`

const menuItemStyle = css`
  position: relative;
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
  background-color: #f5f5f5;
  padding: 0 1rem;
`

const subMenuListStyle = (isActive: boolean, index: number) => css`
  display: flex;
  list-style: none;
  position: relative;
  visibility: ${isActive ? 'visible' : 'hidden'};
  transition: opacity 0.3s ease;
  padding: 1rem 0;
  gap: 2rem;
  left: ${index}px;
`

const subMenuItemStyle = css`
  //padding: 0 1rem;
  cursor: pointer;
`

const selectedSubMenuStyle = css`
  font-weight: bold;
  color: #4f79a5;
`

export default NavBar
