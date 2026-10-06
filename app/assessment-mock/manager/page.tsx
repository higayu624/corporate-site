'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { CalendarDays, FileText, Layers3, MessageSquare, Sparkles } from 'lucide-react';
import { employees, periodLabel } from '../_data/demo';
import { pastReviews } from '../_data/evaluations';
import Evidence from '../_components/evidence';
import SourceLinks from '../_components/source-links';
import s from '../mock.module.css';

const tabs = ['実績・行動', '収集した記録', '前回との比較', '面談ポイント'];
export default function ManagerPage() {
  const [employeeId, setEmployeeId] = useState(employees[0].id);
  const [state, setState] = useState<'idle' | 'working' | 'ready'>('idle');
  const [tab, setTab] = useState(0);
  const [checked, setChecked] = useState<string[]>([]);
  useEffect(() => {
    function selectFromLink() {
      const id = window.location.hash.slice(1);
      if (employees.some(employee => employee.id === id)) { setEmployeeId(id); setState('ready'); setTab(0); setChecked([]); }
    }
    selectFromLink(); window.addEventListener('hashchange', selectFromLink);
    return () => window.removeEventListener('hashchange', selectFromLink);
  }, []);
  const employee = employees.find(e => e.id === employeeId)!;
  function selectEmployee(id: string) { setEmployeeId(id); setState('idle'); setTab(0); setChecked([]); }
  async function organize() { if (state === 'working') return; setState('working'); await new Promise(resolve => setTimeout(resolve, 450)); setState('ready'); }
  function toggle(id: string) { setChecked(current => current.includes(id) ? current.filter(v => v !== id) : [...current, id]); }
  return <>
    <div className={s.pageHeading}><div><p className={s.eyebrow}>上長向け</p><h1 className={s.title}>面談準備</h1><p className={s.subtitle}>Slack・メール・スプシから、実績と根拠を収集。</p></div><div className={s.period}><CalendarDays size={15} />{periodLabel}</div></div>
    <div className={s.grid}>
      <aside><section className={s.panel}><div className={s.panelHead}><h2>面談対象の社員</h2><span className={s.small}>3名</span></div><div className={s.employeeList}>{employees.map(e => <button key={e.id} className={s.employee} aria-pressed={e.id === employeeId} disabled={state === 'working'} onClick={() => selectEmployee(e.id)}><span className={s.avatar}>{e.initials}</span><span><strong>{e.name}</strong><span className={s.small}>{e.role}</span></span></button>)}</div></section>
      </aside>
      <section className={s.panel}>
        <div className={s.profile}><span className={s.avatar}>{employee.initials}</span><div><h2>{employee.name}</h2><p className={s.small}>{employee.role}</p></div><div className={s.profileAction}>{state === 'ready' && <Link className={s.secondary} href={`/assessment-mock/explanation#${employee.id}`}>評価案を見る</Link>}<button className={s.primary} onClick={organize} disabled={state === 'working'}><Sparkles size={15} />{state === 'working' ? '収集・整理中…' : state === 'ready' ? 'データを再収集' : 'データを収集・整理'}</button></div></div>
        <div className={s.collectSources}><span>収集元</span><span>Slack</span><span>メール</span><span>スプレッドシート</span><em>デモ</em></div>
        <div className={s.stats}><div className={s.stat}><p>収集対象の記録</p><strong aria-label="蓄積された記録数">{employee.records.length}<em>件</em></strong></div><div className={s.stat}><p>収集状況</p><strong className={s.statText}>{state === 'ready' ? '収集済み' : state === 'working' ? '収集中' : '未収集'}</strong></div><div className={s.stat}><p>面談ポイントの確認</p><strong aria-label="面談準備状況">{checked.length} / {employee.interviewPoints.length}<em>項目</em></strong></div></div>
        {state !== 'ready' ? <div className={s.empty}><div className={s.emptyIcon}><Layers3 size={28} /></div><h3>{state === 'working' ? '業務データを収集中…' : '業務データから、やったことを集めます'}</h3><p role="status">{state === 'working' ? '実績と根拠リンクを整理しています。' : '上の「データを収集・整理」を押してください。'}</p></div> : <>
          <div className={s.tabs} role="tablist" aria-label="面談資料">{tabs.map((label, i) => <button key={label} id={`manager-tab-${i}`} role="tab" aria-selected={tab === i} aria-controls="manager-panel" tabIndex={tab === i ? 0 : -1} onClick={() => setTab(i)} onKeyDown={event => {
              const next = event.key === 'ArrowRight' ? (i + 1) % tabs.length : event.key === 'ArrowLeft' ? (i + tabs.length - 1) % tabs.length : event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1 : null;
              if (next === null) return;
              event.preventDefault(); setTab(next);
              event.currentTarget.parentElement?.querySelectorAll<HTMLButtonElement>('[role="tab"]')[next]?.focus();
            }}>{label}</button>)}</div>
          <div className={s.content} id="manager-panel" role="tabpanel" aria-labelledby={`manager-tab-${tab}`}>
            {tab === 0 && <><h3 className={s.sectionLabel}><FileText size={15} />実績・行動の要点<span className={s.badge}>整理案 · デモ</span></h3>{employee.achievements.map(a => <article className={s.card} key={a.title}><div className={s.cardTop}><h4 className={s.cardTitle}>{a.title}</h4><span className={`${s.badge} ${a.recordIds.some(id => !employee.records.find(r => r.id === id)?.verified) ? s.amber : ''}`}>{a.recordIds.every(id => employee.records.find(r => r.id === id)?.verified) ? '記録あり' : '追加確認が必要'}</span></div><p className={s.body}>{a.detail}</p><p className={s.small} style={{ marginTop: 10 }}>{employee.records.filter(r => a.recordIds.includes(r.id)).map(r => r.date).join(' / ')}</p><SourceLinks recordIds={a.recordIds} /><Evidence records={employee.records.filter(r => a.recordIds.includes(r.id))} /></article>)}</>}
            {tab === 1 && <><h3 className={s.sectionLabel}><FileText size={15} />収集した業務記録</h3>{employee.records.map(record => <article className={s.card} key={record.id}><div className={s.cardTop}><h4 className={s.cardTitle}>{record.title}</h4><span className={`${s.badge} ${record.verified ? '' : s.amber}`}>{record.verified ? '上長確認済み' : '本人投稿・要確認'}</span></div><p className={s.small}>{record.date}</p><p className={s.body}>{record.body}</p><SourceLinks recordIds={[record.id]} /></article>)}</>}
            {tab === 2 && <><h3 className={s.sectionLabel}><Layers3 size={15} />前回からの変化</h3><article className={s.card}><h4 className={s.cardTitle}>前回の評価・期待</h4><p className={s.body}>{pastReviews[employeeId].at(-1)?.comment}</p><p className={s.small}>出典：2026年3月の上長評価（サンプル）</p></article><article className={s.card}><h4 className={s.cardTitle}>今回確認できる変化</h4><p className={s.body}>{employee.achievements[0].detail}</p><Evidence records={employee.records.filter(r => employee.achievements[0].recordIds.includes(r.id))} /></article></>}
            {tab === 3 && <><h3 className={s.sectionLabel}><MessageSquare size={15} />面談で確認すること</h3><p className={s.body}>確認した項目にチェック。</p>{employee.interviewPoints.map(p => <label className={s.checkItem} key={p.id}><input type="checkbox" checked={checked.includes(p.id)} onChange={() => toggle(p.id)} /><span><strong>{p.text}</strong><span className={s.body}>{p.reason}</span></span></label>)}</>}
            <p className={s.status} role="status">収集・整理完了 · サンプルデータ</p>
          </div>
        </>}
      </section>
    </div>
  </>;
}
