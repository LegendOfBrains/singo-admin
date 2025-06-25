import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import './Inquiries.css'; // CSS 파일 불러오기

export default function Inquiries({ onItemClick }) {
  // 상태 관리 - 데이터를 저장하는 곳
  const [searchTerm, setSearchTerm] = useState(''); // 검색어 입력값
  const [inquiries, setInquiries] = useState([]); // 문의사항 목록 데이터

  // 컴포넌트가 처음 렌더링될 때 실행되는 함수
  useEffect(() => {
    // 실제로는 서버에서 데이터를 가져오지만, 지금은 가짜 데이터 사용
    const mockData = [
      {
        id: 1,
        content: '급식 메뉴는 어떻게 결정되나요?',
        inquirer: '쇼타로',
        date: '2025.06.23',
        status: '답변 완료'
      },
      {
        id: 2,
        content: '체육복 구매는 어디서 하나요?',
        inquirer: '송은석',
        date: '2025.06.23',
        status: '답변 안함'
      },
      {
        id: 3,
        content: '학교 시설 이용 시간이 궁금합니다',
        inquirer: '정성찬',
        date: '2025.06.22',
        status: '답변 완료'
      },
      {
        id: 4,
        content: '방과후 수업 신청은 언제부터 가능한가요?',
        inquirer: '박원빈',
        date: '2025.06.22',
        status: '답변 안함'
      },
      {
        id: 5,
        content: '학교 앞 교통 안전에 대해 문의드립니다',
        inquirer: '이소희',
        date: '2025.06.21',
        status: '답변 완료'
      },
      {
        id: 6,
        content: '교복 수선은 어디서 받을 수 있나요?',
        inquirer: '이찬영',
        date: '2025.06.21',
        status: '답변 안함'
      }
    ];
    setInquiries(mockData); // 가짜 데이터를 inquiries 상태에 저장
  }, []); // 빈 배열이므로 컴포넌트가 처음 렌더링될 때만 실행

  // 상태에 따른 색상 결정 함수
  const getStatusColor = (status) => {
    switch (status) {
      case '답변 완료':
        return 'status-completed'; // 완료 상태 CSS 클래스
      case '답변 안함':
        return 'status-pending'; // 미완료 상태 CSS 클래스
      default:
        return 'status-default'; // 기본 상태 CSS 클래스
    }
  };

  // 검색 기능 - 문의 내용이나 문의자 이름으로 필터링
  const filteredInquiries = inquiries.filter(inquiry =>
    inquiry.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inquiry.inquirer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="inquiries-container">
      {/* 상단 헤더 부분 - 제목과 검색창 */}
      <div className="inquiries-header">
        <h1 className="page-title">문의사항</h1>
        <div className="search-container">
          <Search className="search-icon" />
          <input
            type="text"
            placeholder="검색어를 입력해 주세요"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      {/* 문의사항 목록 테이블 */}
      <div className="inquiries-table">
        {/* 테이블 헤더 */}
        <div className="table-header">
          <div className="header-row">
            <div className="header-content">문의 내용</div>
            <div className="header-inquirer">문의자</div>
            <div className="header-date">문의일</div>
            <div className="header-status">현황</div>
          </div>
        </div>

        {/* 테이블 본문 */}
        <div className="table-body">
          {filteredInquiries.length > 0 ? (
            // 검색 결과가 있을 때 - 각 문의사항을 행으로 표시
            filteredInquiries.map((inquiry) => (
              <div
                key={inquiry.id}
                className="table-row"
                onClick={() => onItemClick && onItemClick(inquiry.id)}
              >
                <div className="row-content">
                  <p className="content-text" title={inquiry.content}>
                    {inquiry.content}
                  </p>
                </div>
                <div className="row-inquirer">
                  <p className="inquirer-text">{inquiry.inquirer}</p>
                </div>
                <div className="row-date">
                  <p className="date-text">{inquiry.date}</p>
                </div>
                <div className="row-status">
                  <span className={`status-badge ${getStatusColor(inquiry.status)}`}>
                    {inquiry.status}
                  </span>
                </div>
              </div>
            ))
          ) : (
            // 검색 결과가 없을 때
            <div className="no-results">
              <p className="no-results-text">검색 결과가 없습니다.</p>
            </div>
          )}
        </div>
      </div>

      {/* 하단 정보 - 총 문의 개수 */}
      <div className="inquiries-footer">
        <div className="total-count">
          총 {filteredInquiries.length}개의 문의가 있습니다.
        </div>
      </div>
    </div>
  );
}