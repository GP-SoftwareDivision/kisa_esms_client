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
  const [selectedMainMenu, setSelectedMainMenu] = useState<string | null>(null);

  const handleSubMenuClick = (subItem: string) => {
    console.log('sub: ', subItem);
    setSelectedSubMenu(subItem);

    if (onSubMenuSelect) {
      onSubMenuSelect(subItem);
    }
  };

  const handleMainMenuClick = (menuTitle: string) => {
    console.log('main: ', menuTitle);
    setSelectedMainMenu(menuTitle);
    setActiveMenu(menuTitle);
    
    // [질문] 첫 번째 서브메뉴 자동 선택 로직 추가?!
  
  };

  return (
    <nav css={navBarStyle}>
      <ul css={menuListStyle}> {/*메인 메뉴 */}
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
       <ul css={horizontalSubMenuStyle}> {/*서브 메뉴 */}
        {menus.map((menu) => (
          <li
            key={menu.title}
            css={subMenuListStyle(activeMenu === menu.title)}
          >
            {activeMenu === menu.title && menu.subMenu?.items.map((subItem) => ( //활성화된 메인 메뉴 하위에 있는지 확인
              <ul
                key={subItem}
                onClick={() => {
                  handleSubMenuClick(subItem)
                  handleMainMenuClick(menu.title)}} // 서브 메뉴 선택시 상위 메인 메뉴 자동 선택
                css={[
                  subMenuItemStyle,
                  selectedSubMenu === subItem && selectedSubMenuStyle, // 선택된 서브 메뉴 스타일 적용
                ]}
              >
                {subItem}
              </ul>
            ))}
          </li>
        ))}
      </ul>
    </nav>
  );
};

const navBarStyle = css`
  background-color: white;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
`;

const menuListStyle = css`
  list-style: none;
  display: flex;
  gap: 2.5em;
`;

const menuItemStyle = css`
  position: relative;
  color: black;
  cursor: pointer;
  font-weight: bold;
`;

const selectedMainMenuStyle = css`
  font-weight: bold;
  color: #4f79a5;
  border-bottom: 2px solid #4f79a5; //[질문] 이렇게 해도 언더바와 똑같아 보인다..
`;

const horizontalSubMenuStyle = css`
  list-style: none;
  display: flex;
  background-color: #f5f5f5;
  white-space: nowrap;
  width: 100%;
  margin: 0;  // 서브메뉴바의 margin 제거
`;

const subMenuListStyle = (isActive: boolean) => css`
  list-style: none;
  position: relative;
  left: -35px; //[질문] 서브 메뉴를 정렬할 더 정돈된 방법이 없을지..
  display: flex;
  height: 1rem;  // 서브메뉴바의 고정 높이 설정
  visibility: ${isActive ? 'visible' : 'hidden'};
  opacity: ${isActive ? 1 : 0};
  transition: opacity 0.3s ease;
  padding: 1.5rem;
`;

const subMenuItemStyle = css`
padding: 0rem 2rem;
  cursor: pointer;
`;

const selectedSubMenuStyle = css`
  font-weight: bold;
  color: #4f79a5;
`;

export default NavBar;