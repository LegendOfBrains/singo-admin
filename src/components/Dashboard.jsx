import React, { useState } from 'react';
import Header from './Header';
import FacilityReports from './FacilityReports';
import SchoolLifeReports from './SchoolLifeReports';
import Inquiries from './Inquiries';
import DetailPage from './DetailPage';

export default function Dashboard({ user, onLogout }) {
  const [selectedTab, setSelectedTab] = useState('시설 신고');
  const [currentView, setCurrentView] = useState('list'); // 'list' 또는 'detail'
  const [selectedItem, setSelectedItem] = useState(null);

  const handleItemClick = (itemId, itemType) => {
    setSelectedItem({ id: itemId, type: itemType });
    setCurrentView('detail');
  };

  const handleBackToList = () => {
    setCurrentView('list');
    setSelectedItem(null);
  };

  const handleDelete = (itemId) => {
    // 실제로는 API 호출
    console.log('삭제:', itemId);
    handleBackToList();
  };

  const handleSave = (itemId, status) => {
    // 실제로는 API 호출
    console.log('저장:', itemId, status);
  };

  const renderContent = () => {
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
    <div className="min-h-screen bg-gray-50">
      <Header userName={user.name} onLogout={onLogout} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentView === 'list' && (
          <div className="mb-8">
            <nav className="flex space-x-8">
              {['시설 신고', '학교생활 신고', '문의사항'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setSelectedTab(tab)}
                  className={`pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    selectedTab === tab
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>
        )}

        {renderContent()}
      </div>
    </div>
  );
}