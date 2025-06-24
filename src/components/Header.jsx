import React from 'react';
import { LogOut } from 'lucide-react';
import Logo from '../assets/mini-logo.png'; // 로고 이미지 경로

export default function Header({ userName = "쇼타로 선생님", onLogout }) {
  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    } else {
      console.log('로그아웃');
    }
  };

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex items-center space-x-2">
              <img 
                src={Logo}
                alt="신GO! 미니 로고"
                className="mx-auto h-10 w-13 rounded-xl"
                />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-gray-700 font-medium">{userName}</span>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>로그아웃</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}