import React from 'react';
import { LogOut } from 'lucide-react'; // 로그아웃 아이콘
import './Header.css'; // CSS 파일 import
import Logo from '../assets/mini-logo.png'; // 미니 로고 이미지

export default function Header({ userName = "쇼타로 선생님", onLogout }) {
  // 로그아웃 버튼 클릭 처리
  const handleLogout = () => {
    if (onLogout) {
      onLogout(); // 부모 컴포넌트의 로그아웃 함수 실행
    } else {
      console.log('로그아웃'); // 함수가 없으면 콘솔에 출력
    }
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-content">
          {/* 왼쪽: 로고 영역 */}
          <div className="logo-section">
            <div className="logo-wrapper">
              <img 
                src={Logo}
                alt="신GO! 미니 로고"
                className="header-logo"
              />
            </div>
          </div>
          
          {/* 오른쪽: 사용자 정보 + 로그아웃 버튼 */}
          <div className="user-section">
            {/* 사용자 이름 표시 */}
            <span className="user-name">{userName}</span>
            
            {/* 로그아웃 버튼 */}
            <button
              onClick={handleLogout}
              className="logout-button"
            >
              <LogOut className="logout-icon" />
              <span>로그아웃</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}