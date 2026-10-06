'use client';
import { useState } from 'react';
import { ArrowRight, BookOpen, Check, PencilLine, Plus, Save, Sparkles } from 'lucide-react';
import { employees } from '../_data/demo';
import { organizeReflection, sampleReflection, type ReflectionDraft } from './organize';
import s from '../mock.module.css';

type SavedRecord = { id: string; date: string; original: string; draft: ReflectionDraft };
const fieldLabels: [keyof ReflectionDraft, string][] = [['achievement', '成果・実績'], ['action', '行動・担当範囲'], ['challenge', '課題・気づき'], ['nextStep', '次の一歩']];
const initialRecords: SavedRecord[] = employees[0].records.map(r => ({ id: r.id, date: r.date, original: r.body, draft: { achievement: r.title, action: r.body, challenge: '面談で一緒に確認します。', nextStep: '記録をもとに、次期の取り組みを相談します。' } }));

export default function ReflectionPage() {
  const [input, setInput] = useState('');
  const [responsibility, setResponsibility] = useState('');
  const [evidence, setEvidence] = useState('');
  const [draft, setDraft] = useState<ReflectionDraft | null>(null);
  const [original, setOriginal] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [status, setStatus] = useState('');
  const [records, setRecords] = useState(initialRecords);
  const [selected, setSelected] = useState<SavedRecord | null>(null);
  const saved = !!draft && records.some(r => r.original === original && JSON.stringify(r.draft) === JSON.stringify(draft));
  const dirty = !!draft && input.trim() !== original;

  async function organize() {
    if (busy) return;
    if (!input.trim()) { setError('振り返りを入力してください。'); return; }
    const capturedInput = input.trim();
    setError(''); setBusy(true); setStatus('振り返りの整理案を準備しています…');
    await new Promise(resolve => setTimeout(resolve, 350));
    setDraft(organizeReflection(capturedInput, responsibility, evidence)); setOriginal(capturedInput); setBusy(false); setStatus('整理できました。確認して保存してください。');
  }
  function reflectAnswers() {
    if (!draft) return;
    if (!responsibility.trim() && !evidence.trim()) { setError('担当範囲または根拠を入力してください。'); return; }
    const updated = organizeReflection(original, responsibility, evidence);
    setDraft({ ...draft, action: updated.action }); setError(''); setStatus('担当範囲と根拠を整理案に反映しました。');
  }
  function save() {
    if (!draft || saved || dirty) return;
    if (!draft.achievement.trim()) { setError('成果・実績を入力してから保存してください。'); return; }
    const record: SavedRecord = { id: crypto.randomUUID(), date: new Date().toLocaleDateString('ja-JP', { timeZone: 'Asia/Tokyo' }).replaceAll('/', '.'), original, draft: { ...draft } };
    setRecords(current => [record, ...current]); setSelected(record); setError(''); setStatus('記録を保存しました。');
  }
  function newReflection() { setInput(''); setDraft(null); setOriginal(''); setResponsibility(''); setEvidence(''); setError(''); setStatus('新しい振り返りを入力してください。'); setSelected(null); }

  return <>
    <div className={s.pageHeading}><div><p className={s.eyebrow}>社員向け</p><h1 className={s.title}>業務の振り返り</h1><p className={s.subtitle}>今日の業務を入力して、面談に使える記録へ。</p></div><div className={s.period}><span className={s.avatar} style={{ width: 28, height: 28, fontSize: 9 }}>MS</span>佐藤 美咲さんの画面</div></div>
    <div className={s.reflectionGrid}>
      <div>
        <section className={s.panel}><div className={s.panelHead}><h2><PencilLine size={16} style={{ display: 'inline', marginRight: 8 }} />今日の振り返り</h2><span className={s.badge}>本人の記録</span></div><div className={s.content}>
          <label className={s.label} htmlFor="reflection-input">今日の振り返り</label><textarea id="reflection-input" className={s.input} rows={5} value={input} disabled={busy} onChange={e => { setInput(e.target.value); setError(''); }} placeholder="例：デザインレビューで指摘された点を修正しました。自分が担当したのは…" />
          <div className={s.actionRow}><button className={s.secondary} disabled={busy} onClick={() => { setInput(sampleReflection); setError(''); }}><BookOpen size={14} />サンプルを入力</button><button className={s.primary} disabled={busy} onClick={organize}><Sparkles size={15} />{busy ? '整理しています…' : 'AIで整理'}</button></div>

        </div></section>
        {draft ? <section className={s.panel} style={{ marginTop: 22 }}><div className={s.panelHead}><h2><Sparkles size={16} style={{ display: 'inline', marginRight: 8 }} />整理結果を確認</h2><span className={s.badge}>編集可能</span></div><div className={s.content}>

          {fieldLabels.slice(0, 2).map(([key, label]) => <div key={key}><label className={s.label} htmlFor={`draft-${key}`}>{label}</label><textarea id={`draft-${key}`} className={s.input} rows={key === 'action' ? 3 : 2} value={draft[key]} onChange={e => { setDraft({ ...draft, [key]: e.target.value }); setError(''); }} /></div>)}
          <details className={s.disclosure}><summary>課題・次の一歩を編集</summary>
            {fieldLabels.slice(2).map(([key, label]) => <div key={key}><label className={s.label} htmlFor={`draft-${key}`}>{label}</label><textarea id={`draft-${key}`} className={s.input} rows={key === 'action' ? 3 : 2} value={draft[key]} onChange={e => { setDraft({ ...draft, [key]: e.target.value }); setError(''); }} /></div>)}
          </details>
          <details className={s.disclosure}><summary>担当範囲・根拠を補足</summary><label className={s.label} htmlFor="responsibility">自分が担当した範囲</label><textarea id="responsibility" className={s.input} rows={2} placeholder="自分で行ったことと、他の人が担当したこと" value={responsibility} onChange={e => setResponsibility(e.target.value)} /><label className={s.label} htmlFor="reflection-evidence">確認できる事実・根拠</label><textarea id="reflection-evidence" className={s.input} rows={2} placeholder="資料、レビューコメント、日付など" value={evidence} onChange={e => setEvidence(e.target.value)} /><div className={s.actionRow}><span /><button className={s.secondary} onClick={reflectAnswers}>回答を整理案に反映<ArrowRight size={14} /></button></div></details>
          {dirty && <p className={s.callout}>入力した振り返りが変わっています。もう一度「AIで整理」を押してから保存してください。</p>}
          <div className={s.actionRow}><p className={s.small}>保存はこのデモ内のみ</p><button className={s.primary} disabled={saved || dirty || busy} onClick={save}>{saved ? <Check size={15} /> : <Save size={15} />}{saved ? '保存済み' : '記録を保存'}</button></div>
        </div></section> : null}
        {error && <p className={s.error} role="alert">{error}</p>}<p className={s.status} role="status">{status}</p>
        {selected && <section className={s.panel} style={{ marginTop: 22 }} role="region" aria-label="保存した記録"><div className={s.panelHead}><h2>保存した記録</h2><span className={s.small}>{selected.date}</span></div><div className={s.content}>{fieldLabels.map(([key, label]) => <div key={key} style={{ marginBottom: 18 }}><h3 className={s.cardTitle}>{label}</h3><p className={s.body}>{selected.draft[key]}</p></div>)}<details className={s.evidence}><summary>元の振り返りを確認</summary><p className={s.body} style={{ marginTop: 12 }}>{selected.original}</p></details></div></section>}
      </div>
      <aside><details className={`${s.panel} ${s.historyDisclosure}`}><summary>過去の記録 <span>{records.length}件</span></summary>{records.map(record => <button key={record.id} className={s.historyItem} aria-pressed={selected?.id === record.id} onClick={() => setSelected(record)}><span className={s.small}>{record.date}</span><strong>{record.draft.achievement.length > 40 ? `${record.draft.achievement.slice(0, 40)}…` : record.draft.achievement}</strong><span className={`${s.badge} ${s.amber}`}>本人の記録</span></button>)}<div className={s.content}><button className={s.secondary} onClick={newReflection} disabled={busy} style={{ width: '100%' }}><Plus size={14} />新しい振り返り</button></div></details></aside>
    </div>
  </>;
}
