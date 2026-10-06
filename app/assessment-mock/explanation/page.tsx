'use client';
import { useState } from 'react';
import { ArrowRight, Check, ClipboardList, FileCheck2, MessageSquare, Plus, Send, ShieldCheck, Sparkles } from 'lucide-react';
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
    setExchanges(current => [...current, exchange]); setSelectedId(exchange.id); setBusy(false); setStatus('説明案ができました。根拠を確認し、面談で伝える言葉に編集してください。');
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
    <div className={s.pageHeading}><div><p className={s.eyebrow}>03 / FOR BETTER CONVERSATIONS</p><h1 className={s.title}>評価の理由を、対話できる言葉に。</h1><p className={s.subtitle}>「なぜ、この評価なのか」に、記録をたどって向き合う。納得につながる面談のために。</p></div><div className={s.period}><MessageSquare size={15} />評価説明・面談サポート</div></div>
    <div className={s.notice}><ShieldCheck size={16} /><span><strong>評価は上長が決定。AIは、その説明を支援します。</strong> 説明案はサンプルです。事実と解釈を分け、記録にない内容は確認事項として残します。</span></div>
    <div className={s.explanationGrid}>
      <aside>
        <section className={s.panel}><div className={s.panelHead}><h2>今回の評価</h2><span className={s.badge}>上長が記入</span></div><div className={s.content}><div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}><span className={s.avatar}>{employee.initials}</span><div><strong>{employee.name}</strong><p className={s.small}>{periodLabel}</p></div></div><div className={s.review}><div className={s.reviewTitle}><strong style={{ fontSize: 14 }}>期待を満たしている</strong><FileCheck2 size={18} /></div><p className={s.body}>担当した制作を自律的に進め、チームのレビュー手順づくりにも取り組んだ。</p><p className={s.small} style={{ marginTop: 10 }}>上長による評価サンプル</p></div><h3 className={s.cardTitle}>上長のコメント</h3><p className={s.body}>{employee.managerComment}</p></div></section>
        <section className={s.panel} style={{ marginTop: 20 }}><div className={s.panelHead}><h2>説明したいポイント</h2><MessageSquare size={15} /></div><div className={s.content}><div className={s.questionList}>{questionExamples.map(text => <button key={text} className={s.question} onClick={() => ask(text)} disabled={busy}>{text}<ArrowRight size={14} style={{ flexShrink: 0 }} /></button>)}</div><p className={s.small}>質問例を選ぶと、説明案と根拠を表示します。</p></div></section>
        {exchanges.length > 0 && <section className={s.panel} style={{ marginTop: 20 }}><div className={s.panelHead}><h2>質問の履歴</h2><span className={s.small}>{exchanges.length}件</span></div>{exchanges.map(e => <button key={e.id} className={s.historyItem} aria-pressed={e.id === selectedId} disabled={busy} onClick={() => { setSelectedId(e.id); setError(''); }}><strong>{e.question}</strong><span className={s.small}>説明案を確認する →</span></button>)}</section>}
      </aside>
      <div>
        <section className={s.panel}><div className={s.panelHead}><h2><Sparkles size={16} style={{ display: 'inline', marginRight: 8 }} />評価理由の説明をサポート</h2><span className={s.badge}>根拠と対話を重視</span></div><div className={s.content}>
          {selected ? <><div className={s.chatQuestion}>{selected.question}</div><div className={s.answerHead}><span className={s.brandIcon} style={{ width: 30, height: 30, borderRadius: 9 }}><Sparkles size={16} /></span>記録に基づく説明案<span className={s.badge}>デモ回答</span></div><h3 className={s.cardTitle}>上長の評価理由を伝える言葉</h3><p className={s.small}>以下は上長の解釈を説明する案です。AIが新たに評価したものではありません。</p><label className={s.label} htmlFor="explanation-draft">説明案</label><textarea id="explanation-draft" rows={6} className={s.input} value={selected.draft} disabled={added || busy} onChange={e => setExchanges(current => current.map(item => item.id === selectedId ? { ...item, draft: e.target.value } : item))} /><Evidence records={employee.records.filter(r => selected.answer.recordIds.includes(r.id))} /><div className={s.callout}><strong>面談で確認すること・情報の不足</strong><p style={{ margin: '6px 0 0' }}>{selected.answer.confirmation}</p></div><div className={s.actionRow}><span className={s.small}>説明案を確認し、必要なら編集してください。</span><button className={s.secondary} disabled={added || busy} onClick={addNote}>{added ? <Check size={14} /> : <Plus size={14} />}{added ? 'メモに追加済み' : '面談メモに追加'}</button></div></> : <div className={s.empty} style={{ padding: '32px 0' }}><div className={s.emptyIcon}><MessageSquare size={27} /></div><h3>評価への質問を、対話の入口に。</h3><p>左の質問例、または下の入力欄から始めましょう。<br />説明の根拠と、面談で確認することを整理します。</p></div>}
          <div style={{ borderTop: '1px solid #dfe7e6', paddingTop: 22, marginTop: 24 }}><label className={s.label} htmlFor="evaluation-question">評価理由についての質問</label><textarea id="evaluation-question" className={s.input} rows={2} value={question} disabled={busy} onChange={e => setQuestion(e.target.value)} placeholder="例：前回の評価から、何が変わりましたか？" /><div className={s.actionRow}><span className={s.small}>既知のテーマにはデモ回答、それ以外は確認案内を表示します。</span><button className={s.primary} disabled={busy} onClick={() => ask(question)}><Send size={14} />{busy ? '説明材料を準備中…' : '説明材料を作成'}</button></div></div>
          {error && <p className={s.error} role="alert">{error}</p>}<p className={s.status} role="status">{status}</p>
        </div></section>
        <section className={s.panel} style={{ marginTop: 22 }} role="region" aria-label="面談メモ"><div className={s.panelHead}><h2><ClipboardList size={16} style={{ display: 'inline', marginRight: 8 }} />面談メモ</h2><span className={s.small}>{notes.length}件</span></div><div className={s.content}>{notes.length ? <ul className={s.notes}>{notes.map(note => <li key={note.id}><h3>{note.title}</h3><p className={s.body}>{note.body}</p></li>)}</ul> : <p className={s.body}>伝えたい説明や、面談で確かめたい質問をここに残せます。</p>}<label className={s.label} htmlFor="followup-question">面談で確認したい追加質問</label><textarea id="followup-question" className={s.input} rows={2} value={followup} onChange={e => setFollowup(e.target.value)} placeholder="例：後輩サポートで、具体的にどんな変化がありましたか？" /><div className={s.actionRow}><span className={s.small}>メモはこの画面内のみ。再読み込みで初期化されます。</span><button className={s.secondary} onClick={addFollowup}><Plus size={14} />確認事項を残す</button></div></div></section>
      </div>
    </div>
  </>;
}
