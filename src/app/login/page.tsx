"use client"  // 클라이언트 컴포넌트를 구분하기 위한 지시어

import React, { useState } from 'react';
import Image from "next/image";
import InputField from '../../components/InputField';
import { UserIcon, LockClosedIcon, EyeSlashIcon, EyeIcon } from "@heroicons/react/24/outline";
import { useRouter } from 'next/navigation';  // next.js 13이상에서는 next/router 대신 navigation 사용



const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | undefined>(undefined);
  const router = useRouter();

  const handleRightIconClick = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const res = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();
    if (res.ok) {
      console.log('Login successful:', data);
    } else {
      console.error('Login failed:', data);
    }

    if (data.success) {
      router.push('/ordering');
    } else {
      setError(data.message);
      alert(data.message);
    }
  };

  return (
    <div className="h-screen flex flex-col">

        <div className="flex-1 flex-col items-center bg-white p-4">
          <div className="w-5/12 flex-1 flex-col max-w-md  bg-white p-4 mx-auto my-20">
            <div className="flex flex-col items-center justify-items-center">
              <Image
                className="dark:invert mt-1 mb-6"
                src="/엔제리너스 로고.png"
                alt="Next.js logo"
                width={230}
                height={38}
                priority
              />
              <p className="mt-3 mb-10 font-sf-pro font-bold text-sm text-center">주문시스템 로그인</p>
              <InputField
                type="text"
                placeholder="아이디 입력"
                value={username}
                setValue={setUsername}
                leftIcon={<UserIcon className="w-5 h-5 text-brown-semilight" />}
                error={error}
              />
              <InputField
                type={showPassword ? "text" : "password"}
                placeholder="비밀번호 입력"
                value={password}
                setValue={setPassword}
                leftIcon={<LockClosedIcon className="w-5 h-5 text-brown-semilight" />}
                rightIcon={showPassword ? <EyeIcon className="w-5 h-5 text-brown-semilight" /> : <EyeSlashIcon className="w-5 h-5 text-brown-semilight" />}
                onRightIconClick={handleRightIconClick}
                error={error}
              />
              <button 
                type="button" 
                className="w-full px-3 py-3 mt-3 mb-5 font-sf-pro bg-brown-dark rounded text-white text-sm font-bold"
                onClick={handleLogin}
              > 
                로그인
              </button>
            </div>
            <div className="text-gray-400 text-left text-xs font-sf-pro">
              <p className="mb-1 bullet-point">
                아이디, 비밀번호 분실 시 GRS 본사 관리자에게 문의해 주시기 바랍니다.
              </p>
              <p className="bullet-point">
                비밀번호는 영문 대소문자 구별해 주시기 바랍니다.
              </p>           
            </div> 
          </div>
        </div>

        <div className="bg-brown-light p-7 text-center">
          <p className="text-brown text-xs font-sans">
            Copyright ©2014. ANGELINUS COM ALL RIGHTS RESERVED.
          </p>
        </div>
    </div>
  );
};

export default LoginPage;
