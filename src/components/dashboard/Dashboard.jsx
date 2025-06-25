import React, { useState } from 'react';
import Header from '../common/Header';
import FacilityReports from './FacilityReports';
import SchoolLifeReports from './SchoolLifeReports';
import Inquiries from './Inquiries';
import DetailPage from '../detailPage/DetailPage';
import './Dashboard.css'; // CSS 파일 불러오기

export default function Dashboard({ user, onLogout }) {
  // 상태 관리
  const [selectedTab, setSelectedTab] = useState('시설 신고'); // 현재 선택된 탭
  const [currentView, setCurrentView] = useState('list'); // 현재 화면 ('list' 또는 'detail')
  const [selectedItem, setSelectedItem] = useState(null); // 선택된 항목 정보

  // 아이템 클릭 시 상세 페이지로 이동하는 함수
  const handleItemClick = (itemId, itemType) => {
    setSelectedItem({ id: itemId, type: itemType });
    setCurrentView('detail');
  };

  // 목록으로 돌아가는 함수
  const handleBackToList = () => {
    setCurrentView('list');
    setSelectedItem(null);
  };

  // 아이템 삭제 처리 함수
  const handleDelete = (itemId) => {
    // 실제로는 API 호출
    console.log('삭제:', itemId);
    handleBackToList();
  };

  // 아이템 저장 처리 함수
  const handleSave = (itemId, status) => {
    // 실제로는 API 호출
    console.log('저장:', itemId, status);
  };

  // 현재 상태에 따라 적절한 컨텐츠를 렌더링하는 함수
  const renderContent = () => {
    // 상세 페이지 표시
    if (currentView === 'detail' && selectedItem) {
      return (
        <DetailPage
          itemId={selectedItem.id}
          itemType={selectedItem.type}
          onBack={handleBackToList}
          onDelete={handleDelete}
          onSave={handleSave}
        />
      );
    }

    // 선택된 탭에 따라 해당 컴포넌트 표시
    switch (selectedTab) {
      case '시설 신고':
        return <FacilityReports onItemClick={(id) => handleItemClick(id, '시설 신고')} />;
      case '학교생활 신고':
        return <SchoolLifeReports onItemClick={(id) => handleItemClick(id, '학교생활 신고')} />;
      case '문의사항':
        return <Inquiries onItemClick={(id) => handleItemClick(id, '문의사항')} />;
      default:
        return <FacilityReports onItemClick={(id) => handleItemClick(id, '시설 신고')} />;
    }
  };

  return (
    <div className="dashboard-container">
      {/* 헤더 컴포넌트 */}
      <Header userName={user.name} onLogout={onLogout} />
      
      {/* 메인 컨텐츠 영역 */}
      <div className="dashboard-content">
        {/* 탭 네비게이션 (목록 화면에서만 표시) */}
        {currentView === 'list' && (
          <div className="tab-navigation-container">
            <nav className="tab-navigation">
              {['시설 신고', '학교생활 신고', '문의사항'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setSelectedTab(tab)}
                  className={`tab-button ${
                    selectedTab === tab ? 'tab-button-active' : 'tab-button-inactive'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>
        )}

        {/* 동적 컨텐츠 렌더링 */}
        {renderContent()}
      </div>
    </div>
  );
}