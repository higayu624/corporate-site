import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Noto_Sans_JP } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  weight: ["500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

const noto = Noto_Sans_JP({
  weight: ["400", "500", "700", "900"],
  subsets: ["latin"],
  variable: "--font-noto",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://shift-gear.vercel.app"),
  title: "Shift Gear｜価値を出し続けるAI時代のプロダクト開発",
  description:
    "Shift Gear（代表 Yuma Higashitani）。変化を活かし価値を出し続ける、新しいAI時代のプロダクト開発。eコマース構築・業務特化AIモデル・AI業務削減を支援します。",
  openGraph: {
    title: "Shift Gear｜価値を出し続けるAI時代のプロダクト開発",
    description: "変化を活かし価値を出し続ける、新しいAI時代のプロダクト開発。",
    type: "website",
    locale: "ja_JP",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${jakarta.variable} ${noto.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
