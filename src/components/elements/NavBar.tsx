/** @jsxImportSource @emotion/react */
import { useRef, useState, useEffect } from 'react'
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
  const location = useLocation()
  const navigate = useNavigate()
  const { logout } = useLoginMutation()

  // const pathname = location.pathname.split('/')
  const pathnameRef = useRef(location.pathname.split('/')[1])
  const [activeMenu, setActiveMenu] = useState<string | null>(
    pathnameRef.current
  )
  const [selectedSubMenu, setSelectedSubMenu] = useState<string | null>(
    location.pathname.split('/')[2]
  )
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null) // 호버만 하고 이동하지 않을 시 메뉴 제 자리

  useEffect(() => {
    pathnameRef.current = location.pathname.split('/')[1]
    setActiveMenu(pathnameRef.current)
    setSelectedSubMenu(location.pathname.split('/')[2])
  }, [location])

  const handleOnMouseLeave = () => {
    if (timer) clearTimeout(timer)

    const newTimer = setTimeout(() => {
      setActiveMenu((prevActiveMenu) => {
        if (prevActiveMenu !== pathnameRef.current) {
          return pathnameRef.current
        }
        return prevActiveMenu
      })
    }, 2000)

    setTimer(newTimer)
  }

  const handleMenuClick = (menuKey: string, subItemKey?: string) => {
    setActiveMenu(menuKey)
    if (subItemKey) {
      setSelectedSubMenu(subItemKey)
      onSubMenuSelect?.(`${menuKey}/${subItemKey}`)
    }
  }

  // 컴포넌트가 언마운트될 때 타이머 정리
  useEffect(() => {
    return () => {
      if (timer) clearTimeout(timer)
    }
  }, [timer])

  return (
    <nav css={navBarStyle}>
      <div css={menuListStyle}>
        <HeaderLogo>
          <img src={'/logo.jpeg'} alt='logo' onClick={() => navigate('/')} />
        </HeaderLogo>
        <div css={listStyle}>
          {menus.map((menu) => (
            <div
              key={menu.key}
              onMouseEnter={() => setActiveMenu(menu.key)}
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
      <div css={horizontalSubMenuStyle}>
        <div css={SublistStyle}>
          {menus.map((menu) => (
            <div key={menu.key} css={subMenuListStyle(activeMenu === menu.key)}>
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

const SublistStyle = css`
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
