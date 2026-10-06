export type Answer = { theme: 'evidence' | 'change' | 'next' | 'unknown'; explanation: string; recordIds: string[]; confirmation: string };
export const questionExamples = ['どの実績が評価の根拠になったか', '前回から何が変わったか', '次期に期待されること'];
const unknown: Answer = { theme: 'unknown', explanation: 'この質問に対応する説明材料は、現在のサンプル記録から作成できません。評価・処遇に関する判断や、記録にない事実は補いません。', recordIds: [], confirmation: 'この質問を判断できる根拠は、サンプル記録にありません。上長に確認してください。' };
export function answerQuestion(question: string): Answer {
  const q = question.trim();
  if (!q || /賞与|給与|処遇|金額|昇給|他の社員|年収/.test(q)) return { ...unknown };
  if (/前回|変化|変わ|比較|成長/.test(q)) return {
    theme: 'change', explanation: '前回は「担当領域の自立」が期待として記載されていました。今回の記録では、デザイン制作とレビュー調整を担当し、予定どおりの公開につながったことが確認できます。上長はこの点を、担当業務を自律的に進めた実例として捉えています。', recordIds: ['ms-1'], confirmation: '役割の広がりをどう感じているか、本人の認識も面談で確認します。前回評価の出典は2026年3月の上長評価（サンプル）です。',
  };
  if (/次期|次の|期待|今後|これから|改善/.test(q)) return {
    theme: 'next', explanation: '上長は、制作を安定して進めながらチームへの貢献を続けることを期待しています。本人はレビューが集中した際の時間不足を挙げているため、優先順位の相談と支援体制を面談で話し合う材料になります。', recordIds: ['ms-4'], confirmation: '時間不足は本人の申告です。業務量・相談のタイミング・必要な支援を、本人と上長が一緒に確認します。次期目標は対話を通じて決めます。',
  };
  if (/根拠|実績|理由|なぜ|評価/.test(q)) return {
    theme: 'evidence', explanation: '上長が記入した評価理由には、ブランドサイトのデザイン制作とレビュー調整の完了、レビュー用チェックリストの共有が挙げられています。制作・調整は本人が担当し、実装と全体進行は別の担当者が行いました。チームの成果すべてを本人の成果として扱う説明にはしません。', recordIds: ['ms-1', 'ms-2'], confirmation: 'チェックリストによる手戻り削減は未集計です。後輩サポートの頻度・効果も本人申告のため、評価の事実として断定せず面談で確認します。',
  };
  return { ...unknown };
}
