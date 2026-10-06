'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Leaf, ShieldCheck } from 'lucide-react';
import s from '../mock.module.css';

const links = [
  ['/assessment-mock/manager', '面談準備'],
  ['/assessment-mock/explanation', '評価案・根拠'],
];
export default function Shell({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  return <div className={s.app}>
    <header className={s.header}>
      <div className={s.brand}><span className={s.brandIcon}><Leaf size={21} /></span>査定サポート<span className={s.demo}>DEMO</span></div>
      <nav className={s.nav} aria-label="モック画面の切替">{links.map(([href, label]) => <Link key={href} href={href} aria-current={path === href ? 'page' : undefined}>{label}</Link>)}</nav>
      <div className={s.headerNote}><ShieldCheck size={14} />すべて架空のデータ</div>
    </header>
    <main className={s.main}>{children}<footer className={s.footer}><span>AIは情報整理を支援。評価は上長が判断。</span><details className={s.demoDetails}><summary>デモについて</summary><p>架空データ・サンプル回答を使用。Slack・メール等の収集と生成AIはサンプル動作です。保存した内容は再読み込みで消えます。</p></details></footer></main>
  </div>;
}
