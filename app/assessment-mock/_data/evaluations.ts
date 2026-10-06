import type { Employee } from './demo';

export type ReviewGoal = { title: string; expectation: string; recordIds: string[] };
export type PastReview = { id: string; period: string; rating: string; comment: string; goals: ReviewGoal[] };
export const pastReviews: Record<string, PastReview[]> = {
  misaki: [
    { id: 'ms-2025-09', period: '2025年9月', rating: '一部に支援が必要', comment: '制作は安定。レビュー調整は上長の支援が必要。', goals: [] },
    { id: 'ms-2026-03', period: '2026年3月', rating: '一部に支援が必要', comment: '担当領域の自立を次期の目標とし、レビュー手順の共有を期待。', goals: [
      { title: '担当業務の自立', expectation: '制作とレビュー調整を自律的に進める', recordIds: ['ms-1'] },
      { title: 'チームへの貢献', expectation: 'レビュー手順をチームに共有する', recordIds: ['ms-2'] },
    ] },
  ],
  yuto: [
    { id: 'yt-2025-09', period: '2025年9月', rating: '一部に支援が必要', comment: '実装の品質は安定。仕様確認に支援が必要。', goals: [] },
    { id: 'yt-2026-03', period: '2026年3月', rating: '一部に支援が必要', comment: '実装品質の維持、問い合わせ改善、着手前の仕様確認を期待。', goals: [
      { title: '実装・テスト', expectation: '品質を保って改修を完了する', recordIds: ['yt-2'] },
      { title: '運用改善', expectation: '問い合わせ対応の仕組みを整える', recordIds: ['yt-1'] },
      { title: '着手前の仕様確認', expectation: '不明点を着手前に共有する', recordIds: ['yt-3'] },
    ] },
  ],
  haruka: [
    { id: 'hs-2025-09', period: '2025年9月', rating: '期待を満たしている', comment: '単独案件の進行と顧客調整を安定して担当。', goals: [] },
    { id: 'hs-2026-03', period: '2026年3月', rating: '期待を満たしている', comment: '複数案件の進行安定化と、顧客との合意形成を期待。情報共有は改善事項。', goals: [
      { title: '複数案件の進行', expectation: '合意した納期で納品する', recordIds: ['hs-1'] },
      { title: '顧客との合意形成', expectation: '追加要望と対応範囲を合意する', recordIds: ['hs-2'] },
    ] },
  ],
};

// デモ専用の固定ルール。履歴の目標と本人の確認済み記録を対応付ける。
export function buildEvaluation(employee: Employee, history: PastReview[] = pastReviews[employee.id] ?? []) {
  const previous = history.at(-1);
  const criteria = (previous?.goals ?? []).map(goal => {
    const records = employee.records.filter(record => goal.recordIds.includes(record.id));
    const supported = goal.recordIds.length > 0 && records.length === goal.recordIds.length && records.every(record => record.verified);
    return { ...goal, recordIds: records.map(record => record.id), supported, reason: supported ? records.map(record => record.body.split('。')[0] + '。').join('') : '本人の投稿のみ。面談で確認が必要です。' };
  });
  const supportedCount = criteria.filter(criterion => criterion.supported).length;
  const rating = criteria.length > 0 && supportedCount === criteria.length ? '期待を満たしている' : '面談で確認が必要';
  const comment = criteria.length ? `前回の目標${criteria.length}項目のうち、${supportedCount}項目に確認済みの記録があります。` : '評価に必要な過去の目標データがありません。';
  return { previous, criteria, rating, comment, supportedCount };
}
