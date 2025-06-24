import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';

export default function Inquiries({ onItemClick }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [inquiries, setInquiries] = useState([]);

  useEffect(() => {
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
    setInquiries(mockData);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case '답변 완료':
        return 'bg-green-100 text-green-800';
      case '답변 안함':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredInquiries = inquiries.filter(inquiry =>
    inquiry.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inquiry.inquirer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">문의사항</h1>
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
            <div className="col-span-6">문의 내용</div>
            <div className="col-span-2">문의자</div>
            <div className="col-span-2">문의일</div>
            <div className="col-span-2">현황</div>
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {filteredInquiries.length > 0 ? (
            filteredInquiries.map((inquiry) => (
              <div
                key={inquiry.id}
                className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() => onItemClick && onItemClick(inquiry.id)}
              >
                <div className="col-span-6">
                  <p className="text-gray-900 truncate" title={inquiry.content}>
                    {inquiry.content}
                  </p>
                </div>
                <div className="col-span-2">
                  <p className="text-gray-900">{inquiry.inquirer}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-gray-600">{inquiry.date}</p>
                </div>
                <div className="col-span-2">
                  <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(inquiry.status)}`}>
                    {inquiry.status}
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
          총 {filteredInquiries.length}개의 문의가 있습니다.
        </div>
      </div>
    </>
  );
}