import React, { useState } from 'react';
import Logo from '../assets/logo.png';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');

  const validateEmail = (email) => {
    if (!email.endsWith('@dgsw.hs.kr')) {
      return 'DGSW 이메일(@dgsw.hs.kr)만 사용 가능합니다.';
    }
    return '';
  };

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    
    // 실시간 유효성 검사
    if (newEmail.trim()) {
      const error = validateEmail(newEmail);
      setEmailError(error);
    } else {
      setEmailError('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // 최종 이메일 유효성 검사
    const emailValidationError = validateEmail(email);
    
    if (emailValidationError) {
      setEmailError(emailValidationError);
      return;
    }
    
    console.log('Login attempt:', { email, password });
    // 여기에 실제 로그인 로직을 추가하세요
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          {/* Logo Image - Replace src with your logo file path */}
          <div className="mb-4">
            <img
              src={Logo}
              alt="신GO! 로고"
              className="mx-auto h-24 w-auto"
              onError={(e) => {
                // Fallback to text logo if image fails to load
                e.currentTarget.style.display = 'none';
                const fallback = e.currentTarget.nextElementSibling;
                if (fallback) fallback.style.display = 'block';
              }}
            />
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field */}
          <div>
            <label className="block text-sm text-gray-600 mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              className={`w-full px-4 py-3 bg-gray-100 border-0 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 ${
                emailError ? 'focus:ring-red-500 ring-2 ring-red-500' : 'focus:ring-blue-500'
              }`}
              placeholder="발급 받은 이메일을 입력해주세요."
              required
            />
            {emailError && (
              <p className="mt-2 text-sm text-red-600">{emailError}</p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm text-gray-600 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-gray-100 border-0 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="비밀번호를 입력해주세요."
              required
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            disabled={!!emailError}
          >
            로그인
          </button>
        </form>
      </div>
    </div>
  );
}