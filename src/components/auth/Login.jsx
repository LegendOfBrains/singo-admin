import React, { useState } from 'react';
import './Login.css'; // CSS 파일 import
import Logo from '../assets/logo.png'; // 로고 이미지 경로

export default function Login({ onLoginSuccess }) {
  // 상태 관리 (데이터 저장)
  const [email, setEmail] = useState(''); // 이메일 입력값
  const [password, setPassword] = useState(''); // 비밀번호 입력값
  const [emailError, setEmailError] = useState(''); // 이메일 에러 메시지
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태

  // 이메일 형식 검증 함수
  const validateEmail = (email) => {
    // DGSW 이메일 형식인지 확인
    if (!email.endsWith('@dgsw.hs.kr')) {
      return 'DGSW 이메일(@dgsw.hs.kr)만 사용 가능합니다.';
    }
    return ''; // 에러 없음
  };

  // 이메일 입력값 변경 처리
  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    
    // 이메일이 입력되었을 때만 검증
    if (newEmail.trim()) {
      const error = validateEmail(newEmail);
      setEmailError(error);
    } else {
      setEmailError('');
    }
  };

  // 로그인 버튼 클릭 처리
  const handleSubmit = async (e) => {
    e.preventDefault(); // 페이지 새로고침 방지
    
    // 이메일 검증
    const emailValidationError = validateEmail(email);
    
    if (emailValidationError) {
      setEmailError(emailValidationError);
      return;
    }

    setIsLoading(true); // 로딩 시작
    
    // 실제 로그인 API 호출 시뮬레이션 (1초 대기)
    setTimeout(() => {
      console.log('Login attempt:', { email, password });
      
      // 로그인 성공 시 사용자 정보 생성
      const userData = {
        name: email.split('@')[0] + ' 선생님',
        email: email
      };
      
      setIsLoading(false); // 로딩 끝
      onLoginSuccess(userData); // 부모 컴포넌트에 로그인 성공 알림
    }, 1000);
  };

  // 엔터키 입력 처리
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        {/* 로고 영역 */}
        <div className="logo-section">
          <div className="logo-wrapper">
            <img 
              src={Logo}
              alt="신GO! 로고"
              className="logo-image"
            />
          </div>
        </div>

        {/* 입력 폼 영역 */}
        <div className="form-section">
          {/* 이메일 입력 */}
          <div className="input-group">
            <label className="input-label">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              onKeyPress={handleKeyPress}
              className={`input-field ${emailError ? 'input-error' : ''}`}
              placeholder="발급 받은 이메일을 입력해주세요."
              disabled={isLoading}
            />
            {/* 에러 메시지 표시 */}
            {emailError && (
              <p className="error-message">{emailError}</p>
            )}
          </div>

          {/* 비밀번호 입력 */}
          <div className="input-group">
            <label className="input-label">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={handleKeyPress}
              className="input-field"
              placeholder="비밀번호를 입력해주세요."
              disabled={isLoading}
            />
          </div>

          {/* 로그인 버튼 */}
          <button
            onClick={handleSubmit}
            className={`login-button ${
              (!!emailError || isLoading || !email || !password) 
                ? 'login-button-disabled' 
                : ''
            }`}
            disabled={!!emailError || isLoading || !email || !password}
          >
            {isLoading ? '로그인 중...' : '로그인'}
          </button>
        </div>
      </div>
    </div>
  );
}