"use client"

import React from 'react';
import { usePathname } from "next/navigation";
import NavigationBar from './NavigationBar';

const Layout = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();
    const isLoginPage = pathname === "/login";

    return (
      <>
        {!isLoginPage && <NavigationBar />}
        {children}
      </>
    );
  };
  
  export default Layout;