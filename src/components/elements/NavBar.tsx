/** @jsxImportSource @emotion/react */
import { useState, useEffect } from 'react'
import { css } from '@emotion/react'
import { useLocation } from 'react-router-dom'
import styled from '@emotion/styled'
import { mq } from '@/utils/mediaQueries.ts'

interface SubMenu {
  title: string
  items: { label: string; key: string }[] // 아이템에 label(한글), key(영어) 추가
}

interface Props {
  menus: { label: string; key: string; subMenu?: SubMenu }[]
  onSubMenuSelect?: (subItemKey: string | null) => void // 영어로 선택된 서브메뉴의 키를 전달
}

const NavBar = ({ menus, onSubMenuSelect }: Props) => {
  const location = useLocation()
  const pathname = location.pathname.split('/')
  const [activeMenu, setActiveMenu] = useState<string | null>(pathname[1])
  const [selectedSubMenu, setSelectedSubMenu] = useState<string | null>(
    pathname[2]
  )
  const handleMenuClick = (menuKey: string, subItemKey?: string) => {
    setActiveMenu(menuKey)
    if (subItemKey) {
      setSelectedSubMenu(subItemKey)
      onSubMenuSelect?.(`${menuKey}/${subItemKey}`)
    }
  }

  useEffect(() => {
    const path = location.pathname.split('/')[1]
    console.log(path)
    if (path) {
      const matchingMenu = menus.find((menu) =>
        menu.subMenu?.items.some((subItem) => subItem.key === path)
      )
      if (matchingMenu) {
        //상태 동기화
        setActiveMenu(matchingMenu.key)
        setSelectedSubMenu(path)
      }
    }
  }, [menus, location])

  const handlePositionSubMenu = (num: number): number => {
    const positions = [20, 118, 250, 391]
    return positions[num] ?? 0
  }

  return (
    <nav css={navBarStyle}>
      <div css={menuListStyle}>
        <HeaderLogo>
          <img src={'/logo.jpeg'} alt='logo' />
        </HeaderLogo>
        <div css={listStyle}>
          {menus.map((menu) => (
            <div
              key={menu.key}
              onMouseEnter={() => setActiveMenu(menu.key)}
              onClick={() => handleMenuClick(menu.key)}
              css={[
                menuItemStyle,
                activeMenu === menu.key && selectedMainMenuStyle, // 메인 메뉴 스타일 적용
              ]}
            >
              {menu.label}
            </div>
          ))}
        </div>
        <div>
          <span>admin</span>
          <button>로그아웃</button>
        </div>
      </div>
      <div css={horizontalSubMenuStyle}>
        <div css={SublistStyle}>
          {menus.map((menu, index) => (
            <div
              key={menu.key}
              css={subMenuListStyle(
                activeMenu === menu.key,
                handlePositionSubMenu(index)
              )}
            >
              {activeMenu === menu.key &&
                menu.subMenu?.items.map((subItem) => (
                  <div
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
                  </div>
                ))}
            </div>
          ))}
        </div>
      </div>
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
  display: flex;
  flex-direction: column;
  align-items: center;
`

const menuListStyle = () => css`
  width: 100%;
  list-style: none;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 0.5rem 0;
  font-size: 16px;
  margin: 0 auto;
  max-width: 1240px;

  ${mq.xxl} {
    max-width: 1400px;
  }

  ${mq.lg} {
    max-width: 960px;
  }

  ${mq.md} {
    max-width: 720px;
  }
`

const listStyle = css`
  display: flex;
  justify-content: space-between;
  width: 25rem;
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
  width: 100%;
  justify-content: center;
  background-color: #f5f5f5;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.04);
  position: relative;
  height: 40px;
  align-items: center;
`

const subMenuListStyle = (isActive: boolean, index: number) => css`
  display: flex;
  list-style: none;
  position: relative;
  visibility: ${isActive ? 'visible' : 'hidden'};
  transition: opacity 0.3s ease;
  padding: 0.5rem 0;
  gap: 1.5rem;
  left: ${index}px;
  font-size: 14px;
`

const SublistStyle = css`
  display: flex;
  width: 26rem;
`

const subMenuItemStyle = css`
  cursor: pointer;
`

const selectedSubMenuStyle = css`
  font-weight: bold;
  color: #4f79a5;
`
const HeaderLogo = styled.div`
  padding: 8px 16px;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 6.5rem;
    height: 2.7rem;
  }
`
export default NavBar
