import React, { useState, useEffect } from 'react';
import { ArrowLeft, ChevronDown } from 'lucide-react';
import './DetailPage.css'; // CSS 파일 불러오기

export default function DetailPage({ itemId, itemType, onBack, onDelete, onSave }) {
  // 상태 관리
  const [item, setItem] = useState(null); // 선택된 항목 데이터
  const [currentStatus, setCurrentStatus] = useState(''); // 현재 상태
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // 드롭다운 열림/닫힘 상태

  // 항목 타입에 따른 상태 옵션 반환
  const getStatusOptions = () => {
    if (itemType === '문의사항') {
      return ['답변 완료', '답변 안함'];
    }
    return ['접수 중', '처리 예정', '처리 완료'];
  };

  // 항목 타입에 따른 필드 라벨 반환
  const getFieldLabels = () => {
    if (itemType === '문의사항') {
      return {
        content: '문의 내용',
        reporter: '문의자',
        date: '문의일'
      };
    }
    return {
      content: '신고 내용',
      reporter: '신고자',
      date: '신고일'
    };
  };

  // 컴포넌트가 처음 렌더링되거나 itemId가 변경될 때 실행
  useEffect(() => {
    // 실제로는 서버에서 데이터를 가져오지만, 지금은 가짜 데이터 사용
    const mockData = {
      1: {
        id: 1,
        content: '2학년 3반 에어컨이 고장났어요ㅠㅠㅠㅠㅠ\n\n급하게 수리가 필요합니다. 더운 날씨에 학생들이 힘들어하고 있어요. 빠른 조치 부탁드립니다.',
        reporter: '서진교',
        date: '2025.06.24',
        status: '접수 중'
      },
      2: {
        id: 2,
        content: '2학년 복도 정수기에서 이상한 맛이 나요ㅠㅠㅠㅠㅠ\n\n물에서 비린내가 나고 색깔도 조금 이상해 보여요. 확인 부탁드립니다.',
        reporter: '신민재',
        date: '2025.06.23',
        status: '처리 예정'
      }
    };

    // 해당 ID의 데이터가 있으면 상태에 저장
    if (mockData[itemId]) {
      setItem(mockData[itemId]);
      setCurrentStatus(mockData[itemId].status);
    }
  }, [itemId]); // itemId가 변경될 때마다 실행

  // 상태 변경 처리 함수
  const handleStatusChange = (newStatus) => {
    setCurrentStatus(newStatus);
    setIsDropdownOpen(false); // 드롭다운 닫기
  };

  // 저장 버튼 클릭 처리
  const handleSave = () => {
    if (onSave) {
      onSave(itemId, currentStatus);
    }
    alert('저장되었습니다.');
  };

  // 삭제 버튼 클릭 처리
  const handleDelete = () => {
    if (confirm('정말로 삭제하시겠습니까?')) {
      if (onDelete) {
        onDelete(itemId);
      }
    }
  };

  // 상태에 따른 색상 클래스 반환 함수
  const getStatusColor = (status) => {
    if (itemType === '문의사항') {
      switch (status) {
        case '답변 완료':
          return 'status-completed';
        case '답변 안함':
          return 'status-not-answered';
        default:
          return 'status-default';
      }
    }

    switch (status) {
      case '접수 중':
        return 'status-received';
      case '처리 예정':
        return 'status-scheduled';
      case '처리 완료':
        return 'status-completed';
      default:
        return 'status-default';
    }
  };

  // 데이터가 로딩 중일 때 표시
  if (!item) {
    return (
      <div className="loading-container">
        <p className="loading-text">로딩 중...</p>
      </div>
    );
  }

  const labels = getFieldLabels();
  const statusOptions = getStatusOptions();
  const [title, ...bodyLines] = item.content.split('\n');

  return (
    <div className="detail-page-container">
      {/* 뒤로가기 버튼 */}
      <div className="back-button-container">
        <button
          onClick={onBack}
          className="back-button"
        >
          <ArrowLeft className="back-icon" />
          <span>목록으로 돌아가기</span>
        </button>
      </div>

      {/* 메인 컨텐츠 카드 */}
      <div className="detail-card">
        {/* 헤더 - 삭제 버튼 */}
        <div className="card-header">
          <button
            onClick={handleDelete}
            className="delete-button"
          >
            글 삭제
          </button>
        </div>

        {/* 내용 영역 */}
        <div className="card-content">
          <div className="content-grid">
            {/* 왼쪽: 상세 내용 */}
            <div className="content-left">
              <div className="content-details">
                {/* 제목 + 작성자/날짜 */}
                <div className="title-section">
                  <h2 className="item-title">{title}</h2>
                  <p className="item-meta">{item.reporter} | {item.date}</p>
                </div>

                {/* 본문 내용 */}
                <div className="item-body">
                  {bodyLines.join('\n')}
                </div>
              </div>
            </div>

            {/* 오른쪽: 현황 관리 */}
            <div className="content-right">
              <div className="status-panel">
                <h3 className="status-title">
                  현황 관리
                </h3>

                <div className="status-controls">
                  <div className="status-field">
                    <label className="status-label">
                      현재 상태
                    </label>
                    <div className="dropdown-container">
                      <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="dropdown-button"
                      >
                        <span className={`status-badge ${getStatusColor(currentStatus)}`}>
                          {currentStatus}
                        </span>
                        <ChevronDown className={`dropdown-icon ${isDropdownOpen ? 'dropdown-icon-open' : ''}`} />
                      </button>

                      {/* 드롭다운 메뉴 */}
                      {isDropdownOpen && (
                        <div className="dropdown-menu">
                          {statusOptions.map((status) => (
                            <button
                              key={status}
                              onClick={() => handleStatusChange(status)}
                              className="dropdown-item"
                            >
                              <span className={`status-badge ${getStatusColor(status)}`}>
                                {status}
                              </span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* 저장 버튼 */}
                  <div className="save-button-container">
                    <button
                      onClick={handleSave}
                      className="save-button"
                    >
                      저장
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}