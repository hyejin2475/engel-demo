"use client"
import React from 'react';
import Image from "next/image";
import { useRouter, usePathname } from 'next/navigation'; 
import { ArrowRightStartOnRectangleIcon } from '@heroicons/react/24/outline';


const NavigationBar: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();

  const handleMenuClick = (path: string) => {
    router.push(path);
  }

  return (
    <div className="fixed top-0 left-0 right-0 bg-white border-b-2 border-b-brown-light z-50">
    <div className="w-full max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-20">
        <div className="flex items-center">
            <Image
            className="dark:invert"
            src="/엔제리너스 로고.png"
            alt="Next.js logo"
            width={150}
            height={38}
            priority
            />
        </div>
        <div className='flex items-center ml-40 mt-1'>
          <button 
            className={`${pathname === '/ordering' ? 'text-brown-dark font-bold underline underline-offset' : 'bg-transparent text-sm text-brown font-bold'}`}
            onClick={() => handleMenuClick('/ordering')}
          >
            발주서 작성
          </button>
        </div>
        <div className='flex items-center ml-5 mt-1'>
          <button 
            className={`${pathname === '/orderlist' ? 'text-brown-dark font-bold underline underline-offset' : 'bg-transparent text-sm text-brown font-bold'}`}
            onClick={() => handleMenuClick('/orderlist')}
          >
            발주내역
          </button>
        </div>
        <div className='flex items-center ml-8'>
          <button 
            className="flex items-center bg-transparent text-xs font-bold text-brown"
            onClick={() => handleMenuClick('/login')}
          >
            로그아웃
            <ArrowRightStartOnRectangleIcon className='h-5 w-5 ml-1'></ArrowRightStartOnRectangleIcon>
          </button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default NavigationBar;