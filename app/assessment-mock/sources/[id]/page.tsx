import Link from 'next/link';
import { notFound } from 'next/navigation';
import { employees, recordSources, sourceLabels } from '../../_data/demo';
import s from '../../mock.module.css';

export function generateStaticParams() { return employees.flatMap(employee => employee.records.map(record => ({ id: record.id }))); }
export default async function SourcePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const employee = employees.find(e => e.records.some(r => r.id === id));
  const record = employee?.records.find(r => r.id === id);
  if (!record || !employee || !recordSources[id]) notFound();
  return <>
    <div className={s.pageHeading}><div><p className={s.eyebrow}>元記録のプレビュー · 架空データ</p><h1 className={s.title}>{record.title}</h1><p className={s.subtitle}>{employee.name} · {record.date}</p></div><Link className={s.secondary} href="/assessment-mock/manager">面談準備へ</Link></div>
    <p className={s.small} style={{ marginBottom: 20 }}>実サービスへのリンクを想定したデモです。</p>
    {recordSources[id].map(source => <article className={`${s.panel} ${s.sourcePreview}`} id={source.kind} key={source.kind}><div className={s.panelHead}><h2>{sourceLabels[source.kind]} · {source.label}</h2><span className={s.badge}>サンプル</span></div><div className={s.content}><p className={s.body}>{source.excerpt}</p></div></article>)}
    <div className={s.callout}>{record.verified ? '上長確認済みの記録です。' : '本人の投稿です。成果や効果の確認は面談で行います。'}</div>
  </>;
}
