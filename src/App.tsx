import React, { useState } from 'react';
import NavBar from './components/NavBar';

const App: React.FC = () => {

  const [selectedSubMenu, setSelectedSubMenu] = useState<string | null>(null);

  const onSubMenuSelect = (subItem: string | null) => {
    console.log('부모 컴포넌트에서 받은 메뉴: ', subItem);
    setSelectedSubMenu(subItem);
  };

  const menus = [
    {
      title: '메인',
      subMenu: {title: '메인', items: ['대시보드'] },
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
      subMenu: { title: '관리', items: ['유저 관리', '알림 관리', '수집 키워드 관리', '룰셋 관리', '스케줄 관리'] },
    },
  ];

  return (
    <div>
      <NavBar menus={menus} onSubMenuSelect={onSubMenuSelect} />
      <h1>대시보드</h1>
      <p>전달된 메뉴: {selectedSubMenu}</p>
    </div>
  );
};

export default App;