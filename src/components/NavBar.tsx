/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { css } from '@emotion/react';

interface SubMenu {
  title: string;
  items: string[];
}

interface Props {
  menus: { title: string; subMenu?: SubMenu }[]; 
  onSubMenuSelect?: (subItem: string | null) => void; // 선택된 서브 메뉴를 부모 컴포넌트로 전달하는 콜백 함수
}


const NavBar: React.FC<Props> = ({ menus, onSubMenuSelect }) => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [selectedSubMenu, setSelectedSubMenu] = useState<string | null>(null);

  const handleMenuClick = (menuTitle: string, subItem?: string) => {
    setActiveMenu(menuTitle);
    if (subItem) {
      setSelectedSubMenu(subItem);
      onSubMenuSelect?.(subItem);
    }
  };

  const subMenuPosition = (index: number) => {
    const position = [5, 117, 270, 430]
    return position [index ?? 0]
  };

  return (
    <nav css={navBarStyle}>
      <ul css={menuListStyle}> {/*메인 메뉴 */}
        {menus.map((menu) => (
          <li
            key={menu.title}
            onMouseEnter={() => setActiveMenu(menu.title)}
            onClick={() => handleMenuClick(menu.title)} 
            css={[
              menuItemStyle,
              activeMenu === menu.title && selectedMainMenuStyle, // 메인 메뉴 스타일 적용
            ]}
          >
            {menu.title}
          </li>
        ))}
      </ul>
       <ul css={horizontalSubMenuStyle}> {/*서브 메뉴 */}
        {menus.map((menu, index) => (
          <li
            key={menu.title}
            css={subMenuListStyle(activeMenu === menu.title, subMenuPosition(index))}
          >
            {activeMenu === menu.title && menu.subMenu?.items.map((subItem) => ( //활성화된 메인 메뉴 하위에 있는지 확인
              <div
                key={subItem}
                onClick={() => {
                  handleMenuClick(menu.title, subItem)}}
                css={[
                  subMenuItemStyle,
                  selectedSubMenu === subItem && selectedSubMenuStyle, // 선택된 서브 메뉴 스타일 적용
                ]}
              >
                {subItem}
              </div>
            ))}
          </li>
        ))}
      </ul>
    </nav>
  );
};

const navBarStyle = css`
  background-color: white;
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  justify-content: space-around;
  padding: 10px 0;
`;

const menuListStyle = css`
  list-style: none;
  display: flex;
  gap: 2.5rem;
`;

const menuItemStyle = css`
  position: relative;
  margin: 0rem 1rem;
  color: black;
  cursor: pointer;
  font-weight: bold;
  font-size: 18px; 
`;

const selectedMainMenuStyle = css`
  font-weight: bold;
  color: #4f79a5;
  border-bottom: 1px solid #4f79a5; 
`;

const horizontalSubMenuStyle = css`
  list-style: none;
  display: flex;
  background-color: #f5f5f5;
  white-space: nowrap;
  width: 100%;
  margin: 0; 
`;

const subMenuListStyle = (isActive: boolean, index: number) => css`
  display: flex;
  position: relative;
  left: ${ index }px;
  padding: 1.5rem 0rem;
  gap: 2.5rem;
  height: 1rem;  
  visibility: ${isActive ? 'visible' : 'hidden'};
  opacity: ${isActive ? 1 : 0};
  transition: opacity 0.3s ease;
`;

const subMenuItemStyle = css`
  cursor: pointer; 
  padding-left: 10px;
`;

const selectedSubMenuStyle = css`
  font-weight: bold;
  color: #4f79a5;
`;

export default NavBar;