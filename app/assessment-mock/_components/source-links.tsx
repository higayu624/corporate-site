import { ExternalLink } from 'lucide-react';
import { recordSources, sourceLabels } from '../_data/demo';
import s from '../mock.module.css';

export default function SourceLinks({ recordIds }: { recordIds: string[] }) {
  return <div className={s.sourceLinks} aria-label="根拠リンク">{recordIds.flatMap(id => (recordSources[id] ?? []).map(source =>
    <a key={`${id}-${source.kind}`} href={`/assessment-mock/sources/${id}#${source.kind}`} target="_blank" rel="noopener noreferrer"><span className={s.sourceKind}>{sourceLabels[source.kind]}</span>{source.label}<ExternalLink size={13} /><span className={s.srOnly}>（デモの元記録・新しいタブ）</span></a>
  ))}</div>;
}
