"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // useRouter를 next/navigation에서 불러옴. 왜 안 됨;;;

export default function Home() {
  const [message, setMessage] = useState("잠시만 기다려 주세요 ..."); // 처음 텍스트
  const router = useRouter();

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    new Promise<void>((resolve) => {
      timer = setTimeout(() => {
        setMessage("Start!");
        resolve(); // 텍스트 변경
        // 2초 후에 main으로 자동 리디렉션
      }, 2000);
    }).then(() => {
      setTimeout(() => {
        router.push("/main");
      }, 1000);
    });

    // 컴포넌트 언마운트 시 타이머 정리
    return () => clearTimeout(timer);
  }, [router]);

  // useEffect(() => {
  //   const timer1 = setTimeout(() => {
  //     setMessage("Start");
  //   }, 2000);
  //   const timer2 = setTimeout(() => {
  //     router.push("/main");
  //   }, 1000);
  //   return () => {
  //     clearTimeout(timer1);
  //     clearTimeout(timer2);
  //   };
  // }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-custom-blue font-cafe24meongi">
      <div className="text-center">
        <h1 className="text-9xl font-medium text-white mb-4">Poketify</h1>

        {/* 회전하는 원 */}
        <div className="flex justify-center items-center space-x-4">
          <div>
            <svg
              className="animate-spin h-6 w-6 text-white"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                strokeDasharray="62.83185307179586"
                strokeDashoffset="31.41592653589793"
                className="opacity-75"
              />
            </svg>
          </div>

          {/* 2초 후에 Start!로 변경 */}
          <p className="text-white text-2xl">{message}</p>
        </div>
      </div>
    </div>
  );
}
