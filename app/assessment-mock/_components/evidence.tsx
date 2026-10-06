import type { EvidenceRecord } from '../_data/demo';
import s from '../mock.module.css';

export default function Evidence({ records }: { records: EvidenceRecord[] }) {
  if (!records.length) return null;
  return <details className={s.evidence}><summary>根拠の記録を確認 · {records.length}件</summary>
    {records.map(record => <div className={s.record} key={record.id}>
      <div className={s.recordHead}><strong>{record.title}</strong><span className={`${s.badge} ${record.verified ? '' : s.amber}`}>{record.verified ? '確認済みの事実' : '本人申告・要確認'}</span></div>
      <p className={s.body}>{record.body}</p><div className={s.recordSource}>{record.date} · {record.source} · {record.id}</div>
    </div>)}
  </details>;
}
