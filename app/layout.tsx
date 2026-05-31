import type { Metadata } from "next";
import { Shippori_Mincho, Playfair_Display, Noto_Sans_JP } from "next/font/google";
import "./globals.css";

const shippori = Shippori_Mincho({
  weight: ["500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-shippori",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const noto = Noto_Sans_JP({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-noto",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://shift-gear.vercel.app"),
  title: "Shift Gear｜ビジネス価値を最大化する開発",
  description:
    "Shift Gear（代表 Yuma Higashitani）。スクラムと顧客対話を起点に、eコマース構築・業務特化AIモデル・AI業務削減でビジネス価値を最大化します。",
  openGraph: {
    title: "Shift Gear｜ビジネス価値を最大化する開発",
    description: "顧客との対話から、本当に使われるソフトウェアを。",
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
    <html
      lang="ja"
      className={`${shippori.variable} ${playfair.variable} ${noto.variable}`}
    >
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
