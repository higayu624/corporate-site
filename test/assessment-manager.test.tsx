import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ManagerPage from '@/app/assessment-mock/manager/page';

afterEach(() => { cleanup(); window.history.replaceState({}, '', '/'); });
describe('面談準備とメモ', () => {
  it('収集後はタブなしで実績と根拠を表示する', async () => {
    const user = userEvent.setup(); render(<ManagerPage />);
    await user.click(screen.getByRole('button', { name: 'データを収集・整理' }));
    await screen.findByRole('heading', { name: 'ブランドサイトの公開' });
    expect(screen.queryByRole('tab')).not.toBeInTheDocument();
    expect(screen.queryByText('面談ポイントの確認')).not.toBeInTheDocument();
    expect(screen.getAllByRole('link', { name: /Slack.*公開報告/ })[0]).toHaveAttribute('href', '/assessment-mock/sources/ms-1#slack');
    await user.click(screen.getAllByText(/根拠の記録を確認/)[0]);
    expect(screen.getByText(/6月18日に予定どおり公開/)).toBeInTheDocument();
  });
  it('社員別にメモを保持し、再収集しても消さない', async () => {
    const user = userEvent.setup(); render(<ManagerPage />);
    await user.type(screen.getByLabelText('面談メモ'), '制作時間の配分を相談する');
    await user.click(screen.getByRole('button', { name: /田中 悠斗/ }));
    expect(screen.getByLabelText('面談メモ')).toHaveValue('');
    await user.type(screen.getByLabelText('面談メモ'), '仕様確認の手順を相談する');
    await user.click(screen.getByRole('button', { name: /佐藤 美咲/ }));
    expect(screen.getByLabelText('面談メモ')).toHaveValue('制作時間の配分を相談する');
    await user.click(screen.getByRole('button', { name: 'データを収集・整理' }));
    await screen.findByRole('heading', { name: 'ブランドサイトの公開' });
    expect(screen.getByLabelText('面談メモ')).toHaveValue('制作時間の配分を相談する');
    await user.click(screen.getByRole('button', { name: /田中 悠斗/ }));
    expect(screen.getByLabelText('面談メモ')).toHaveValue('仕様確認の手順を相談する');
  });
  it('評価案から同じ社員の実績へ戻れる', async () => {
    window.location.hash = 'yuto'; render(<ManagerPage />);
    expect(await screen.findByRole('heading', { name: '田中 悠斗' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '問い合わせ対応の改善' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '評価案を見る' })).toHaveAttribute('href', '/assessment-mock/explanation#yuto');
    expect(screen.queryByRole('heading', { name: 'ブランドサイトの公開' })).not.toBeInTheDocument();
  });
});
