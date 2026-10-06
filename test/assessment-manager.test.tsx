import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ManagerPage from '@/app/assessment-mock/manager/page';

afterEach(cleanup);
describe('上長の面談準備', () => {
  it('選択した社員の記録と資料だけを表示する', async () => {
    const user = userEvent.setup();
    render(<ManagerPage />);
    expect(screen.getByRole('heading', { name: '佐藤 美咲' })).toBeInTheDocument();
    expect(screen.getByLabelText('蓄積された記録数')).toHaveTextContent('4');
    await user.click(screen.getByRole('button', { name: /田中 悠斗/ }));
    expect(screen.getByRole('heading', { name: '田中 悠斗' })).toBeInTheDocument();
    expect(screen.getByLabelText('蓄積された記録数')).toHaveTextContent('3');
    await user.click(screen.getByRole('button', { name: '面談資料を整理' }));
    expect(await screen.findByRole('tab', { name: '実績・行動' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '問い合わせ対応の改善' })).toBeInTheDocument();
    expect(screen.queryByText('ブランドサイトの公開')).not.toBeInTheDocument();
  });
  it('元の記録を確認し、視点・比較・面談項目を切り替えられる', async () => {
    const user = userEvent.setup();
    render(<ManagerPage />);
    await user.click(screen.getByRole('button', { name: '面談資料を整理' }));
    await screen.findByRole('tab', { name: '実績・行動' });
    const evidence = screen.getAllByText(/根拠の記録を確認/)[0];
    await user.click(evidence);
    expect(screen.getByText(/ブランドサイトのデザイン制作とレビュー調整を担当。6月18日/)).toBeInTheDocument();
    await user.click(screen.getByRole('tab', { name: '本人と上長の視点' }));
    expect(screen.getByRole('heading', { name: '本人の振り返り' })).toBeInTheDocument();
    await user.click(screen.getByRole('tab', { name: '前回との比較' }));
    expect(screen.getByText(/担当領域の自立を次期の目標/)).toBeInTheDocument();
    await user.click(screen.getByRole('tab', { name: '面談ポイント' }));
    const panel = screen.getByRole('tabpanel');
    await user.click(within(panel).getAllByRole('checkbox')[0]);
    expect(screen.getByLabelText('面談準備状況')).toHaveTextContent('1 / 3');
  });
  it('社員切替で別社員のチェック状態を持ち越さない', async () => {
    const user = userEvent.setup();
    render(<ManagerPage />);
    await user.click(screen.getByRole('button', { name: '面談資料を整理' }));
    await screen.findByRole('tab', { name: '面談ポイント' });
    await user.click(screen.getByRole('tab', { name: '面談ポイント' }));
    await user.click(screen.getAllByRole('checkbox')[0]);
    await user.click(screen.getByRole('button', { name: /田中 悠斗/ }));
    expect(screen.queryByRole('tab')).not.toBeInTheDocument();
    expect(screen.getByLabelText('面談準備状況')).toHaveTextContent('0 / 3');
  });
  it('矢印キーで資料のタブを切り替えられる', async () => {
    const user = userEvent.setup();
    render(<ManagerPage />);
    await user.click(screen.getByRole('button', { name: '面談資料を整理' }));
    const first = await screen.findByRole('tab', { name: '実績・行動' });
    await user.click(first);
    await user.keyboard('{ArrowRight}');
    expect(screen.getByRole('tab', { name: '本人と上長の視点' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tab', { name: '本人と上長の視点' })).toHaveFocus();
  });
});
