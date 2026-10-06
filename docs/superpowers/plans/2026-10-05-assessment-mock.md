# AI査定支援モック Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [x]`) syntax for tracking. ユーザー指定により本人が逐次実行し、並行作業・サブエージェントは使用しない。

**Goal:** 商談で操作できる、AIによる査定情報整理・振り返り・評価説明の3つのフロントモックを既存サイトに追加して公開する。

**Architecture:** Next.js App Routerのapp/assessment-mock配下にlayoutと3つの子ルートを配置する。共通の型・架空データ・ヘッダー・根拠表示を共有し、各画面は独立したReact stateで操作する。実際のAIやサーバーへのデータ送信は行わない。

**Tech Stack:** Next.js 15.5.18、React 19.1.0、TypeScript、Tailwind CSS 4、lucide-react、Vitest、Testing Library。既存依存を使う。

**Spec:** docs/superpowers/specs/2026-10-05-assessment-mock-design.md

## Global Constraints

- AIは評価・点数・処遇を決定しない。
- フロントのみで、実際の生成AI、認証、外部システム、DBには接続しない。
- 上長向け→社員向け→評価説明向けの順に実装する。並行作業やサブエージェントは使用しない。
- /assessment-mock の一覧ページは作成しない。3つの子ページへ直接アクセスする。
- 対象期間は2026年4〜9月。数字はサンプルデータと一致させる。
- 保存はブラウザの画面内状態のみとし、再読み込みで初期化することを保存箇所に明記する。
- 対象ルートにはnoindexのメタデータを設定する。
- 既存ページの動作・スタイルに影響しない局所的な実装とする。
- 公開先は既存Vercelプロジェクトcorporate、想定ドメインは https://corporate-gold-nine.vercel.app/ 。

## Review Focus

- 社員を切り替えたとき、別社員の整理結果やチェック状態が混ざらない。
- 空白だけの振り返り、追記、質問は処理・保存されず、入力を促す。
- 自由入力にない成果や数値を生成せず、ユーザーの文章を保存する。
- 範囲外の質問は推測回答せず、上長への確認事項として扱う。
- 素早い連続クリックや同じメモの追加で二重保存しない。

## ファイル構成

- `app/assessment-mock/layout.tsx`: タイトル・noindex、共通ヘッダーと画面コンテナ。
- `app/assessment-mock/_components/shell.tsx`: パスに応じた3画面ナビゲーション。
- `app/assessment-mock/_components/evidence.tsx`: 記録の出典・日付・原文の展開。
- `app/assessment-mock/_data/demo.ts`: 型、社員3名、各記録・コメント・過去評価・面談項目。
- `app/assessment-mock/manager/page.tsx`: 上長向けクライアント画面。
- `app/assessment-mock/reflection/page.tsx`: 社員向けクライアント画面。
- `app/assessment-mock/reflection/organize.ts`: 入力文と追加回答から整理案を作る純粋関数。
- `app/assessment-mock/explanation/page.tsx`: 評価説明クライアント画面。
- `app/assessment-mock/explanation/answers.ts`: 質問テーマの判定・根拠つきのデモ回答。
- `test/assessment-manager.test.tsx`, `test/assessment-reflection.test.tsx`, `test/assessment-explanation.test.tsx`: 主要操作の回帰テスト。

### Task 1: 共通UIと社長・上長向けモック

**Interfaces:** `EvidenceRecord = { id: string; date: string; title: string; body: string; source: string; verified: boolean }`。`Employee = { id: string; name: string; role: string; initials: string; records: EvidenceRecord[]; selfComment: string; managerComment: string; previousReview: string; achievements: { title: string; detail: string; recordIds: string[] }[]; interviewPoints: { id: string; text: string; reason: string }[] }`。`employees: Employee[]`、`periodLabel: string`をexport。`Evidence({records}: {records: EvidenceRecord[]})`と`Shell({children}: {children: React.ReactNode})`を共有する。

- [x] 隔離ブランチ／worktreeを確認・用意し、既存依存をインストールする。既存テストを実行して基準を確認する。
- [x] `assessment-manager.test.tsx`に、社員選択後の名前・記録数の変更、資料整理後の4タブと根拠表示、面談チェック、社員切替で別社員の状態が混ざらないことのテストを書く。
- [x] `npm run test -- test/assessment-manager.test.tsx`を実行し、対象ページが存在しないことによる失敗を確認する。
- [x] 共通データ、Shell、Evidence、layoutを実装する。3つのナビゲーションリンク、架空データ・デモ表示、noindexを設定し、親ルートのpage.tsxは作らない。
- [x] `ManagerPage(): React.JSX.Element`を実装する。3社員、期間、記録数、処理中表示、「実績・行動」「本人と上長の視点」「前回との比較」「面談ポイント」のタブ、出典展開、確認事項チェックを配置する。生成中の二重実行を防ぎ、社員切替時に表示状態をリセットする。
- [x] 対象テストを実行してPASSを確認する。対象ファイルのlintを実行する。
- [x] デスクトップとモバイルの表示・主要操作を確認し、Task 1をコミットする。

