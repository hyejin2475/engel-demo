"use client";

import React, { useState, useEffect } from "react";
import NavigationBar from "@/components/NavigationBar";
import { HomeIcon } from "@heroicons/react/24/outline";
import { ChevronRightIcon, XCircleIcon } from "@heroicons/react/24/outline";
import FilterBox from "@/components/FilterBox";
import { useRouter } from 'next/navigation';
import ReactMarkdown from 'react-markdown';


const OrderingPage: React.FC = () => {
    const orderOptions = ['Option 1', 'Option 2', 'Option 3'];
    const productOptions = ['Product 1', 'Product 2', 'Product 3'];
    const router = useRouter();

    const [selectedOrderOption, setSelectedOrderOption] = useState<string | null>(null);
    const [selectedProductOption, setSelectedProductOption] = useState<string | null>(null);
    const [value, setValue] = useState<string>('');
    const [text, setText] = useState("");
    const [markdown, setMarkdown] = useState("");

    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        if (/^\d*$/.test(newValue)) {       // 정수만 허용
            if (newValue !== '' && parseInt(newValue, 10) > 20) {
                alert('수량은 20 이하여야 합니다.');
            } else {
                setValue(newValue);
            }
        }
      };

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value);
    }
    const clearInput = () => {
        setValue('');
     };

    useEffect(() => {
        const fetchMarkdown = async () => {
            try {
                const response = await fetch('/notice.md');
                const text = await response.text();
                setMarkdown(text);
            } catch (error) {
                console.error('Error fetching the text file:', error);
            }
        };

        fetchMarkdown();
    }, []);

    const handleOrdering = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        router.push('/orderlist');
      };

    return (
       <div>
        <NavigationBar />
        <div className="pt-20">
            <div className="flex items-start min-h-screen bg-white">
                <div className="w-full max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between">
                        <div>
                            <p className="mt-5 mb-8 text-xl font-bold">발주서 작성</p>
                        </div>
                        <div className="flex mt-5">
                            <HomeIcon className="h-4 w-4 font-extrabold text-brown"></HomeIcon>
                            <ChevronRightIcon className="h-4 w-4 ml-1 mr-1 font-extrabold text-brown"></ChevronRightIcon>
                            <p className="text-xs font-bold text-gray-600">발주서 작성</p>
                        </div>
                    </div>
                    <div className="flex justify-between">
                        <div className="flex flex-col">
                            <div>
                                <p className="mb-2 text-xs font-extrabold">
                                    발주처<span className="red-asterisk"> *</span>
                                </p>
                                <FilterBox 
                                options={orderOptions}
                                placeholder="발주처 선택"
                                onOptionSelect={setSelectedOrderOption}
                                selectedOption={selectedOrderOption}
                                />
                            </div>
                            <div>
                                <p className="mt-6 mb-2 text-xs font-extrabold">
                                    주문수량<span className="red-asterisk"> *</span>
                                </p>
                                <div className="number-input-container flex justify-start">
                                    <input 
                                        type="number"
                                        value={value}
                                        className="number-input"
                                        onChange={handleQuantityChange}
                                        placeholder="수량을 입력하세요" 
                                    />
                                    <button className="clear-button" onClick={clearInput}>
                                        <XCircleIcon className="h-5 w-5 text-gray-600" />
                                    </button>
                                    <p className="ml-2 mt-3 text-xs font-bold">박스</p> 
                                </div>
                                <p className="mt-1 text-xs text-gray-400 font-bold bullet-point">최대 20박스까지 입력가능합니다.</p>
                            </div>
                            <p className="mt-12 mb-2 text-xs font-extrabold">배송지<span className="red-asterisk"> *</span></p>
                            <div>
                                <input 
                                  type="text"
                                  value=""
                                  className="text-box"
                                  readOnly
                                />
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <div>
                                <p className="mb-2 text-xs font-extrabold">제품명<span className="red-asterisk"> *</span></p>
                                <FilterBox 
                                options={productOptions}
                                placeholder="제품 선택"
                                onOptionSelect={setSelectedProductOption}
                                selectedOption={selectedProductOption}
                                />
                            </div>
                            <p className="mt-6 mb-2 text-xs font-extrabold">담당자정보<span className="red-asterisk"> *</span></p>
                            <div className="input-container">
                                <textarea 
                                value=""
                                className="text-box" 
                                readOnly
                                rows={4}
                                />
                            </div>
                            <p className="mt-3 mb-2 text-xs font-extrabold">추가요청사항</p>
                            <div className="input-container">
                                <textarea
                                    value={text}
                                    onChange={handleTextChange}
                                    className="text-box"
                                    rows={4}
                                />
                                <div className="char-counter">
                                    {text.length}/1000
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full mt-10">
                        <ReactMarkdown className="markdown-content">{markdown}</ReactMarkdown>
                    </div>
                    <div className="flex justify-center mt-5">
                        <button 
                        type="button" 
                        className="px-20 py-3 mt-3 mb-5 font-sf-pro bg-brown-dark rounded text-white text-sm font-bold"
                        onClick={handleOrdering}
                        > 
                            발주
                        </button>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
  };
  
  export default OrderingPage;