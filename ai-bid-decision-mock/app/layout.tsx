import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI入札意思決定支援システム",
  description: "建設会社向けの入札価格検討フロントエンドモック",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
