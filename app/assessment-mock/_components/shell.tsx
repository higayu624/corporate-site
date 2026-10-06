'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Leaf, ShieldCheck } from 'lucide-react';
import s from '../mock.module.css';

const links = [
  ['/assessment-mock/manager', '01 上長の面談準備'],
  ['/assessment-mock/reflection', '02 日々の振り返り'],
  ['/assessment-mock/explanation', '03 評価理由の対話'],
];
export default function Shell({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  return <div className={s.app}>
    <header className={s.header}>
      <div className={s.brand}><span className={s.brandIcon}><Leaf size={21} /></span>対話につなぐ査定支援<span className={s.demo}>DEMO</span></div>
      <nav className={s.nav} aria-label="モック画面の切替">{links.map(([href, label]) => <Link key={href} href={href} aria-current={path === href ? 'page' : undefined}>{label}</Link>)}</nav>
      <div className={s.headerNote}><ShieldCheck size={14} />すべて架空のデータ</div>
    </header>
    <main className={s.main}>{children}<footer className={s.footer}><span>対話につなぐ査定支援 — CONCEPT DEMO</span><span>架空データによるデモです。整理結果はサンプルで、実際の生成AIには接続していません。</span></footer></main>
  </div>;
}
