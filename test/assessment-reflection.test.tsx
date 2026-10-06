import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ReflectionPage from '@/app/assessment-mock/reflection/page';
import { organizeReflection } from '@/app/assessment-mock/reflection/organize';

afterEach(cleanup);
describe('社員の振り返り', () => {
  it('自由入力にない成果や数値を足さず、担当範囲と根拠を反映する', () => {
    const draft = organizeReflection('仕様書を見直した。', '自分はチェックを担当', 'レビューコメント');
    expect(draft.achievement).toBe('仕様書を見直した。');
    expect(draft.action).toContain('自分はチェックを担当');
    expect(draft.action).toContain('レビューコメント');
    expect(JSON.stringify(draft)).not.toMatch(/売上|\d+%|削減した/);
  });
  it('空白だけの振り返りは整理できない', async () => {
    const user = userEvent.setup(); render(<ReflectionPage />);
    await user.type(screen.getByLabelText('今日の振り返り'), '   ');
    await user.click(screen.getByRole('button', { name: 'AIで整理' }));
    expect(screen.getByRole('alert')).toHaveTextContent('振り返り');
    expect(screen.queryByLabelText('成果・実績')).not.toBeInTheDocument();
  });
  it('追加回答と編集した整理案を保存し、履歴から確認できる', async () => {
    const user = userEvent.setup(); render(<ReflectionPage />);
    await user.type(screen.getByLabelText('今日の振り返り'), '仕様書を見直した。');
    await user.click(screen.getByRole('button', { name: 'AIで整理' }));
    await screen.findByLabelText('成果・実績');
    await user.type(screen.getByLabelText('自分が担当した範囲'), '仕様書のチェック');
    await user.type(screen.getByLabelText('確認できる事実・根拠'), 'レビューコメント');
    await user.click(screen.getByRole('button', { name: '回答を整理案に反映' }));
    expect((screen.getByLabelText('行動・担当範囲') as HTMLTextAreaElement).value).toContain('仕様書のチェック');
    await user.clear(screen.getByLabelText('次の一歩'));
    await user.type(screen.getByLabelText('次の一歩'), '明日リーダーに確認する');
    await user.click(screen.getByRole('button', { name: '記録を保存' }));
    expect(screen.getByRole('button', { name: '保存済み' })).toBeDisabled();
    await user.click(screen.getByRole('button', { name: /仕様書を見直した。/ }));
    expect(screen.getByRole('region', { name: '保存した記録' })).toHaveTextContent('明日リーダーに確認する');
    expect(screen.getByRole('region', { name: '保存した記録' })).toHaveTextContent('仕様書を見直した。');
  });
  it('空の整理案は保存できず、履歴を増やさない', async () => {
    const user = userEvent.setup(); render(<ReflectionPage />);
    await user.click(screen.getByRole('button', { name: 'サンプルを入力' }));
    await user.click(screen.getByRole('button', { name: 'AIで整理' }));
    const achievement = await screen.findByLabelText('成果・実績');
    await user.clear(achievement);
    await user.click(screen.getByRole('button', { name: '記録を保存' }));
    expect(screen.getByRole('alert')).toHaveTextContent('成果・実績');
    expect(screen.queryByRole('button', { name: '保存済み' })).not.toBeInTheDocument();
  });
});
