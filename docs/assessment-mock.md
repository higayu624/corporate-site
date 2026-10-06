# 査定支援モック

既存のNext.jsサイトに追加した、商談用のフロントモックです。

| パス | デモの流れ |
| --- | --- |
| `/assessment-mock/manager` | 社員を選択 → 面談資料を整理 → 実績・本人と上長の視点・前回比較・面談ポイントを確認 |
| `/assessment-mock/reflection` | サンプルまたは自由入力 → AIで整理 → 担当範囲と根拠を追記 → 整理案を編集して保存 → 履歴を確認 |
| `/assessment-mock/explanation` | 質問例または自由入力 → 説明案と根拠を確認 → 説明案を編集 → 面談メモに追加 |

`/assessment-mock` に一覧ページはありません。3画面のヘッダーから相互に移動できます。

## 起動

```bash
npm ci
npm run dev
```

`http://localhost:3000/assessment-mock/manager` を開いてください。

## デモの範囲

- すべて架空データです。評価・処遇は上長が決定する前提で、AIによる自動評価はありません。
- 実際の生成AI、認証、DB、外部システムには接続していません。
- 自由入力の振り返りはテンプレートで整理し、記載されていない成果や数値を補いません。
- 評価への質問は既知テーマのデモ回答を返し、範囲外の質問は上長への確認を案内します。
- 保存・履歴・面談メモは画面内の状態です。再読み込みや画面間移動で初期化されます。
- 3ページはnoindexです。公開URLの閲覧を制限する認証ではありません。

## 検証

```bash
npm run test
npx eslint app/assessment-mock test/assessment-*.test.tsx
npx tsc --noEmit
npm run build
```

公開先は既存Vercelプロジェクト `corporate`。既存プロジェクトとGitHubの接続設定に従ってリリースしてください。

## 表示の改善（2026-10-06）

主要な操作を最初に表示し、補足情報は開閉式に変更。
- 面談準備：社員選択と資料整理を中心に表示。
- 振り返り：入力→整理結果の確認・保存。補足質問と履歴は必要に応じて開く。
- 評価理由：質問を先頭に置き、回答を箇条書きで表示。説明文の編集・評価コメント・履歴は開閉式。

参考：[NN/g Progressive Disclosure](https://www.nngroup.com/articles/progressive-disclosure/)。
