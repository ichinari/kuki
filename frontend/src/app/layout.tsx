import type { Metadata } from "next";
import "./globals.css";
import SignoutButton from "@/components/SignoutButton";
import { UserProvider } from "@/contexts/UserProvider";

export const metadata: Metadata = {
  title: "KUKI",
  description: "キャンプ場の状況把握アプリ",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja">
      <body className="bg-kuki-paper text-kuki-ink min-h-screen">
        <UserProvider>
          <header>
            ヘッダー <SignoutButton />
          </header>
          {children}
          <footer>フッター</footer>
        </UserProvider>
      </body>
    </html>
  );
}
