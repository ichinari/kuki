import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "KUKI",
  description: "キャンプ場の状況把握アプリ",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja">
      <body className="bg-black text-white">{children}</body>
    </html>
  );
}
