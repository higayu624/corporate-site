# 査定支援モック

既存Next.jsサイトの商談用フロントモックです。

| パス | デモの流れ |
| --- | --- |
| `/assessment-mock/manager` | 社員を選択 → データを収集・整理 → 実績と根拠リンク → 面談ポイント |
| `/assessment-mock/explanation` | 質問 → 説明案と根拠 → 編集・面談メモ |
| `/assessment-mock/sources/[id]` | 根拠リンクから開く元記録のプレビュー |

`/assessment-mock` に一覧ページはありません。振り返りページは削除済みです。

## 自動収集のデモ

Slack・メール・スプレッドシートから収集した架空の業務記録を、実績・日付・本人の担当範囲とともに表示します。根拠リンクは元記録のサンプル画面を別タブで開きます。実サービスのURLやアカウントへの接続はありません。

記録の収集と事実の確認は別です。上長確認済みの記録と本人の投稿を分け、未確認の頻度や効果を成果として断定しません。評価・処遇は上長が判断します。

## 起動・検証

```bash
npm ci
npm run dev
npm run test
npx eslint app/assessment-mock test/assessment-*.test.tsx
npx tsc --noEmit
npm run build
```

起動後 `/assessment-mock/manager` を開いてください。既存Vercelプロジェクト `corporate` へ公開します。

## 範囲

- フロントのみ。実際の生成AI、外部データ収集、認証、DBには接続しません。
- 質問への回答は既知テーマのデモ回答です。
- 面談メモやチェック状態は再読み込みで消えます。
- 全ページnoindexです。
- 補足情報は開閉式です。参考：[NN/g Progressive Disclosure](https://www.nngroup.com/articles/progressive-disclosure/)。
