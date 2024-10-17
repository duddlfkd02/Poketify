"use client"; // 클라이언트에서 실행

import { usePathname } from "next/navigation";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mainHeight, setMainHeight] = useState<string>();
  const getHeight = async () => {
    const bodyHeight = window.innerHeight;
    const hedaderHeight = document.querySelector("header")?.clientHeight;
    const footerHeight = document.querySelector("footer")?.clientHeight;

    setMainHeight(`${bodyHeight! - hedaderHeight! - footerHeight!}px`);
  };

  useEffect(() => {
    getHeight();
  }, []);

  // "/" 경로에서는 헤더와 푸터를 숨기고, 다른 경로에서는 표시
  const showHeaderFooter = pathname !== "/";

  return (
    <>
      {showHeaderFooter && <Header />}
      <main className="flex flex-col" style={{ minHeight: mainHeight }}>
        {children}
      </main>
      {showHeaderFooter && <Footer />}
    </>
  );
}
