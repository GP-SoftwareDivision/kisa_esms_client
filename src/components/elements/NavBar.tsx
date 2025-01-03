/** @jsxImportSource @emotion/react */
import { useRef, useState, useEffect, useCallback } from 'react'
import { css } from '@emotion/react'
import { useLocation, useNavigate } from 'react-router-dom'
import styled from '@emotion/styled'
import { mq } from '@/utils/mediaQueries.ts'
import Button from '@/components/elements/Button.tsx'
import { useLoginMutation } from '@/hooks/mutations/useLoginMutation.tsx'

interface SubMenu {
  title: string
  items: { label: string; key: string }[] // 아이템에 label(한글), key(영어) 추가
}

interface Props {
  menus: { label: string; key: string; subMenu?: SubMenu }[]
  onSubMenuSelect?: (subItemKey: string | null) => void // 영어로 선택된 서브메뉴의 키를 전달
  account:
    | {
        name: string
        type: string
      }
    | undefined
}

const NavBar = ({ menus, onSubMenuSelect, account }: Props) => {
  const navigate = useNavigate()
  const location = useLocation()
  const { logout } = useLoginMutation()

  const pathnameRef = useRef(location.pathname.split('/')[1])
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  // 상위 메뉴 현재 상태
  const [activeMenu, setActiveMenu] = useState<string | null>(
    pathnameRef.current
  )

  // 서브 메뉴 열리기 위한 상태
  const [isActiveSubMenu, setIsActiveSubMenu] = useState<boolean>(false)

  // 선택된 서브 메뉴
  const [selectedSubMenu, setSelectedSubMenu] = useState<string | null>(
    location.pathname.split('/')[2]
  )

  const [menuTimer, setMenuTimer] = useState<NodeJS.Timeout | null>(null)

  // 호버만 하고 이동하지 않을 시 메뉴 제 자리
  useEffect(() => {
    pathnameRef.current = location.pathname.split('/')[1]
    setActiveMenu(pathnameRef.current)
    setSelectedSubMenu(location.pathname.split('/')[2])
  }, [location])

  const handleOnMouseLeave = useCallback(() => {
    if (menuTimer) clearTimeout(menuTimer)

    const subMenuTimer = setTimeout(() => {
      setActiveMenu((prev) =>
        prev !== pathnameRef.current ? pathnameRef.current : prev
      )
    }, 2000)

    setMenuTimer(subMenuTimer)
  }, [menuTimer])

  const handleMenuClick = (menuKey: string, subItemKey?: string) => {
    setActiveMenu(menuKey)
    if (subItemKey) {
      setSelectedSubMenu(subItemKey)
      onSubMenuSelect?.(`${menuKey}/${subItemKey}`)
      setIsActiveSubMenu(false)
    }
  }

  // 컴포넌트가 언마운트될 때 타이머 정리
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
      if (menuTimer) clearTimeout(menuTimer)
    }
  }, [timerRef, menuTimer])

  return (
    <NavBarContainer onMouseLeave={() => setIsActiveSubMenu(false)}>
      <NavBarStyle>
        <div css={menuListStyle}>
          <HeaderLogo>
            <img src={'/logo.jpeg'} alt='logo' onClick={() => navigate('/')} />
          </HeaderLogo>
          <div css={listStyle}>
            {menus.map((menu) => (
              <div
                key={menu.key}
                onMouseEnter={() => {
                  setActiveMenu(menu.key)
                  setIsActiveSubMenu(true)
                }}
                onMouseLeave={handleOnMouseLeave}
                css={[
                  menuItemStyle,
                  activeMenu === menu.key && selectedMainMenuStyle, // 메인 메뉴 스타일 적용
                ]}
              >
                {menu.label}
              </div>
            ))}
          </div>
          {account?.name ? (
            <UserInfoContainerStyle>
              <UserNameStyle>{account?.name}님</UserNameStyle>
              <Button
                type={'primary'}
                text={'로그아웃'}
                onClick={logout.mutate}
              />
            </UserInfoContainerStyle>
          ) : (
            <UserInfoContainerStyle />
          )}
        </div>
      </NavBarStyle>
      <HorizontalSubMenuStyle className={isActiveSubMenu ? 'active' : ''}>
        <SublistStyle>
          {menus.map((menu) => (
            <div key={menu.key} css={subMenuListStyle(activeMenu === menu.key)}>
              {activeMenu === menu.key &&
                menu.subMenu?.items.map((subItem) => (
                  <div
                    key={subItem.key}
                    onMouseEnter={() => {
                      setIsActiveSubMenu(true)
                    }}
                    onMouseLeave={handleOnMouseLeave}
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
        </SublistStyle>
      </HorizontalSubMenuStyle>
    </NavBarContainer>
  )
}

const NavBarContainer = styled.div`
  display: flex;
  width: 100%;
  margin: 0 auto;
  flex-direction: column;
`

const NavBarStyle = styled.div`
  background-color: white;
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  display: flex;
  //flex-direction: column;
  align-items: center;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #f5f5f5;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.04);
`

const selectedMainMenuStyle = css`
  font-weight: bold;
  color: #4f79a5;
  border-bottom: 2px solid #4f79a5;
`
const HorizontalSubMenuStyle = styled.nav`
  list-style: none;
  width: 100%;
  justify-content: center;
  background-color: #f5f5f5;
  position: relative;
  overflow: hidden;
  max-height: 0;
  opacity: 0;
  transition:
    max-height 0.3s ease-out,
    opacity 0.3s ease-out;

  &.active {
    max-height: 50px;
    padding: 0.5rem 0;
    opacity: 1;
  }
`

const subMenuListStyle = (isActive: boolean) => css`
  display: flex;
  list-style: none;
  position: relative;
  visibility: ${isActive ? 'visible' : 'hidden'};
  transition: opacity 0.3s ease;
  padding: 0.5rem 0;
  gap: 1.5rem;
  font-size: 14px;
`

const SublistStyle = styled.div`
  display: flex;
  justify-content: center;
  //width: 26rem;
`

const subMenuItemStyle = css`
  cursor: pointer;
`

const selectedSubMenuStyle = css`
  font-weight: bold;
  color: #4f79a5;
`

const UserNameStyle = styled.span`
  ${({ theme }) => theme.typography.body2};
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
    padding: 0.5rem 1rem;
  }

  ${mq.lg} {
    max-width: 960px;
    padding: 0.5rem 1rem;
  }

  ${mq.md} {
    max-width: 720px;
    padding: 0.5rem 1rem;
  }

  ${mq.sm} {
    justify-content: center;
    font-size: 14px;
    padding: 0.3rem 0;
  }
`

const listStyle = css`
  display: flex;
  justify-content: space-between;
  width: 25rem;

  ${mq.md} {
    width: 20rem;
  }

  ${mq.sm} {
    width: 15rem;
  }
`

const menuItemStyle = css`
  position: relative;
  color: black;
  cursor: pointer;
  font-weight: bold;

  ${mq.sm} {
    font-size: 0.9rem;
  }

  ${mq.xs} {
    font-size: 0.8rem;
  }
`

const UserInfoContainerStyle = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  min-width: 140px;

  ${mq.md} {
    gap: 0.5rem;
    button {
      ${({ theme }) => theme.typography.body2} !important;
    }
  }

  ${mq.sm} {
    display: none;
  }
`

const HeaderLogo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 6.5rem;
    height: 2.7rem;
    cursor: pointer;

    ${mq.md} {
      width: 5rem;
      height: 2rem;
    }

    ${mq.sm} {
      display: none;
    }
  }
`

export default NavBar
