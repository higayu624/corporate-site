import type { Employee } from './demo';

export type EvaluationCase = { id: string; role: string; period: string; topics: string[]; achievement: string; rating: string; reason: string };
export const evaluationCases: EvaluationCase[] = [
  { id: 'DS-01', role: 'デザイナー', period: '2025年下期', topics: ['サイト制作', 'レビュー調整'], achievement: 'デザイン制作とレビュー調整を担当し、予定どおり公開。', rating: '期待を満たしている', reason: '担当範囲の完了と、調整業務の自立を確認。チーム全体の成果とは分けて評価。' },
  { id: 'DS-02', role: 'デザイナー', period: '2025年上期', topics: ['レビュー手順'], achievement: 'レビュー用チェックリストを作成し、チームで使用。', rating: '期待を満たしている', reason: '手順の整備・共有を評価。手戻りの削減効果は未計測のため加点せず。' },
  { id: 'EN-01', role: 'エンジニア', period: '2025年下期', topics: ['API改修', '運用改善'], achievement: 'API改修・テストを完了し、FAQの運用を開始。', rating: '期待を満たしている', reason: '実装の完了と運用改善の実行を確認。対応時間の削減は未計測。' },
  { id: 'EN-02', role: 'エンジニア', period: '2025年上期', topics: ['仕様確認'], achievement: '実装は完了したが、着手前の仕様確認に課題。', rating: '一部に支援が必要', reason: '仕様確認不足をレビュー記録で確認し、上長の支援が必要と判断。' },
  { id: 'DR-01', role: 'ディレクター', period: '2025年下期', topics: ['進行管理'], achievement: '複数案件の進行を担当し、合意した納期で納品。', rating: '期待を満たしている', reason: '納期と進行管理の担当範囲を確認。制作・実装の成果とは分けて評価。' },
  { id: 'DR-02', role: 'ディレクター', period: '2025年上期', topics: ['顧客調整'], achievement: '追加要望を整理し、対応範囲を顧客と合意。', rating: '期待を満たしている', reason: '合意形成を評価。チームへの情報共有は改善事項として記録。' },
];
const recordTopics: Record<string, string[]> = {
  'ms-1': ['サイト制作', 'レビュー調整'], 'ms-2': ['レビュー手順'], 'ms-3': ['後輩サポート'], 'ms-4': ['時間配分'],
  'yt-1': ['運用改善'], 'yt-2': ['API改修'], 'yt-3': ['仕様確認'],
  'hs-1': ['進行管理'], 'hs-2': ['顧客調整'],
};

// デモ専用。職種・業務の共通点で架空事例を選び、確認済み記録との対応を示す。
export function buildEvaluation(employee: Employee, cases: EvaluationCase[] = evaluationCases) {
  const role = employee.role.split(' / ')[0];
  const topics = employee.records.flatMap(record => recordTopics[record.id] ?? []);
  const verifiedTopics = employee.records.filter(record => record.verified).flatMap(record => recordTopics[record.id] ?? []);
  const comparableCases = cases.filter(example => example.role === role && example.topics.some(topic => topics.includes(topic))).map(example => ({
    ...example, common: example.topics.filter(topic => topics.includes(topic)), verifiedMatches: example.topics.filter(topic => verifiedTopics.includes(topic)).length,
  })).sort((a, b) => b.verifiedMatches - a.verifiedMatches || a.id.localeCompare(b.id));
  const reference = comparableCases.find(example => example.verifiedMatches > 0);
  const criteria = employee.achievements.map(achievement => {
    const records = employee.records.filter(record => achievement.recordIds.includes(record.id));
    const supported = records.length === achievement.recordIds.length && records.length > 0 && records.every(record => record.verified);
    return { title: achievement.title, recordIds: records.map(record => record.id), supported, reason: achievement.detail };
  });
  const rating = reference?.rating ?? '面談で確認が必要';
  const comment = reference ? `事例${reference.id}を参考。` : '比較できる事例または確認済み記録が不足しています。';
  return { criteria, comparableCases, reference, rating, comment };
}

export type PersonalReview = { period: string; rating: string; comment: string };
export const personalReviews: Record<string, PersonalReview[]> = {
  misaki: [
    { period: '2026年3月', rating: '一部に支援が必要', comment: '担当領域の自立とレビュー調整を期待。' },
    { period: '2025年9月', rating: '一部に支援が必要', comment: '制作は安定。レビュー調整には上長の支援が必要。' },
  ],
  yuto: [
    { period: '2026年3月', rating: '一部に支援が必要', comment: '着手前の仕様確認と実装品質の維持を期待。' },
    { period: '2025年9月', rating: '一部に支援が必要', comment: '実装の品質は安定。仕様確認には支援が必要。' },
  ],
  haruka: [
    { period: '2026年3月', rating: '期待を満たしている', comment: '複数案件の進行と情報共有の改善を期待。' },
    { period: '2025年9月', rating: '期待を満たしている', comment: '案件の進行と顧客調整を安定して担当。' },
  ],
};
