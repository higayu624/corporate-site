# Shift Gear コーポレートサイト — 設計書

- 作成日: 2026-05-31
- ステータス: 承認待ち（実装計画 writing-plans へ遷移予定）

## 1. 概要

個人事業主（屋号: Shift Gear / 代表: Yuma Higashitani）のコーポレートサイトを、
Next.js で新規構築する。ホスティングは Vercel。

### 目的
**個人ブランディング**。エンジニアとしての人柄・専門性・存在感を伝える。

### ターゲット
- 企業の発注・採用担当者（信頼感・実績を重視）
- エンジニア仲間・技術コミュニティ（技術力・発信を重視）

### ポジショニング（強み）
スクラムで顧客と密に対話し、ユーザーのユースケースにコミットした開発で
**ビジネス価値を最大化する**エンジニア。ニーズ理解のための検証が得意。

## 2. スコープ

### やること
- 1ページ構成（シングルページ・縦スクロール）のコーポレートサイト
- セクション: Hero / Service / Works / Profile / Contact / Footer
- 固定ヘッダー + アンカーナビ + スムーススクロール
- mailto によるお問い合わせ導線
- SEO/OGP/favicon/sitemap.xml/robots.txt
- レスポンシブ（モバイル対応）

### やらないこと（YAGNI）
- ブログ / 記事一覧（将来追加可）
- 多言語対応（日本語のみ）
- お問い合わせフォーム・バックエンド・DB（mailto のみ）
- 独自ドメイン（Vercel の URL で公開）
- CMS

## 3. 技術スタック

- Next.js 15（App Router）+ TypeScript
- Tailwind CSS + shadcn/ui
- レンダリング: 完全静的（SSG）。サーバー処理なし
- ホスティング: Vercel
- フォント（Google Fonts, next/font）:
  - 和文見出し: Shippori Mincho（明朝）
  - 英字見出し: Playfair Display
  - 本文: Noto Sans JP（+ Inter）

## 4. サイト構成（シングルページ / アプローチA）

ヘッダー（固定・半透明・blur、アンカーナビ: Service / Works / Profile / Contact）の下に
以下を縦に配置。将来 `/works/[slug]` を足してケーススタディ拡張が可能な構造とする。

### 4.1 Hero
- ラベル: `Shift Gear — Software Engineering`
- メインコピー（明朝大見出し）: **「ビジネス価値を、最大化する。」**
- サブコピー: 「顧客との対話から、本当に使われるソフトウェアを。ニーズの検証を起点に、ビジネスの成果まで伴走します。」
- CTA: 「お問い合わせ」（#contact）/ 副リンク「実績を見る →」（#works）

### 4.2 Service（カード3枚）
1. **eコマース構築** — 在庫管理に強いECを、要件定義から運用まで一貫して支援
2. **業務特化AIモデル構築** — 現場の業務に最適化したAIモデルを設計・実装
3. **AIでの業務削減** — 既存業務をAIで自動化し、工数とコストを削減

### 4.3 Works（実績カード3枚）
1. **Sports JOG 代理店販売ECサイト** — 構築・運用 / タグ: EC構築・在庫管理・運用 / 外部リンクあり
   - URL: https://marugo-wellness.jp/pages/sportsjog
2. **抹茶のアメリカ需要調査LP** — 新規事業の需要検証・トラフィック計測 / タグ: Next.js・需要検証・計測 / 外部リンクあり
   - URL: https://tastepick-front.vercel.app/
3. **人材系 BackOffice AI活用コンサル** — バックオフィス業務のAI活用支援 / タグ: AI活用・業務改善・コンサル / 非公開（リンクなし）

### 4.4 Profile
- 屋号: Shift Gear / 代表: Yuma Higashitani / 拠点: 東京
- 自己紹介: 「メガベンチャーで複数のBtoB新規事業のシステム開発に従事。顧客との会話からビジネス価値を最大化する開発を探求。ニーズを理解するための検証を得意とする。」
- 得意技術（タグ）: Scrum / イベントソーシング / Golang / Spring Boot / 時系列データのAI学習モデル

