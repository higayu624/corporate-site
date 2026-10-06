'use client';
import { useEffect, useState } from 'react';
import { CalendarDays, Check, FileCheck2 } from 'lucide-react';
import Link from 'next/link';
import { employees, periodLabel } from '../_data/demo';
import { buildEvaluation } from '../_data/evaluations';
import SourceLinks from '../_components/source-links';
import s from '../mock.module.css';

type Edit = { rating: string; comment: string };
const ratings = ['期待を上回っている', '期待を満たしている', '一部に支援が必要', '面談で確認が必要'];
export default function ExplanationPage() {
  const [employeeId, setEmployeeId] = useState(employees[0].id);
  const [edits, setEdits] = useState<Record<string, Edit>>({});
  const [confirmed, setConfirmed] = useState<string[]>([]);
  const [error, setError] = useState('');
  useEffect(() => {
    function selectFromLink() {
      const id = window.location.hash.slice(1);
      if (employees.some(employee => employee.id === id)) setEmployeeId(id);
    }
    selectFromLink(); window.addEventListener('hashchange', selectFromLink);
    return () => window.removeEventListener('hashchange', selectFromLink);
  }, []);
  const employee = employees.find(employee => employee.id === employeeId)!;
  const evaluation = buildEvaluation(employee);
  const edit = edits[employeeId] ?? { rating: evaluation.rating, comment: evaluation.comment };
  const done = confirmed.includes(employeeId);
  function updateEdit(value: Partial<Edit>) { setEdits(current => ({ ...current, [employeeId]: { ...edit, ...value } })); setConfirmed(current => current.filter(id => id !== employeeId)); setError(''); }
  function confirm() {
    if (!edit.comment.trim()) { setError('評価コメントを入力してください。'); return; }
    setConfirmed(current => [...current, employeeId]); setError('');
  }
  return <>
    <div className={s.pageHeading}><div><p className={s.eyebrow}>上長向け</p><h1 className={s.title}>評価案と根拠</h1><p className={s.subtitle}>今回の実績 × 近い評価事例から、社員別に出力。</p></div><div className={s.period}><CalendarDays size={15} />{periodLabel}</div></div>
    <div className={s.grid}>
      <aside><section className={s.panel}><div className={s.panelHead}><h2>評価対象の社員</h2><span className={s.small}>3名</span></div><div className={s.employeeList}>{employees.map(item => <button key={item.id} className={s.employee} aria-pressed={item.id === employeeId} onClick={() => { setEmployeeId(item.id); setError(''); }}><span className={s.avatar}>{item.initials}</span><span><strong>{item.name}</strong><span className={s.small}>{item.role}</span></span></button>)}</div></section></aside>
      <div>
        <section className={s.panel}>
          <div className={s.profile}><span className={s.avatar}>{employee.initials}</span><div><h2>{employee.name}</h2><p className={s.small}>{employee.role}</p></div><div className={s.profileAction}><Link className={s.secondary} href={`/assessment-mock/manager#${employee.id}`}>実績を確認</Link></div></div>
          <div className={s.content}>
            <section className={s.evaluationSummary} role="region" aria-label="今回の評価案"><div className={s.cardTop}><span className={s.badge}>{done ? '上長確認済み · デモ' : 'AI評価案 · デモ'}</span><span className={s.small}>近い事例 {evaluation.comparableCases.length}件を参照</span></div><h2>{edit.rating}</h2><p className={s.body}>{edit.comment}</p></section>
            <h3 className={s.sectionLabel} style={{ marginTop: 24 }}><FileCheck2 size={16} />評価の根拠</h3>
            {evaluation.criteria.map(criterion => <article className={s.card} key={criterion.title}><div className={s.cardTop}><h4 className={s.cardTitle}>{criterion.title}</h4><span className={`${s.badge} ${criterion.supported ? '' : s.amber}`}>{criterion.supported ? '記録で確認' : '要確認'}</span></div><p className={s.body}>{criterion.reason}</p><SourceLinks recordIds={criterion.recordIds} /></article>)}
            <section role="region" aria-label="近い過去の評価事例" className={s.comparableSection}>
              <h3 className={s.sectionLabel}>近い過去の評価事例<span className={s.badge}>架空・匿名</span></h3>
              <div className={s.twoColumns}>{evaluation.comparableCases.map(example => <article key={example.id} className={s.card}>
                <div className={s.caseHeading}><h4 className={s.cardTitle}>事例{example.id} · {example.role}</h4><span className={s.small}>{example.period}</span></div>
                <span className={`${s.badge} ${example.rating === '一部に支援が必要' ? s.amber : ''}`}>{example.rating}</span>
                <p className={s.body} style={{ marginTop: 12 }}>{example.achievement}</p>
                <p className={s.small} style={{ marginTop: 8 }}>共通：{example.common.join('・')}</p>
                <details className={s.evidence}><summary>評価理由</summary><p className={s.body} style={{ marginTop: 10 }}>{example.reason}</p></details>
              </article>)}</div>
              <p className={s.small}>実績の共通点を参考に比較。本人の担当範囲と未確認事項は個別に判断します。</p>
            </section>
            <details className={s.disclosure}><summary>評価案を編集</summary><label className={s.label} htmlFor="evaluation-rating">評価区分</label><select id="evaluation-rating" className={s.input} value={edit.rating} onChange={event => updateEdit({ rating: event.target.value })}>{ratings.map(rating => <option key={rating}>{rating}</option>)}</select><label className={s.label} htmlFor="evaluation-comment">評価コメント</label><textarea id="evaluation-comment" className={s.input} rows={3} value={edit.comment} onChange={event => updateEdit({ comment: event.target.value })} /></details>
            {error && <p className={s.error} role="alert">{error}</p>}
            <div className={s.actionRow}><span className={s.small}>評価案を確認してから完了</span><button className={s.primary} disabled={done} onClick={confirm}>{done && <Check size={15} />}{done ? '確認済み' : '上長確認を完了'}</button></div>
            <p className={s.status} role="status">{done ? '上長確認済み。このデモ内のみ保存。' : '評価案を自動表示しました。'}</p>
          </div>
        </section>
      </div>
    </div>
  </>;
}
