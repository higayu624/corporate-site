import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ExplanationPage from '@/app/assessment-mock/explanation/page';
import { answerQuestion } from '@/app/assessment-mock/explanation/answers';
import { employees } from '@/app/assessment-mock/_data/demo';

afterEach(cleanup);
describe('評価理由の説明', () => {
  it('既知テーマだけに回答し、存在する記録を根拠にする', () => {
    expect(answerQuestion('前回から何が変わった？').theme).toBe('change');
    expect(answerQuestion('次期に期待されることは？').theme).toBe('next');
    const answer = answerQuestion('評価の根拠を教えて');
    expect(answer.theme).toBe('evidence');
    expect(answer.recordIds.length).toBeGreaterThan(0);
    for (const id of answer.recordIds) expect(employees[0].records.some(r => r.id === id)).toBe(true);
    const unknown = answerQuestion('賞与はいくら増えますか？');
    expect(unknown.theme).toBe('unknown');
    expect(unknown.recordIds).toEqual([]);
    expect(unknown.confirmation).toContain('上長');
  });
  it('質問例で根拠を示し、編集した説明を一度だけメモに残す', async () => {
    const user = userEvent.setup(); render(<ExplanationPage />);
    await user.click(screen.getByRole('button', { name: 'どの実績が評価の根拠になったか' }));
    await screen.findByText('回答の要点');
    expect(screen.getByLabelText('説明案').closest('details')).not.toHaveAttribute('open');
    await user.click(screen.getByText('説明文を編集'));
    const explanation = screen.getByLabelText('説明案');
    expect((explanation as HTMLTextAreaElement).value).toContain('実装と全体進行は別の担当者');
    await user.click(screen.getByText(/根拠の記録を確認/));
    expect(screen.getByText(/6月18日に予定どおり公開/)).toBeInTheDocument();
    await user.clear(explanation); await user.type(explanation, '本人の担当範囲を面談で確認する。');
    await user.click(screen.getByRole('button', { name: '面談メモに追加' }));
    expect(screen.getByRole('region', { name: '面談メモ' })).toHaveTextContent('本人の担当範囲を面談で確認する。');
    expect(screen.getByRole('button', { name: 'メモに追加済み' })).toBeDisabled();
  });
  it('空白質問を拒否し、範囲外質問は確認事項として残せる', async () => {
    const user = userEvent.setup(); render(<ExplanationPage />);
    await user.type(screen.getByLabelText('評価理由についての質問'), '   ');
    await user.click(screen.getByRole('button', { name: '説明材料を作成' }));
    expect(screen.getByRole('alert')).toHaveTextContent('質問');
    await user.clear(screen.getByLabelText('評価理由についての質問'));
    await user.type(screen.getByLabelText('評価理由についての質問'), '賞与はいくら増えますか？');
    await user.click(screen.getByRole('button', { name: '説明材料を作成' }));
    await screen.findByLabelText('説明案');
    expect(screen.getByText('この質問を判断できる根拠は、サンプル記録にありません。上長に確認してください。')).toBeInTheDocument();
    await user.click(screen.getByText(/面談メモ/, { selector: 'summary' }));
    await user.type(screen.getByLabelText('面談で確認したい追加質問'), '成果の担当範囲を再確認したい');
    await user.click(screen.getByRole('button', { name: '確認事項を残す' }));
    expect(screen.getByRole('region', { name: '面談メモ' })).toHaveTextContent('成果の担当範囲を再確認したい');
  });
});