### 4.5 Contact
- 見出し「お気軽にご相談ください」
- メール表示: higayu624@gmail.com
- ボタン「メールで問い合わせる」→ `mailto:higayu624@gmail.com?subject=お問い合わせ`

### 4.6 Footer
- 屋号 Shift Gear
- 外部リンク: GitHub / Facebook / Instagram
  - GitHub: https://github.com/higayu624
  - Facebook: https://www.facebook.com/profile.php?id=100053060534949
  - Instagram: https://www.instagram.com/gattani_grm/
- © 2026 Shift Gear

## 5. デザインシステム（アイボリー × ブロンズ）

### 配色
| 用途 | 色 |
|------|------|
| 背景（ベース・アイボリー） | `#F6F1E9` |
| セクション背景（ペーパー） | `#FBF8F2` |
| セクション背景（サンド） | `#EFE7D8` |
| メインテキスト | `#3A3327` |
| サブテキスト | `#7A6F5C` |
| アクセント（ブロンズ） | `#9C8866` |
| 操作色（濃ブロンズ） | `#6B5D44` |
| 罫線 | `#E5DCCC` |
| フッター背景 | `#3A3327` |

### タイポグラフィ
- 見出し: Shippori Mincho（和）/ Playfair Display（英）。細め(500-600)・字間広め
- 本文: Noto Sans JP / Inter
- 大見出し例: 54px・line-height 1.35・letter-spacing 2px

### レイアウト / 余白
- コンテンツ最大幅: 1100px、左右パディング 28px
- セクション上下パディング: 96px 前後（縦余白でエレガントさを出す）
- 区切り: 細い罫線 + 背景色の差。影は控えめ
- セクション背景は交互（ivory / paper / sand）で変化をつける

### コンポーネント方針（shadcn/ui ベース）
- Button: 濃ブロンズ塗り or アウトライン、角丸控えめ(4px)
- Card: Service / Works。ホバーで軽く浮く（translateY + 弱い影）
- Badge: 技術タグ（pill 形状、罫線 + paper 背景）
- Header: sticky・半透明・blur
- ホバー/アニメは控えめ（上品さ優先）

### レスポンシブ
- 〜820px: カード縦積み、profile を1カラム、メニューはハンバーガー

## 6. アクセシビリティ / SEO
- セマンティックHTML（header/nav/section/footer、見出し階層）
- 画像 alt、十分なコントラスト
- メタ: タイトル「Shift Gear｜ビジネス価値を最大化する開発」、description、OGP画像
- favicon、`sitemap.xml`、`robots.txt`

## 7. 想定ディレクトリ構成（実装時の指針）
```
corporate/
  app/
    layout.tsx        # フォント・メタ・全体ラッパー
    page.tsx          # 1ページ（各セクションを組み合わせ）
    globals.css       # Tailwind + CSS変数（配色トークン）
  components/
    layout/Header.tsx, Footer.tsx
    sections/Hero.tsx, Service.tsx, Works.tsx, Profile.tsx, Contact.tsx
    ui/...            # shadcn/ui
  lib/site.ts         # サイト情報・実績・サービス等のデータ定義
  public/             # OGP画像・favicon 等
```
- コンテンツ（サービス/実績/プロフィール/リンク）は `lib/site.ts` に集約し、
  各セクションはそれを参照する（後から差し替えやすくする）。

## 8. 受け入れ基準
- 6セクションが設計どおり表示され、アンカーナビでスムーススクロールする
- mailto ボタンでメーラーが起動する
- モバイル幅で崩れない
- `npm run build` が成功し、Vercel にデプロイできる
- Lighthouse で大きな問題がない（パフォーマンス/アクセシビリティ）
