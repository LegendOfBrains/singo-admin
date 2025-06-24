import React, { useState } from 'react';
import Logo from '../assets/logo.png'; // 로고 이미지 경로

export default function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email) => {
    if (!email.endsWith('@dgsw.hs.kr')) {
      return 'DGSW 이메일(@dgsw.hs.kr)만 사용 가능합니다.';
    }
    return '';
  };

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    
    if (newEmail.trim()) {
      const error = validateEmail(newEmail);
      setEmailError(error);
    } else {
      setEmailError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const emailValidationError = validateEmail(email);
    
    if (emailValidationError) {
      setEmailError(emailValidationError);
      return;
    }

    setIsLoading(true);
    
    // 실제 로그인 API 호출 시뮬레이션
    setTimeout(() => {
      console.log('Login attempt:', { email, password });
      
      // 여기서 실제 로그인 검증을 하고
      // 성공 시 사용자 정보와 함께 onLoginSuccess 호출
      const userData = {
        name: email.split('@')[0] + ' 선생님',
        email: email
      };
      
      setIsLoading(false);
      onLoginSuccess(userData);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="mb-4">
            <img 
              src={Logo}
              alt="신GO! 로고"
              className="mx-auto h-25 w-40 rounded-xl"
            />
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm text-gray-600 mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              onKeyPress={handleKeyPress}
              className={`w-full px-4 py-3 bg-gray-100 border-0 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 ${
                emailError ? 'focus:ring-red-500 ring-2 ring-red-500' : 'focus:ring-blue-500'
              }`}
              placeholder="발급 받은 이메일을 입력해주세요."
              disabled={isLoading}
            />
            {emailError && (
              <p className="mt-2 text-sm text-red-600">{emailError}</p>
            )}
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full px-4 py-3 bg-gray-100 border-0 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="비밀번호를 입력해주세요."
              disabled={isLoading}
            />
          </div>

          <button
            onClick={handleSubmit}
            className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            disabled={!!emailError || isLoading || !email || !password}
          >
            {isLoading ? '로그인 중...' : '로그인'}
          </button>
        </div>
      </div>
    </div>
  );
}