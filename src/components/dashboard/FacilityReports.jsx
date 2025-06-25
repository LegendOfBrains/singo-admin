import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import './FacilityReports.css'; // CSS 파일 불러오기

export default function FacilityReports({ onItemClick }) {
  // 상태 관리 - 데이터를 저장하는 곳
  const [searchTerm, setSearchTerm] = useState(''); // 검색어 입력값
  const [reports, setReports] = useState([]); // 신고 목록 데이터

  // 컴포넌트가 처음 렌더링될 때 실행되는 함수
  useEffect(() => {
    // 실제로는 서버에서 데이터를 가져오지만, 지금은 가짜 데이터 사용
    const mockData = [
      {
        id: 1,
        content: '2학년 3반 에어컨이 고장났어요ㅠㅠㅠㅠㅠ',
        reporter: '서진교',
        date: '2025.06.23',
        status: '접수 중'
      },
      {
        id: 2,
        content: '2학년 복도 정수기에서 이상한 맛이 나요ㅠㅠㅠㅠㅠ',
        reporter: '신민채',
        date: '2025.06.23',
        status: '처리 예정'
      },
      {
        id: 3,
        content: '신관내용신관내용신관내용신관내용신관내용신관내용신관내용',
        reporter: '서진규',
        date: '2025.06.23',
        status: '처리 완료'
      },
      {
        id: 4,
        content: '3학년 화장실 문이 잠기지 않아요',
        reporter: '신민재',
        date: '2025.06.22',
        status: '접수 중'
      },
      {
        id: 5,
        content: '도서관 컴퓨터가 느려요',
        reporter: '신민주',
        date: '2025.06.22',
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
    <div className="facility-reports-container">
      {/* 상단 헤더 부분 - 제목과 검색창 */}
      <div className="reports-header">
        <h1 className="page-title">시설 신고</h1>
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