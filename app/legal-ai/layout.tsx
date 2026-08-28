import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Legal Debate AI｜複数AIによる日本法検証",
  description: "複数AIの独立分析・相互反証とe-Gov一次情報で法律回答を検証するPoC。",
};

export default function LegalAiLayout({ children }: { children: React.ReactNode }) {
  return children;
}
