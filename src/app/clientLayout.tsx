"use client"; // 클라이언트에서 실행

import { usePathname } from "next/navigation";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // "/" 경로에서는 헤더와 푸터를 숨기고, 다른 경로에서는 표시
  const showHeaderFooter = pathname !== "/";

  return (
    <>
      {showHeaderFooter && <Header />}
      <main className={showHeaderFooter ? "pt-20" : undefined}>{children}</main>
      {showHeaderFooter && <Footer />}
    </>
  );
}
