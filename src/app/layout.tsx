import "@/styles/reset.css";
import "./globals.css";

import Providers from "./provider";
import ClientLayout from "./clientLayout"; // 클라이언트 전용 레이아웃 불러오기

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Providers>
          <ClientLayout>{children}</ClientLayout>
        </Providers>
      </body>
    </html>
  );
}
