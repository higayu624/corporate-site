'use client';
import { useState } from 'react';
import { ArrowRight, CalendarDays, Check, FileText, Layers3, MessageSquare, ShieldCheck, Sparkles } from 'lucide-react';
import { employees, periodLabel } from '../_data/demo';
import Evidence from '../_components/evidence';
import s from '../mock.module.css';

const tabs = ['実績・行動', '本人と上長の視点', '前回との比較', '面談ポイント'];
export default function ManagerPage() {
  const [employeeId, setEmployeeId] = useState(employees[0].id);
  const [state, setState] = useState<'idle' | 'working' | 'ready'>('idle');
  const [tab, setTab] = useState(0);
  const [checked, setChecked] = useState<string[]>([]);
  const employee = employees.find(e => e.id === employeeId)!;
  function selectEmployee(id: string) { setEmployeeId(id); setState('idle'); setTab(0); setChecked([]); }
  async function organize() { if (state === 'working') return; setState('working'); await new Promise(resolve => setTimeout(resolve, 450)); setState('ready'); }
  function toggle(id: string) { setChecked(current => current.includes(id) ? current.filter(v => v !== id) : [...current, id]); }
  return <>
    <div className={s.pageHeading}><div><p className={s.eyebrow}>01 / FOR MANAGERS</p><h1 className={s.title}>情報を整えて、対話の準備を。</h1><p className={s.subtitle}>半年間の歩みを、根拠のある面談資料へ。一人ひとりと向き合う時間をつくります。</p></div><div className={s.period}><CalendarDays size={15} />{periodLabel}</div></div>
    <div className={s.notice}><ShieldCheck size={16} /><span><strong>AIは、評価のための情報整理を支援します。</strong> 最終的な評価・処遇は上長が判断します。本人の申告と確認済みの事実を分けて表示します。</span></div>
    <div className={s.grid}>
      <aside><section className={s.panel}><div className={s.panelHead}><h2>面談対象の社員</h2><span className={s.small}>3名</span></div><div className={s.employeeList}>{employees.map(e => <button key={e.id} className={s.employee} aria-pressed={e.id === employeeId} disabled={state === 'working'} onClick={() => selectEmployee(e.id)}><span className={s.avatar}>{e.initials}</span><span><strong>{e.name}</strong><span className={s.small}>{e.role}</span></span></button>)}</div><div className={s.employeeFoot}><p className={s.small}>サンプルの社員を選ぶと、実績と面談資料が切り替わります。</p></div></section>
        <section className={`${s.panel} ${s.process}`}><h3>面談までの流れ</h3><div className={s.step}><span><Check size={12} /></span>日々の記録を蓄積</div><div className={`${s.step} ${s.stepCurrent}`}><span>2</span>AIで情報を整理</div><div className={s.step}><span>3</span>根拠・確認事項を確認</div><div className={s.step}><span>4</span>本人と対話・フィードバック</div></section>
      </aside>
      <section className={s.panel}>
        <div className={s.profile}><span className={s.avatar}>{employee.initials}</span><div><h2>{employee.name}</h2><p className={s.small}>{employee.role}</p></div><div className={s.profileAction}><button className={s.primary} onClick={organize} disabled={state === 'working'}><Sparkles size={15} />{state === 'working' ? '記録を整理しています…' : state === 'ready' ? '資料を再整理' : '面談資料を整理'}</button></div></div>
        <div className={s.stats}><div className={s.stat}><p>蓄積された記録</p><strong aria-label="蓄積された記録数">{employee.records.length}<em>件</em></strong></div><div className={s.stat}><p>資料の整理状況</p><strong className={s.statText}>{state === 'ready' ? '整理済み' : state === 'working' ? '整理中' : '未整理'}</strong></div><div className={s.stat}><p>面談ポイントの確認</p><strong aria-label="面談準備状況">{checked.length} / {employee.interviewPoints.length}<em>項目</em></strong></div></div>
        {state !== 'ready' ? <div className={s.empty}><div className={s.emptyIcon}><Layers3 size={28} /></div><h3>{state === 'working' ? '半年間の記録を、面談の材料へ。' : '記録は揃っています。次は、整理です。'}</h3><p>実績、本人の振り返り、上長コメントをまとめ、<br />根拠と面談で確認するポイントを見える形にします。</p><div className={s.emptyFlow}><span>業務・行動記録</span><span>本人の振り返り</span><span>上長コメント</span><ArrowRight size={15} /><span>面談資料</span></div><p className={s.status} role="status">{state === 'working' ? 'サンプル資料を整理中です…' : '「面談資料を整理」でデモを開始できます。'}</p></div> : <>
          <div className={s.tabs} role="tablist" aria-label="面談資料">{tabs.map((label, i) => <button key={label} id={`manager-tab-${i}`} role="tab" aria-selected={tab === i} aria-controls="manager-panel" tabIndex={tab === i ? 0 : -1} onClick={() => setTab(i)} onKeyDown={event => {
              const next = event.key === 'ArrowRight' ? (i + 1) % tabs.length : event.key === 'ArrowLeft' ? (i + tabs.length - 1) % tabs.length : event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1 : null;
              if (next === null) return;
              event.preventDefault(); setTab(next);
              event.currentTarget.parentElement?.querySelectorAll<HTMLButtonElement>('[role="tab"]')[next]?.focus();
            }}>{label}</button>)}</div>
          <div className={s.content} id="manager-panel" role="tabpanel" aria-labelledby={`manager-tab-${tab}`}>
            {tab === 0 && <><h3 className={s.sectionLabel}><FileText size={15} />この半年で確認できる実績と行動<span className={s.badge}>整理案 · デモ</span></h3>{employee.achievements.map(a => <article className={s.card} key={a.title}><div className={s.cardTop}><h4 className={s.cardTitle}>{a.title}</h4><span className={`${s.badge} ${a.recordIds.some(id => !employee.records.find(r => r.id === id)?.verified) ? s.amber : ''}`}>{a.recordIds.every(id => employee.records.find(r => r.id === id)?.verified) ? '記録あり' : '追加確認が必要'}</span></div><p className={s.body}>{a.detail}</p><Evidence records={employee.records.filter(r => a.recordIds.includes(r.id))} /></article>)}</>}
            {tab === 1 && <><h3 className={s.sectionLabel}><MessageSquare size={15} />2つの視点を、並べて確認する</h3><div className={s.twoColumns}><article className={s.card}><h4 className={s.cardTitle}>本人の振り返り</h4><p className={s.body}>{employee.selfComment}</p><span className={`${s.badge} ${s.amber}`}>本人の認識</span></article><article className={s.card}><h4 className={s.cardTitle}>上長コメント</h4><p className={s.body}>{employee.managerComment}</p><span className={s.badge}>上長が記入</span></article></div><p className={s.callout}>一致していない点は、評価を自動で決める理由ではなく、面談で認識をすり合わせる材料です。</p></>}
            {tab === 2 && <><h3 className={s.sectionLabel}><Layers3 size={15} />前回の目標と、今回の記録を比較</h3><article className={s.card}><h4 className={s.cardTitle}>前回の評価・期待</h4><p className={s.body}>{employee.previousReview}</p><p className={s.small}>出典：2026年3月の上長評価（サンプル）</p></article><article className={s.card}><h4 className={s.cardTitle}>今回確認できる変化</h4><p className={s.body}>{employee.achievements[0].detail}</p><Evidence records={employee.records.filter(r => employee.achievements[0].recordIds.includes(r.id))} /></article><p className={s.callout}>成長の捉え方や次期の期待は、本人と上長が対話して確認します。比較結果による自動採点は行いません。</p></>}
            {tab === 3 && <><h3 className={s.sectionLabel}><MessageSquare size={15} />面談で、もう一歩聞きたいこと</h3><p className={s.body}>内容を確認したらチェックを入れてください。本人への質問と必要な支援を準備します。</p>{employee.interviewPoints.map(p => <label className={s.checkItem} key={p.id}><input type="checkbox" checked={checked.includes(p.id)} onChange={() => toggle(p.id)} /><span><strong>{p.text}</strong><span className={s.body}>{p.reason}</span></span></label>)}<p className={s.callout}>情報が不足している項目は、面談前の確認事項として残します。未確認の申告から成果を断定しません。</p></>}
            <p className={s.status} role="status">整理済み · サンプル資料です。元の記録と照らし合わせてご確認ください。</p>
          </div>
        </>}
      </section>
    </div>
  </>;
}
