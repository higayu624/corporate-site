import type { Metadata } from 'next';
import Shell from './_components/shell';

export const metadata: Metadata = {
  title: '対話につなぐ査定支援 | Concept Demo',
  description: 'AIによる情報整理、日々の振り返り、評価理由の説明支援を体験するフロントモック。',
  robots: { index: false, follow: false },
};
export default function AssessmentLayout({ children }: { children: React.ReactNode }) {
  return <Shell>{children}</Shell>;
}
