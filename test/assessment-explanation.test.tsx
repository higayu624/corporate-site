import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ExplanationPage from '@/app/assessment-mock/explanation/page';

afterEach(cleanup);
describe('社員別の評価案', () => {
  it('質問入力なしで評価案と本人の実績・近い評価事例を表示する', async () => {
    render(<ExplanationPage />);
    expect(screen.getByRole('heading', { name: '評価案と根拠' })).toBeInTheDocument();
    expect(screen.getByRole('region', { name: '今回の評価案' })).toHaveTextContent('期待を満たしている');
    expect(screen.getAllByRole('link', { name: /Slack.*公開報告/ })[0]).toHaveAttribute('href', '/assessment-mock/sources/ms-1#slack');
    expect(screen.getByRole('region', { name: '近い過去の評価事例' })).toHaveTextContent('デザイナー');
    expect(screen.getByRole('region', { name: '近い過去の評価事例' })).toHaveTextContent('レビュー手順');
    expect(screen.queryByText(/面談で確認すること/)).not.toBeInTheDocument();
    expect(screen.queryByText('前回からの変化')).not.toBeInTheDocument();
    expect(screen.queryByRole('region', { name: '過去の評価' })).not.toBeInTheDocument();
  });
  it('社員切替で評価・根拠・評価事例を職種に合わせて切り替える', async () => {
    const user = userEvent.setup(); render(<ExplanationPage />);
    await user.click(screen.getByRole('button', { name: /田中 悠斗/ }));
    expect(screen.getByRole('region', { name: '今回の評価案' })).toHaveTextContent('期待を満たしている');
    expect(screen.getAllByRole('link', { name: /メール.*受注API/ })[0]).toHaveAttribute('href', '/assessment-mock/sources/yt-2#email');
    expect(screen.queryByRole('link', { name: /公開報告/ })).not.toBeInTheDocument();
    expect(screen.getByRole('region', { name: '近い過去の評価事例' })).toHaveTextContent('エンジニア');
    expect(screen.getByRole('region', { name: '近い過去の評価事例' })).toHaveTextContent('仕様確認');
    expect(screen.getByRole('region', { name: '近い過去の評価事例' })).not.toHaveTextContent('デザイナー');
    await user.click(screen.getByRole('button', { name: /鈴木 遥/ }));
    expect(screen.getAllByRole('link', { name: /スプレッドシート.*案件進行/ })[0]).toHaveAttribute('href', '/assessment-mock/sources/hs-1#sheet');
  });
  it('上長の編集と確認状態を社員別に保持し、空欄で確認できない', async () => {
    const user = userEvent.setup(); render(<ExplanationPage />);
    await user.click(screen.getByText('評価案を編集'));
    const comment = screen.getByLabelText('評価コメント');
    await user.clear(comment); await user.click(screen.getByRole('button', { name: '上長確認を完了' }));
    expect(screen.getByRole('alert')).toHaveTextContent('評価コメント');
    await user.type(comment, '担当業務の完了を確認した。');
    await user.click(screen.getByRole('button', { name: '上長確認を完了' }));
    expect(screen.getByRole('button', { name: '確認済み' })).toBeDisabled();
    await user.click(screen.getByRole('button', { name: /田中 悠斗/ }));
    expect(screen.getByRole('button', { name: '上長確認を完了' })).toBeEnabled();
    await user.click(screen.getByRole('button', { name: /佐藤 美咲/ }));
    expect(within(screen.getByRole('region', { name: '今回の評価案' })).getByText('担当業務の完了を確認した。')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '確認済み' })).toBeDisabled();
  });
});
