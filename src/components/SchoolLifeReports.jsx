import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';

export default function SchoolLifeReports({ onItemClick }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [reports, setReports] = useState([]);

  useEffect(() => {
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
    setReports(mockData);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case '접수 중':
        return 'bg-yellow-100 text-yellow-800';
      case '처리 예정':
        return 'bg-blue-100 text-blue-800';
      case '처리 완료':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredReports = reports.filter(report =>
    report.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.reporter.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">학교생활 신고</h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="검색어를 입력해 주세요"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-80 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="bg-blue-600 text-white">
          <div className="grid grid-cols-12 gap-4 px-6 py-4 text-sm font-medium">
            <div className="col-span-6">신고 내용</div>
            <div className="col-span-2">신고자</div>
            <div className="col-span-2">신고일</div>
            <div className="col-span-2">현황</div>
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {filteredReports.length > 0 ? (
            filteredReports.map((report) => (
              <div
                key={report.id}
                className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() => onItemClick && onItemClick(report.id)}
              >
                <div className="col-span-6">
                  <p className="text-gray-900 truncate" title={report.content}>
                    {report.content}
                  </p>
                </div>
                <div className="col-span-2">
                  <p className="text-gray-900">{report.reporter}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-gray-600">{report.date}</p>
                </div>
                <div className="col-span-2">
                  <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                    {report.status}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="px-6 py-12 text-center">
              <p className="text-gray-500">검색 결과가 없습니다.</p>
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 flex justify-center">
        <div className="text-sm text-gray-500">
          총 {filteredReports.length}개의 신고가 있습니다.
        </div>
      </div>
    </>
  );
}