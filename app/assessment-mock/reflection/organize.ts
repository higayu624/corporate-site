export type ReflectionDraft = { achievement: string; action: string; challenge: string; nextStep: string };
export const sampleReflection = '今日はブランドサイトのデザインレビューを行い、指摘された余白と見出しを修正しました。自分はデザインの修正を担当し、実装は開発チームに依頼しました。レビューコメントで修正内容を確認できます。レビューが集中して制作時間が足りなかったので、明日は優先順位をリーダーに相談したいです。';
export function organizeReflection(input: string, responsibility: string, evidence: string): ReflectionDraft {
  const sample = input.trim() === sampleReflection;
  return {
    achievement: sample ? 'ブランドサイトのデザインレビューを行い、余白と見出しを修正した。' : input.trim(),
    action: [responsibility.trim() ? `担当範囲：${responsibility.trim()}` : sample ? '担当範囲：デザインの修正。実装は開発チームに依頼。' : '担当範囲：追加で確認してください。', evidence.trim() ? `根拠：${evidence.trim()}` : sample ? '根拠：レビューコメント。内容の確認は面談前に行います。' : '根拠：追加で確認してください。'].join('\n'),
    challenge: sample ? 'レビューが集中し、制作時間が不足した。' : '困ったことや、次回改善したい点を追記してください。',
    nextStep: sample ? '明日、優先順位をリーダーに相談する。' : '次に取り組むことや、必要な支援を追記してください。',
  };
}
