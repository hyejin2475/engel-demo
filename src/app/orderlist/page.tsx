"use client";

import React from "react";
import NavigationBar from "@/components/NavigationBar";

const OrderlistPage = () => {
    return (
       <div>
        <NavigationBar />
        <div className="pt-20">
            <div className="flex items-start min-h-screen bg-white">
                <div className="w-full max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between">
                        <div>
                            <p className="mt-5 text-xl font-bold">orderlist page</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
  };
  
  export default OrderlistPage;