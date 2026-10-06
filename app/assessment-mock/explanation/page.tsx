'use client';
import { useState } from 'react';
import { ArrowRight, Check, Plus, Send, Sparkles } from 'lucide-react';
import { employees, periodLabel } from '../_data/demo';
import Evidence from '../_components/evidence';
import { answerQuestion, questionExamples, type Answer } from './answers';
import s from '../mock.module.css';

type Exchange = { id: string; question: string; answer: Answer; draft: string };
type Note = { id: string; sourceId: string; title: string; body: string };
export default function ExplanationPage() {
  const employee = employees[0];
  const [question, setQuestion] = useState('');
  const [exchanges, setExchanges] = useState<Exchange[]>([]);
  const [selectedId, setSelectedId] = useState('');
  const [notes, setNotes] = useState<Note[]>([]);
  const [followup, setFollowup] = useState('');
  const [error, setError] = useState('');
  const [status, setStatus] = useState('');
  const [busy, setBusy] = useState(false);
  const selected = exchanges.find(e => e.id === selectedId);
  const added = !!selected && notes.some(n => n.sourceId === selected.id);

  async function ask(text: string) {
    if (busy) return;
    if (!text.trim()) { setError('質問を入力してください。質問例から選ぶこともできます。'); return; }
    setError(''); setBusy(true); setQuestion(text.trim()); setStatus('記録をもとに説明材料を準備しています…');
    await new Promise(resolve => setTimeout(resolve, 350));
    const answer = answerQuestion(text);
    const exchange: Exchange = { id: crypto.randomUUID(), question: text.trim(), answer, draft: answer.explanation };
    setExchanges(current => [...current, exchange]); setSelectedId(exchange.id); setBusy(false); setStatus('説明案を作成しました。');
  }
  function addNote() {
    if (!selected || added) return;
    if (!selected.draft.trim()) { setError('説明案を入力してから追加してください。'); return; }
    setNotes(current => [...current, { id: crypto.randomUUID(), sourceId: selected.id, title: selected.question, body: selected.draft }]); setError(''); setStatus('説明案を面談メモに追加しました。');
  }
  function addFollowup() {
    const text = followup.trim();
    if (!text) { setError('面談で確認したい追加質問を入力してください。'); return; }
    if (notes.some(n => n.sourceId === 'followup' && n.body === text)) { setError('同じ確認事項は追加済みです。'); return; }
    setNotes(current => [...current, { id: crypto.randomUUID(), sourceId: 'followup', title: '面談での確認事項', body: text }]); setFollowup(''); setError(''); setStatus('追加質問を確認事項として残しました。');
  }

  return <>
    <div className={s.pageHeading}><div><p className={s.eyebrow}>上長・社員向け</p><h1 className={s.title}>評価理由を確認</h1><p className={s.subtitle}>質問から、説明の要点と根拠を確認。</p></div><div className={s.period}>{employee.name} · {periodLabel}</div></div>
    <div className={s.explanationGrid}>
      <div>
        <section className={s.panel}>
          <div className={s.panelHead}><h2>評価について質問する</h2><Sparkles size={16} /></div>
          <div className={s.content}>
            <div className={s.questionList}>{questionExamples.map(text => <button key={text} className={s.question} onClick={() => ask(text)} disabled={busy}>{text}<ArrowRight size={14} /></button>)}</div>
            <label className={s.label} htmlFor="evaluation-question">評価理由についての質問</label>
            <textarea id="evaluation-question" className={s.input} rows={2} value={question} disabled={busy} onChange={e => setQuestion(e.target.value)} placeholder="聞きたいことを入力…" />
            <div className={s.actionRow}><span /><button className={s.primary} disabled={busy} onClick={() => ask(question)}><Send size={14} />{busy ? '準備中…' : '説明材料を作成'}</button></div>
            {error && <p className={s.error} role="alert">{error}</p>}<p className={s.status} role="status">{status}</p>
          </div>
        </section>
        {selected && <section className={s.panel} style={{ marginTop: 22 }}>
          <div className={s.panelHead}><h2>回答の要点</h2><span className={s.badge}>説明案</span></div>
          <div className={s.content}>
            <div className={s.chatQuestion}>{selected.question}</div>
            <ul className={s.answerPoints}>{selected.draft.split('。').filter(text => text.trim()).map((text, i) => <li key={i}>{text}。</li>)}</ul>
            <Evidence records={employee.records.filter(r => selected.answer.recordIds.includes(r.id))} />
            <div className={s.callout}><strong>要確認</strong><p style={{ margin: '6px 0 0' }}>{selected.answer.confirmation}</p></div>
            <details className={s.disclosure}><summary>説明文を編集</summary><label className={s.label} htmlFor="explanation-draft">説明案</label><textarea id="explanation-draft" rows={5} className={s.input} value={selected.draft} disabled={added || busy} onChange={e => setExchanges(current => current.map(item => item.id === selectedId ? { ...item, draft: e.target.value } : item))} /></details>
            <div className={s.actionRow}><span /><button className={s.secondary} disabled={added || busy} onClick={addNote}>{added ? <Check size={14} /> : <Plus size={14} />}{added ? 'メモに追加済み' : '面談メモに追加'}</button></div>
          </div>
        </section>}
        <section className={s.panel} style={{ marginTop: 22 }} role="region" aria-label="面談メモ">
          <details className={s.historyDisclosure} open={notes.length > 0}><summary>面談メモ <span>{notes.length}件</span></summary><div className={s.content}>
            {notes.length > 0 && <ul className={s.notes}>{notes.map(note => <li key={note.id}><h3>{note.title}</h3><p className={s.body}>{note.body}</p></li>)}</ul>}
            <label className={s.label} htmlFor="followup-question">面談で確認したい追加質問</label><textarea id="followup-question" className={s.input} rows={2} value={followup} onChange={e => setFollowup(e.target.value)} placeholder="面談で確かめたいこと…" />
            <div className={s.actionRow}><span /><button className={s.secondary} onClick={addFollowup}><Plus size={14} />確認事項を残す</button></div>
          </div></details>
        </section>
      </div>
      <aside>
        <details className={`${s.panel} ${s.historyDisclosure}`}><summary>今回の評価・コメント</summary><div className={s.content}><span className={s.badge}>上長が記入</span><h2 className={s.cardTitle} style={{ marginTop: 16 }}>期待を満たしている</h2><p className={s.body}>担当した制作を自律的に進め、チームのレビュー手順づくりにも取り組んだ。</p><h3 className={s.cardTitle} style={{ marginTop: 20 }}>上長のコメント</h3><p className={s.body}>{employee.managerComment}</p></div></details>
        {exchanges.length > 0 && <details className={`${s.panel} ${s.historyDisclosure}`} style={{ marginTop: 20 }}><summary>質問の履歴 <span>{exchanges.length}件</span></summary>{exchanges.map(e => <button key={e.id} className={s.historyItem} aria-pressed={e.id === selectedId} disabled={busy} onClick={() => { setSelectedId(e.id); setError(''); }}><strong>{e.question}</strong></button>)}</details>}
      </aside>
    </div>
  </>;
}
