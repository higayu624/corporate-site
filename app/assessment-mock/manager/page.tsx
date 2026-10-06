'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { CalendarDays, FileText, Layers3, Sparkles } from 'lucide-react';
import { employees, periodLabel } from '../_data/demo';
import Evidence from '../_components/evidence';
import SourceLinks from '../_components/source-links';
import s from '../mock.module.css';

export default function ManagerPage() {
  const [employeeId, setEmployeeId] = useState(employees[0].id);
  const [state, setState] = useState<'idle' | 'working' | 'ready'>('idle');
  const [notes, setNotes] = useState<Record<string, string>>({});
  useEffect(() => {
    function selectFromLink() {
      const id = window.location.hash.slice(1);
      if (employees.some(employee => employee.id === id)) { setEmployeeId(id); setState('ready'); }
    }
    selectFromLink(); window.addEventListener('hashchange', selectFromLink);
    return () => window.removeEventListener('hashchange', selectFromLink);
  }, []);
  const employee = employees.find(e => e.id === employeeId)!;
  function selectEmployee(id: string) { setEmployeeId(id); setState('idle'); }
  async function organize() { if (state === 'working') return; setState('working'); await new Promise(resolve => setTimeout(resolve, 450)); setState('ready'); }
  return <>
    <div className={s.pageHeading}><div><p className={s.eyebrow}>上長向け</p><h1 className={s.title}>面談準備</h1><p className={s.subtitle}>Slack・メール・スプシから、実績と根拠を収集。</p></div><div className={s.period}><CalendarDays size={15} />{periodLabel}</div></div>
    <div className={s.grid}>
      <aside><section className={s.panel}><div className={s.panelHead}><h2>面談対象の社員</h2><span className={s.small}>3名</span></div><div className={s.employeeList}>{employees.map(e => <button key={e.id} className={s.employee} aria-pressed={e.id === employeeId} disabled={state === 'working'} onClick={() => selectEmployee(e.id)}><span className={s.avatar}>{e.initials}</span><span><strong>{e.name}</strong><span className={s.small}>{e.role}</span></span></button>)}</div></section>
      </aside>
      <section className={s.panel}>
        <div className={s.profile}><span className={s.avatar}>{employee.initials}</span><div><h2>{employee.name}</h2><p className={s.small}>{employee.role}</p></div><div className={s.profileAction}>{state === 'ready' && <Link className={s.secondary} href={`/assessment-mock/explanation#${employee.id}`}>評価案を見る</Link>}<button className={s.primary} onClick={organize} disabled={state === 'working'}><Sparkles size={15} />{state === 'working' ? '収集・整理中…' : state === 'ready' ? 'データを再収集' : 'データを収集・整理'}</button></div></div>
        <div className={s.collectSources}><span>収集元</span><span>Slack</span><span>メール</span><span>スプレッドシート</span><em>デモ</em></div>
        <div className={`${s.stats} ${s.twoStats}`}><div className={s.stat}><p>収集対象の記録</p><strong aria-label="蓄積された記録数">{employee.records.length}<em>件</em></strong></div><div className={s.stat}><p>収集状況</p><strong className={s.statText}>{state === 'ready' ? '収集済み' : state === 'working' ? '収集中' : '未収集'}</strong></div></div>
        {state !== 'ready' ? <div className={s.empty}><div className={s.emptyIcon}><Layers3 size={28} /></div><h3>{state === 'working' ? '業務データを収集中…' : '業務データから、やったことを集めます'}</h3><p role="status">{state === 'working' ? '実績と根拠リンクを整理しています。' : '上の「データを収集・整理」を押してください。'}</p></div> : <>
          <div className={s.content}>
            <><h3 className={s.sectionLabel}><FileText size={15} />実績・行動の要点<span className={s.badge}>整理案 · デモ</span></h3>{employee.achievements.map(a => <article className={s.card} key={a.title}><div className={s.cardTop}><h4 className={s.cardTitle}>{a.title}</h4><span className={`${s.badge} ${a.recordIds.some(id => !employee.records.find(r => r.id === id)?.verified) ? s.amber : ''}`}>{a.recordIds.every(id => employee.records.find(r => r.id === id)?.verified) ? '記録あり' : '追加確認が必要'}</span></div><p className={s.body}>{a.detail}</p><p className={s.small} style={{ marginTop: 10 }}>{employee.records.filter(r => a.recordIds.includes(r.id)).map(r => r.date).join(' / ')}</p><SourceLinks recordIds={a.recordIds} /><Evidence records={employee.records.filter(r => a.recordIds.includes(r.id))} /></article>)}</>
            <p className={s.status} role="status">収集・整理完了 · サンプルデータ</p>
          </div>
        </>}
        <section className={s.memoSection} aria-label="社員別の面談メモ">
          <label className={s.label} htmlFor="interview-memo">面談メモ</label>
          <textarea id="interview-memo" className={s.input} rows={5} value={notes[employeeId] ?? ''} onChange={event => setNotes(current => ({ ...current, [employeeId]: event.target.value }))} placeholder="話したこと、合意したこと、次のアクション…" />
          <p className={s.small} style={{ marginTop: 10 }}>社員別に保持 · 再読み込みで消えます</p>
        </section>
      </section>
    </div>
  </>;
}
