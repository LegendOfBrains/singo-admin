import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import './SchoolLifeReports.css'; // CSS 파일 불러오기

export default function SchoolLifeReports({ onItemClick }) {
  // 상태 관리 - 데이터를 저장하는 곳
  const [searchTerm, setSearchTerm] = useState(''); // 검색어 입력값
  const [reports, setReports] = useState([]); // 신고 목록 데이터

  // 컴포넌트가 처음 렌더링될 때 실행되는 함수
  useEffect(() => {
    // 실제로는 서버에서 데이터를 가져오지만, 지금은 가짜 데이터 사용
    const mockData = [
      {
        id: 1,
        content: '급식실에서 학생들이 줄을 서지 않고 새치기해요',
        reporter: '오시온',
        date: '2025.06.23',
        status: '접수 중'
      },
      {
        id: 2,
        content: '복도에서 뛰어다니는 학생들이 많아서 위험해요',
        reporter: '리쿠',
        date: '2025.06.23',
        status: '처리 예정'
      },
      {
        id: 3,
        content: '교실에서 휴대폰을 계속 사용하는 학생이 있어요',
        reporter: '유우시',
        date: '2025.06.22',
        status: '처리 완료'
      },
      {
        id: 4,
        content: '학생들이 쓰레기를 아무 곳에나 버려요',
        reporter: '료',
        date: '2025.06.22',
        status: '접수 중'
      },
      {
        id: 5,
        content: '체육시간에 안전수칙을 지키지 않는 학생들이 있어요',
        reporter: '사쿠야',
        date: '2025.06.21',
        status: '처리 완료'
      }
    ];
    setReports(mockData); // 가짜 데이터를 reports 상태에 저장
  }, []); // 빈 배열이므로 컴포넌트가 처음 렌더링될 때만 실행

  // 상태에 따른 색상 결정 함수
  const getStatusColor = (status) => {
    switch (status) {
      case '접수 중':
        return 'status-received'; // 접수 중 상태 CSS 클래스
      case '처리 예정':
        return 'status-scheduled'; // 처리 예정 상태 CSS 클래스
      case '처리 완료':
        return 'status-completed'; // 처리 완료 상태 CSS 클래스
      default:
        return 'status-default'; // 기본 상태 CSS 클래스
    }
  };

  // 검색 기능 - 신고 내용이나 신고자 이름으로 필터링
  const filteredReports = reports.filter(report =>
    report.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.reporter.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="school-life-reports-container">
      {/* 상단 헤더 부분 - 제목과 검색창 */}
      <div className="reports-header">
        <h1 className="page-title">학교생활 신고</h1>
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

      {/* 신고 목록 테이블 */}
      <div className="reports-table">
        {/* 테이블 헤더 */}
        <div className="table-header">
          <div className="header-row">
            <div className="header-content">신고 내용</div>
            <div className="header-reporter">신고자</div>
            <div className="header-date">신고일</div>
            <div className="header-status">현황</div>
          </div>
        </div>

        {/* 테이블 본문 */}
        <div className="table-body">
          {filteredReports.length > 0 ? (
            // 검색 결과가 있을 때 - 각 신고를 행으로 표시
            filteredReports.map((report) => (
              <div
                key={report.id}
                className="table-row"
                onClick={() => onItemClick && onItemClick(report.id)}
              >
                <div className="row-content">
                  <p className="content-text" title={report.content}>
                    {report.content}
                  </p>
                </div>
                <div className="row-reporter">
                  <p className="reporter-text">{report.reporter}</p>
                </div>
                <div className="row-date">
                  <p className="date-text">{report.date}</p>
                </div>
                <div className="row-status">
                  <span className={`status-badge ${getStatusColor(report.status)}`}>
                    {report.status}
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

      {/* 하단 정보 - 총 신고 개수 */}
      <div className="reports-footer">
        <div className="total-count">
          총 {filteredReports.length}개의 신고가 있습니다.
        </div>
      </div>
    </div>
  );
}