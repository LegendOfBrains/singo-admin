import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';

export default function FacilityReports({ onItemClick }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [reports, setReports] = useState([]);

  useEffect(() => {
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
        <h1 className="text-3xl font-bold text-gray-900">시설 신고</h1>
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