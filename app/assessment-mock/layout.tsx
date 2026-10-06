import type { Metadata } from 'next';
import Shell from './_components/shell';

export const metadata: Metadata = {
  title: '対話につなぐ査定支援 | Concept Demo',
  description: '業務データから実績と根拠を収集し、面談準備と評価理由の説明を支援するフロントモック。',
  robots: { index: false, follow: false },
};
export default function AssessmentLayout({ children }: { children: React.ReactNode }) {
  return <Shell>{children}</Shell>;
}