### Task 2: 社員の振り返りモック

**Interfaces:** Task 1の`employees[0]`を使用する。`ReflectionDraft = { achievement: string; action: string; challenge: string; nextStep: string }`。`organizeReflection(input: string, responsibility: string, evidence: string): ReflectionDraft`をexport。保存記録は`{id: string; date: string; original: string; draft: ReflectionDraft}`。

- [x] `assessment-reflection.test.tsx`に、空白入力の拒否、自由入力の保持・未入力の数値を作らないこと、追加回答反映、編集して保存、履歴閲覧、二重保存防止のテストを書く。
- [x] `npm run test -- test/assessment-reflection.test.tsx`で未実装による失敗を確認する。
- [x] `organizeReflection`を実装する。自由入力を成果欄に保持し、役割・根拠は追加回答を使い、未記載の課題や次の一歩は確認が必要な項目として示す。サンプル入力には記載済みの事実だけから整理案を用意する。
- [x] `ReflectionPage(): React.JSX.Element`を実装する。振り返り入力、サンプル入力、整理案の4項目編集、追加質問2項目、保存、過去履歴の閲覧を設ける。空入力はエラー表示し、保存済みの同じ案を再保存させない。再読み込みで初期化することを表示する。
- [x] 対象テストとlintでPASSを確認する。
- [x] デスクトップとモバイルの入力・保存・履歴表示を確認し、Task 2をコミットする。

### Task 3: 評価説明・面談モック

**Interfaces:** Task 1の社員・記録を使用する。`Answer = { theme: 'evidence' | 'change' | 'next' | 'unknown'; explanation: string; recordIds: string[]; confirmation: string }`。`answerQuestion(question: string): Answer`をexportする。

- [x] `assessment-explanation.test.tsx`に、質問例による回答と根拠、自由入力によるテーマ選択、空白質問の拒否、範囲外質問への確認案内、説明編集、面談メモへの追加と二重追加防止のテストを書く。
- [x] `npm run test -- test/assessment-explanation.test.tsx`で未実装による失敗を確認する。
- [x] `answerQuestion`を実装する。根拠・前回比較・次期期待の既知テーマに対応する固定デモ回答を返す。範囲外は根拠を空にし、上長への確認を促す。出典IDは共通データに存在するものだけを使う。
- [x] `ExplanationPage(): React.JSX.Element`を実装する。上長による評価表示、質問例、自由入力、回答履歴、事実と解釈・不足事項、根拠展開、編集可能な説明案、面談メモを配置する。同じ回答の再追加は防ぎ、追加質問を確認事項としてメモに残せるようにする。
- [x] 対象テストとlintでPASSを確認する。
- [x] デスクトップとモバイルの質問・編集・メモ操作を確認し、Task 3をコミットする。

### Task 4: 全体確認と公開

- [x] `npm run test`で既存と新規テストのPASSを確認する。
- [x] `npx eslint app/assessment-mock test/assessment-*.test.tsx`、`npx tsc --noEmit`、`npm run build`でエラーがないことと3子ルートの生成を確認する。
- [x] 3画面の相互移動・画面幅・フォーカス・入力エラー・状態通知を確認し、親ルートの一覧ページが存在しないことを確認する。
- [x] diffと設計書を照合して本人がレビューし、必要な修正を検証してコミットする。
- [x] 利用可能なGitHub認証・Vercel接続を確認する。認証情報は出力しない。ユーザーが公開を指示しているため、接続が利用可能ならGitHubへ反映し、既存Vercelの自動デプロイまたは既存プロジェクトへのデプロイを行う。
- [ ] 公開された3つのURLの表示とデプロイしたコミットを確認して共有する。接続不足で公開できない場合は、公開済みと主張せず、完了した実装・検証と必要な接続を伝える。

**現在の公開状況:** 実装・テスト・本番ビルド・3画面のPC/モバイル表示確認は完了。GitHubへのpushは書き込み認証がなく失敗したため、未反映・未公開。GitHub接続後に公開確認を再開する。
