# Shift Gear コーポレートサイト 実装計画

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 個人事業主「Shift Gear」の個人ブランディング用シングルページ・コーポレートサイトを Next.js で構築し、Vercel で公開する。

**Architecture:** Next.js App Router の単一ページ（`app/page.tsx`）に Hero / Service / Works / Profile / Contact の各セクションコンポーネントを縦に並べ、固定ヘッダーのアンカーでスムーススクロール。コンテンツは `lib/site.ts` に集約し各セクションが参照。完全静的（SSG）でバックエンドなし。お問い合わせは mailto のみ。

**Tech Stack:** Next.js 15 (App Router) / TypeScript / Tailwind CSS / shadcn/ui / next/font (Shippori Mincho, Playfair Display, Noto Sans JP) / Vitest + React Testing Library / Vercel

**設計書:** `docs/superpowers/specs/2026-05-31-corporate-site-design.md`

---

## デザイントークン（全タスク共通の参照値）

配色:
- ivory `#F6F1E9` / paper `#FBF8F2` / sand `#EFE7D8`
- ink `#3A3327` / sub `#7A6F5C`
- bronze `#9C8866` / bronze-dark `#6B5D44` / line `#E5DCCC`

---

## ファイル構成

```
corporate/
  app/
    layout.tsx          # フォント読み込み・メタデータ・<body>
    page.tsx            # 全セクションを組み合わせる
    globals.css         # Tailwind + CSS変数（配色トークン）
    sitemap.ts          # sitemap.xml 生成
    robots.ts           # robots.txt 生成
    icon.svg            # favicon
    opengraph-image.tsx # OGP画像（動的生成）
  components/
    layout/Header.tsx
    layout/Footer.tsx
    sections/Hero.tsx
    sections/Service.tsx
    sections/Works.tsx
    sections/Profile.tsx
    sections/Contact.tsx
    ui/                 # shadcn/ui が生成
  lib/
    site.ts             # サイト情報・サービス・実績・リンクのデータ
  test/
    setup.ts            # Vitest セットアップ
  vitest.config.ts
```

---

## Task 1: Next.js プロジェクトの初期化

**Files:**
- Create: プロジェクト全体（`app/`, `package.json`, `tsconfig.json`, `tailwind.config.ts` 等）

注意: カレントディレクトリ `/Users/yuma.higashitani/corporate` には既に `.git` と `docs/` がある。`create-next-app` は空でないディレクトリを警告するため、`.` 指定で実行し既存ファイルは保持する。

- [ ] **Step 1: create-next-app を実行**

Run:
```bash
cd /Users/yuma.higashitani/corporate
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir=false --import-alias "@/*" --use-npm --no-turbopack
```
プロンプトで既存ファイルについて聞かれたら継続。`docs/`, `.git`, `.gitignore` は残す。

- [ ] **Step 2: 開発サーバーで起動確認**

Run:
```bash
npm run dev
```
Expected: `http://localhost:3000` で Next.js のデフォルトページが表示される。確認したら Ctrl+C で停止。

- [ ] **Step 3: ビルド確認**

Run: `npm run build`
Expected: ビルド成功（エラーなし）。

- [ ] **Step 4: コミット**

```bash
git add -A
git commit -m "chore: Next.jsプロジェクトを初期化"
```

---

## Task 2: shadcn/ui の導入

**Files:**
- Create: `components.json`, `components/ui/button.tsx`, `lib/utils.ts`
- Modify: `app/globals.css`, `tailwind.config.ts`

- [ ] **Step 1: shadcn/ui を初期化**

Run:
```bash
npx shadcn@latest init -d
```
Expected: `components.json` と `lib/utils.ts` が生成される。

- [ ] **Step 2: 使用するコンポーネントを追加**

Run:
```bash
npx shadcn@latest add button card badge
```
Expected: `components/ui/button.tsx`, `card.tsx`, `badge.tsx` が生成される。

- [ ] **Step 3: ビルド確認**

Run: `npm run build`
Expected: ビルド成功。

- [ ] **Step 4: コミット**

```bash
git add -A
git commit -m "chore: shadcn/uiを導入（button/card/badge）"
```

---

## Task 3: テスト環境の構築（Vitest + React Testing Library）

**Files:**
- Create: `vitest.config.ts`, `test/setup.ts`
- Modify: `package.json`

- [ ] **Step 1: 依存をインストール**

Run:
```bash
npm install -D vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

- [ ] **Step 2: `vitest.config.ts` を作成**

```typescript
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./test/setup.ts"],
  },
  resolve: {
    alias: { "@": path.resolve(__dirname, ".") },
  },
});
```

- [ ] **Step 3: `test/setup.ts` を作成**

```typescript
import "@testing-library/jest-dom";
```

- [ ] **Step 4: `package.json` の scripts に test を追加**

`scripts` に以下を追加:
```json
"test": "vitest run",
"test:watch": "vitest"
```

- [ ] **Step 5: ダミーテストで動作確認**

`test/smoke.test.ts` を作成:
```typescript
import { describe, it, expect } from "vitest";
describe("smoke", () => {
  it("runs", () => { expect(1 + 1).toBe(2); });
});
```
Run: `npm test`
Expected: PASS。確認後 `test/smoke.test.ts` は削除。

- [ ] **Step 6: コミット**

```bash
git add -A
git commit -m "chore: Vitest + React Testing Libraryを構築"
```

---

## Task 4: デザイントークンとフォントの設定

**Files:**
- Modify: `app/globals.css`, `app/layout.tsx`, `tailwind.config.ts`

- [ ] **Step 1: `app/globals.css` に配色のCSS変数を追加**

`@tailwind` ディレクティブの下に追記:
```css
:root {
  --color-ivory: #F6F1E9;
  --color-paper: #FBF8F2;
  --color-sand: #EFE7D8;
  --color-ink: #3A3327;
  --color-sub: #7A6F5C;
  --color-bronze: #9C8866;
  --color-bronze-dark: #6B5D44;
  --color-line: #E5DCCC;
}
html { scroll-behavior: smooth; scroll-padding-top: 80px; }
body { background: var(--color-ivory); color: var(--color-ink); }
```

- [ ] **Step 2: `tailwind.config.ts` の theme.extend に色とフォントを追加**

```typescript
extend: {
  colors: {
    ivory: "#F6F1E9", paper: "#FBF8F2", sand: "#EFE7D8",
    ink: "#3A3327", sub: "#7A6F5C",
    bronze: { DEFAULT: "#9C8866", dark: "#6B5D44" },
    line: "#E5DCCC",
  },
  fontFamily: {
    serif: ["var(--font-shippori)", "serif"],
    display: ["var(--font-playfair)", "serif"],
    sans: ["var(--font-noto)", "sans-serif"],
  },
},
```

- [ ] **Step 3: `app/layout.tsx` で next/font を設定**

```tsx
import { Shippori_Mincho, Playfair_Display, Noto_Sans_JP } from "next/font/google";

const shippori = Shippori_Mincho({ weight: ["500","600","700"], subsets: ["latin"], variable: "--font-shippori", display: "swap" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair", display: "swap" });
const noto = Noto_Sans_JP({ weight: ["400","500","700"], subsets: ["latin"], variable: "--font-noto", display: "swap" });
```
`<html>` に `className={`${shippori.variable} ${playfair.variable} ${noto.variable}`}` を付与し、`<body className="font-sans">`。

- [ ] **Step 4: ビルド確認**

Run: `npm run build`
Expected: 成功。

- [ ] **Step 5: コミット**

```bash
git add -A
git commit -m "feat: 配色トークンとフォント（明朝/Playfair/Noto）を設定"
```

---

## Task 5: サイトデータ層（lib/site.ts）

**Files:**
- Create: `lib/site.ts`, `test/site.test.ts`

- [ ] **Step 1: 失敗するテストを書く**

`test/site.test.ts`:
```typescript
import { describe, it, expect } from "vitest";
import { site, services, works, socials } from "@/lib/site";

describe("site data", () => {
  it("基本情報が正しい", () => {
    expect(site.name).toBe("Shift Gear");
    expect(site.owner).toBe("Yuma Higashitani");
    expect(site.email).toBe("higayu624@gmail.com");
  });
  it("サービスが3件ある", () => {
    expect(services).toHaveLength(3);
    expect(services[0].title).toContain("eコマース");
  });
  it("実績が3件ある", () => {
    expect(works).toHaveLength(3);
    expect(works.find((w) => w.title.includes("抹茶"))).toBeTruthy();
  });
  it("外部リンクが3件ある", () => {
    expect(socials).toHaveLength(3);
    expect(socials.map((s) => s.label)).toEqual(["GitHub", "Facebook", "Instagram"]);
  });
});
```

- [ ] **Step 2: テストが失敗することを確認**

Run: `npm test`
Expected: FAIL（`@/lib/site` が存在しない）。

- [ ] **Step 3: `lib/site.ts` を実装**

```typescript
export const site = {
  name: "Shift Gear",
  owner: "Yuma Higashitani",
  location: "東京",
  email: "higayu624@gmail.com",
  tagline: "ビジネス価値を、最大化する。",
  heroSub:
    "顧客との対話から、本当に使われるソフトウェアを。ニーズの検証を起点に、ビジネスの成果まで伴走します。",
  bio:
    "メガベンチャーで複数のBtoB新規事業のシステム開発に従事。顧客との会話からビジネス価値を最大化する開発を探求。ニーズを理解するための検証を得意とする。",
  skills: ["Scrum", "イベントソーシング", "Golang", "Spring Boot", "時系列データのAI学習モデル"],
};

export const services = [
  { no: "01", title: "eコマース構築", desc: "在庫管理に強いECを、要件定義から運用まで一貫して支援します。" },
  { no: "02", title: "業務特化AIモデル構築", desc: "現場の業務に最適化したAIモデルを設計・実装します。" },
  { no: "03", title: "AIでの業務削減", desc: "既存業務をAIで自動化し、工数とコストを削減します。" },
];

export type Work = {
  title: string;
  desc: string;
  tags: string[];
  url?: string;
  category: string;
};

export const works: Work[] = [
  {
    title: "Sports JOG 代理店販売ECサイト",
    desc: "ECサイトの構築から運用まで担当。在庫管理を含む販売基盤を整備。",
    tags: ["EC構築", "在庫管理", "運用"],
    url: "https://marugo-wellness.jp/pages/sportsjog",
    category: "EC / 在庫管理",
  },
  {
    title: "抹茶のアメリカ需要調査LP",
    desc: "新規事業の需要検証を目的としたLPを構築し、トラフィックを計測。",
    tags: ["Next.js", "需要検証", "計測"],
    url: "https://tastepick-front.vercel.app/",
    category: "需要検証 / LP",
  },
  {
    title: "人材系 BackOffice AI活用コンサル",
    desc: "バックオフィス業務へのAI活用を支援。業務削減の設計から伴走。",
    tags: ["AI活用", "業務改善", "コンサル"],
    category: "AI / コンサル",
  },
];

export const socials = [
  { label: "GitHub", url: "https://github.com/higayu624" },
  { label: "Facebook", url: "https://www.facebook.com/profile.php?id=100053060534949" },
  { label: "Instagram", url: "https://www.instagram.com/gattani_grm/" },
];

export const nav = [
  { label: "SERVICE", href: "#service" },
  { label: "WORKS", href: "#works" },
  { label: "PROFILE", href: "#profile" },
  { label: "CONTACT", href: "#contact" },
];
```

- [ ] **Step 4: テストが通ることを確認**

Run: `npm test`
Expected: PASS。

- [ ] **Step 5: コミット**

```bash
git add -A
git commit -m "feat: サイトデータ層（lib/site.ts）を追加"
```

---

## Task 6: Header コンポーネント（固定ナビ）

**Files:**
- Create: `components/layout/Header.tsx`, `test/header.test.tsx`

- [ ] **Step 1: 失敗するテストを書く**

`test/header.test.tsx`:
```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Header from "@/components/layout/Header";

describe("Header", () => {
  it("屋号とナビを表示する", () => {
    render(<Header />);
    expect(screen.getByText("Shift Gear")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "SERVICE" })).toHaveAttribute("href", "#service");
    expect(screen.getByRole("link", { name: "CONTACT" })).toHaveAttribute("href", "#contact");
  });
});
```

- [ ] **Step 2: テスト失敗を確認**

Run: `npm test`
Expected: FAIL。

- [ ] **Step 3: `components/layout/Header.tsx` を実装**

```tsx
import Link from "next/link";
import { site, nav } from "@/lib/site";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-ivory/85 backdrop-blur">
      <div className="mx-auto flex h-[68px] max-w-[1100px] items-center justify-between px-7">
        <Link href="#top" className="font-display text-xl font-semibold tracking-wide">
          {site.name}
        </Link>
        <nav className="hidden gap-8 md:flex">
          {nav.map((item) => (
            <a key={item.href} href={item.href}
               className="text-[13px] tracking-wide text-sub transition-colors hover:text-ink">
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
```

注: モバイルメニュー（ハンバーガー）は Task 13 の後に余裕があれば追加。MVPではナビを `md` 以上で表示し、モバイルはロゴのみ＋各セクションへはスクロールで到達可能とする。

- [ ] **Step 4: テストが通ることを確認**

Run: `npm test`
Expected: PASS。

- [ ] **Step 5: コミット**

```bash
git add -A
git commit -m "feat: Headerコンポーネントを追加"
```

---

## Task 7: Hero セクション

**Files:**
- Create: `components/sections/Hero.tsx`, `test/hero.test.tsx`

- [ ] **Step 1: 失敗するテストを書く**

`test/hero.test.tsx`:
```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Hero from "@/components/sections/Hero";

describe("Hero", () => {
  it("キャッチコピーとCTAを表示する", () => {
    render(<Hero />);
    expect(screen.getByText(/ビジネス価値を/)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "お問い合わせ" })).toHaveAttribute("href", "#contact");
  });
});
```

- [ ] **Step 2: テスト失敗を確認**

Run: `npm test` → FAIL

- [ ] **Step 3: `components/sections/Hero.tsx` を実装**

```tsx
import { site } from "@/lib/site";

export default function Hero() {
  return (
    <section id="top" className="mx-auto max-w-[1100px] px-7 pt-28 pb-28">
      <p className="text-[11px] uppercase tracking-[4px] text-bronze">
        Shift Gear — Software Engineering
      </p>
      <h1 className="mt-5 font-serif text-4xl font-semibold leading-[1.35] tracking-[2px] md:text-[54px]">
        ビジネス価値を、<br />最大化する。
      </h1>
      <div className="my-6 h-px w-10 bg-bronze" />
      <p className="max-w-[620px] text-sub">{site.heroSub}</p>
      <div className="mt-10 flex flex-wrap items-center gap-5">
        <a href="#contact"
           className="rounded bg-bronze-dark px-8 py-3.5 text-sm tracking-wide text-white transition-colors hover:bg-[#54472f]">
          お問い合わせ
        </a>
        <a href="#works" className="border-b border-bronze pb-1 text-sm text-ink">
          実績を見る →
        </a>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: テストが通ることを確認**

Run: `npm test` → PASS

- [ ] **Step 5: コミット**

```bash
git add -A
git commit -m "feat: Heroセクションを追加"
```

---

## Task 8: Service セクション

**Files:**
- Create: `components/sections/Service.tsx`, `test/service.test.tsx`

- [ ] **Step 1: 失敗するテストを書く**

`test/service.test.tsx`:
```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Service from "@/components/sections/Service";

describe("Service", () => {
  it("3つのサービスを表示する", () => {
    render(<Service />);
    expect(screen.getByText("eコマース構築")).toBeInTheDocument();
    expect(screen.getByText("業務特化AIモデル構築")).toBeInTheDocument();
    expect(screen.getByText("AIでの業務削減")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: テスト失敗を確認** → `npm test` → FAIL

- [ ] **Step 3: `components/sections/Service.tsx` を実装**

```tsx
import { services } from "@/lib/site";

export default function Service() {
  return (
    <section id="service" className="bg-paper py-24">
      <div className="mx-auto max-w-[1100px] px-7">
        <p className="text-[11px] uppercase tracking-[4px] text-bronze">Service</p>
        <h2 className="mt-3.5 mb-14 font-serif text-3xl font-semibold tracking-[2px]">
          提供できること
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {services.map((s) => (
            <div key={s.no}
                 className="rounded-lg border border-line bg-white p-8 transition-transform hover:-translate-y-1 hover:shadow-[0_14px_30px_rgba(107,93,68,0.10)]">
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-full border border-bronze text-bronze-dark">
                {s.no}
              </div>
              <h3 className="mb-3 text-lg font-bold tracking-wide">{s.title}</h3>
              <p className="text-sm text-sub">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: テストが通ることを確認** → `npm test` → PASS

- [ ] **Step 5: コミット**

```bash
git add -A
git commit -m "feat: Serviceセクションを追加"
```

---

## Task 9: Works セクション

**Files:**
- Create: `components/sections/Works.tsx`, `test/works.test.tsx`

- [ ] **Step 1: 失敗するテストを書く**

`test/works.test.tsx`:
```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Works from "@/components/sections/Works";

describe("Works", () => {
  it("実績3件を表示し、公開案件は外部リンクを持つ", () => {
    render(<Works />);
    expect(screen.getByText("抹茶のアメリカ需要調査LP")).toBeInTheDocument();
    const link = screen.getByRole("link", { name: /Sports JOG/ });
    expect(link).toHaveAttribute("href", "https://marugo-wellness.jp/pages/sportsjog");
    expect(screen.getByText("非公開案件")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: テスト失敗を確認** → `npm test` → FAIL

- [ ] **Step 3: `components/sections/Works.tsx` を実装**

```tsx
import { works } from "@/lib/site";

export default function Works() {
  return (
    <section id="works" className="py-24">
      <div className="mx-auto max-w-[1100px] px-7">
        <p className="text-[11px] uppercase tracking-[4px] text-bronze">Works</p>
        <h2 className="mt-3.5 mb-14 font-serif text-3xl font-semibold tracking-[2px]">実績</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {works.map((w) => {
            const inner = (
              <>
                <div className="flex h-28 items-end bg-gradient-to-br from-sand to-[#e2d4bd] p-4">
                  <span className="text-[11px] uppercase tracking-[3px] text-bronze-dark">
                    {w.category}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="mb-2.5 text-[17px] font-bold">{w.title}</h3>
                  <p className="mb-4 text-[13px] text-sub">{w.desc}</p>
                  <div className="mb-4 flex flex-wrap gap-2">
                    {w.tags.map((t) => (
                      <span key={t}
                            className="rounded-full border border-line bg-paper px-2.5 py-1 text-[11px] text-bronze-dark">
                        {t}
                      </span>
                    ))}
                  </div>
                  {w.url ? (
                    <span className="border-b border-bronze text-[13px] text-bronze-dark">
                      サイトを見る ↗
                    </span>
                  ) : (
                    <span className="text-[13px] text-sub">非公開案件</span>
                  )}
                </div>
              </>
            );
            const cls =
              "block overflow-hidden rounded-lg border border-line bg-white transition-transform hover:-translate-y-1 hover:shadow-[0_14px_30px_rgba(107,93,68,0.10)]";
            return w.url ? (
              <a key={w.title} href={w.url} target="_blank" rel="noopener noreferrer" className={cls}>
                {inner}
              </a>
            ) : (
              <div key={w.title} className={cls}>{inner}</div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: テストが通ることを確認** → `npm test` → PASS

- [ ] **Step 5: コミット**

```bash
git add -A
git commit -m "feat: Worksセクションを追加"
```

---

## Task 10: Profile セクション

**Files:**
- Create: `components/sections/Profile.tsx`, `test/profile.test.tsx`

- [ ] **Step 1: 失敗するテストを書く**

`test/profile.test.tsx`:
```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Profile from "@/components/sections/Profile";

describe("Profile", () => {
  it("基本情報・自己紹介・スキルを表示する", () => {
    render(<Profile />);
    expect(screen.getByText("Yuma Higashitani")).toBeInTheDocument();
    expect(screen.getByText(/BtoB新規事業/)).toBeInTheDocument();
    expect(screen.getByText("Golang")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: テスト失敗を確認** → `npm test` → FAIL

- [ ] **Step 3: `components/sections/Profile.tsx` を実装**

```tsx
import { site } from "@/lib/site";

export default function Profile() {
  return (
    <section id="profile" className="bg-sand py-24">
      <div className="mx-auto max-w-[1100px] px-7">
        <p className="text-[11px] uppercase tracking-[4px] text-bronze">Profile</p>
        <h2 className="mt-3.5 mb-14 font-serif text-3xl font-semibold tracking-[2px]">プロフィール</h2>
        <div className="grid gap-12 md:grid-cols-[280px_1fr]">
          <div className="rounded-lg border border-line bg-white p-8">
            <Item k="屋号" v={site.name} />
            <Item k="代表" v={site.owner} />
            <Item k="拠点" v={site.location} />
          </div>
          <div>
            <p className="mb-6 text-[15px] text-sub">{site.bio}</p>
            <p className="mb-3.5 text-[11px] uppercase tracking-[4px] text-bronze">得意技術</p>
            <div className="flex flex-wrap gap-2.5">
              {site.skills.map((s) => (
                <span key={s} className="rounded-full border border-bronze px-3.5 py-1.5 text-xs">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Item({ k, v }: { k: string; v: string }) {
  return (
    <div className="mb-4">
      <div className="text-[11px] uppercase tracking-[2px] text-bronze">{k}</div>
      <div className="mt-0.5 text-[15px]">{v}</div>
    </div>
  );
}
```

- [ ] **Step 4: テストが通ることを確認** → `npm test` → PASS

- [ ] **Step 5: コミット**

```bash
git add -A
git commit -m "feat: Profileセクションを追加"
```

---

## Task 11: Contact セクション

**Files:**
- Create: `components/sections/Contact.tsx`, `test/contact.test.tsx`

- [ ] **Step 1: 失敗するテストを書く**

`test/contact.test.tsx`:
```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Contact from "@/components/sections/Contact";

describe("Contact", () => {
  it("mailtoリンクを表示する", () => {
    render(<Contact />);
    const btn = screen.getByRole("link", { name: "メールで問い合わせる" });
    expect(btn).toHaveAttribute("href", expect.stringContaining("mailto:higayu624@gmail.com"));
  });
});
```

- [ ] **Step 2: テスト失敗を確認** → `npm test` → FAIL

- [ ] **Step 3: `components/sections/Contact.tsx` を実装**

```tsx
import { site } from "@/lib/site";

export default function Contact() {
  const mailto = `mailto:${site.email}?subject=${encodeURIComponent("お問い合わせ")}`;
  return (
    <section id="contact" className="py-24">
      <div className="mx-auto max-w-[1100px] px-7 text-center">
        <p className="text-[11px] uppercase tracking-[4px] text-bronze">Contact</p>
        <h2 className="mt-3.5 font-serif text-3xl font-semibold tracking-[2px]">
          お気軽にご相談ください
        </h2>
        <p className="my-5 font-display text-2xl tracking-wide">{site.email}</p>
        <a href={mailto}
           className="inline-block rounded bg-bronze-dark px-8 py-3.5 text-sm tracking-wide text-white transition-colors hover:bg-[#54472f]">
          メールで問い合わせる
        </a>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: テストが通ることを確認** → `npm test` → PASS

- [ ] **Step 5: コミット**

```bash
git add -A
git commit -m "feat: Contactセクション（mailto）を追加"
```

---

## Task 12: Footer コンポーネント

**Files:**
- Create: `components/layout/Footer.tsx`, `test/footer.test.tsx`

- [ ] **Step 1: 失敗するテストを書く**

`test/footer.test.tsx`:
```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Footer from "@/components/layout/Footer";

describe("Footer", () => {
  it("外部リンクとコピーライトを表示する", () => {
    render(<Footer />);
    expect(screen.getByRole("link", { name: "GitHub" })).toHaveAttribute("href", "https://github.com/higayu624");
    expect(screen.getByText(/© 2026 Shift Gear/)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: テスト失敗を確認** → `npm test` → FAIL

- [ ] **Step 3: `components/layout/Footer.tsx` を実装**

```tsx
import { site, socials } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="bg-ink py-12 text-[#cdbfa6]">
      <div className="mx-auto flex max-w-[1100px] flex-wrap items-center justify-between gap-4 px-7">
        <div className="font-display text-lg text-[#e8dcc6]">{site.name}</div>
        <div className="flex gap-5">
          {socials.map((s) => (
            <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer"
               className="border-b border-transparent text-[13px] tracking-wide transition-colors hover:border-[#cdbfa6]">
              {s.label}
            </a>
          ))}
        </div>
        <div className="text-xs tracking-wide">© 2026 {site.name}</div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 4: テストが通ることを確認** → `npm test` → PASS

- [ ] **Step 5: コミット**

```bash
git add -A
git commit -m "feat: Footerコンポーネントを追加"
```

---

## Task 13: ページ組み立て（page.tsx / layout.tsx）

**Files:**
- Modify: `app/page.tsx`, `app/layout.tsx`

- [ ] **Step 1: `app/page.tsx` を全セクション構成に書き換え**

```tsx
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Service from "@/components/sections/Service";
import Works from "@/components/sections/Works";
import Profile from "@/components/sections/Profile";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Service />
        <Works />
        <Profile />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 2: 開発サーバーで目視確認**

Run: `npm run dev`
Expected: `http://localhost:3000` で全セクションが縦に並び、ナビのアンカーでスムーススクロールする。アイボリー×ブロンズの配色・明朝見出しが反映されている。デザインモック（spec のプレビュー）とおおむね一致することを確認。

- [ ] **Step 3: 全テスト実行**

Run: `npm test`
Expected: 全 PASS。

- [ ] **Step 4: ビルド確認**

Run: `npm run build`
Expected: 成功。

- [ ] **Step 5: コミット**

```bash
git add -A
git commit -m "feat: トップページに全セクションを組み立て"
```

---

## Task 14: SEO / メタデータ / OGP / favicon / sitemap / robots

**Files:**
- Modify: `app/layout.tsx`
- Create: `app/sitemap.ts`, `app/robots.ts`, `app/icon.svg`, `app/opengraph-image.tsx`

- [ ] **Step 1: `app/layout.tsx` の metadata を設定**

```tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://shift-gear.vercel.app"),
  title: "Shift Gear｜ビジネス価値を最大化する開発",
  description:
    "Shift Gear（代表 Yuma Higashitani）。スクラムと顧客対話を起点に、eコマース構築・業務特化AIモデル・AI業務削減でビジネス価値を最大化します。",
  openGraph: {
    title: "Shift Gear｜ビジネス価値を最大化する開発",
    description: "顧客との対話から、本当に使われるソフトウェアを。",
    type: "website",
    locale: "ja_JP",
  },
};
```
注: 公開URLが確定したら `metadataBase` を実際の Vercel ドメインに更新する。

- [ ] **Step 2: `app/sitemap.ts` を作成**

```typescript
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: "https://shift-gear.vercel.app", lastModified: new Date(), priority: 1 }];
}
```

- [ ] **Step 3: `app/robots.ts` を作成**

```typescript
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://shift-gear.vercel.app/sitemap.xml",
  };
}
```

- [ ] **Step 4: `app/icon.svg`（favicon）を作成**

アイボリー地にブロンズの "S" のシンプルなSVG:
```svg
<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="12" fill="#3A3327"/>
  <text x="32" y="44" font-family="Georgia, serif" font-size="38" fill="#C9A96A" text-anchor="middle">S</text>
</svg>
```

- [ ] **Step 5: `app/opengraph-image.tsx`（OGP動的生成）を作成**

```tsx
import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OG() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column",
        justifyContent: "center", padding: "80px", background: "#F6F1E9", color: "#3A3327" }}>
        <div style={{ fontSize: 28, letterSpacing: 6, color: "#9C8866" }}>SHIFT GEAR</div>
        <div style={{ fontSize: 72, fontWeight: 600, marginTop: 30 }}>ビジネス価値を、最大化する。</div>
      </div>
    ),
    { ...size }
  );
}
```

- [ ] **Step 6: ビルド確認**

Run: `npm run build`
Expected: 成功。`/sitemap.xml`, `/robots.txt`, OGP が生成される。

- [ ] **Step 7: コミット**

```bash
git add -A
git commit -m "feat: SEO/OGP/favicon/sitemap/robotsを追加"
```

---

## Task 15: モバイルメニュー（ハンバーガー）

**Files:**
- Create: `components/layout/MobileMenu.tsx`
- Modify: `components/layout/Header.tsx`, `test/header.test.tsx`

注: クライアントコンポーネント。`useState` で開閉。

- [ ] **Step 1: テストを追加**

`test/header.test.tsx` に追記:
```tsx
it("モバイルメニューボタンがある", () => {
  render(<Header />);
  expect(screen.getByRole("button", { name: /メニュー/ })).toBeInTheDocument();
});
```

- [ ] **Step 2: テスト失敗を確認** → `npm test` → FAIL

- [ ] **Step 3: `components/layout/MobileMenu.tsx` を実装**

```tsx
"use client";
import { useState } from "react";
import { nav } from "@/lib/site";

export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  return (
    <div className="md:hidden">
      <button aria-label="メニュー" onClick={() => setOpen((v) => !v)}
              className="text-sm tracking-wide text-sub">
        {open ? "閉じる" : "メニュー"}
      </button>
      {open && (
        <div className="absolute left-0 right-0 top-[68px] border-b border-line bg-ivory px-7 py-4">
          {nav.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setOpen(false)}
               className="block py-2 text-sm tracking-wide text-sub">
              {item.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 4: `Header.tsx` に組み込む**

`<nav>` の隣に `<MobileMenu />` を追加（import も追加）。

- [ ] **Step 5: テストが通ることを確認** → `npm test` → PASS

- [ ] **Step 6: 開発サーバーでモバイル幅を目視確認**

Run: `npm run dev` → ブラウザを狭め、ハンバーガーで各セクションに飛べることを確認。

- [ ] **Step 7: コミット**

```bash
git add -A
git commit -m "feat: モバイルメニュー（ハンバーガー）を追加"
```

---

## Task 16: 最終ビルド検証

**Files:** なし（検証のみ）

- [ ] **Step 1: 全テスト**

Run: `npm test`
Expected: 全 PASS。

- [ ] **Step 2: 本番ビルド**

Run: `npm run build`
Expected: 成功。全ページが静的生成（○ Static）になっていること。

- [ ] **Step 3: 本番モードで起動し目視確認**

Run: `npm run start`
Expected: `http://localhost:3000` で本番ビルドが表示。全セクション・配色・フォント・モバイル表示・mailto・外部リンクを最終確認。

- [ ] **Step 4: Lighthouse 簡易確認（任意）**

Chrome DevTools の Lighthouse で Performance / Accessibility に大きな問題がないことを確認。

---

## Task 17: Vercel デプロイ（ユーザー操作）

**Files:** なし

注: このタスクは外部サービスへの公開を伴うため、実行前にユーザーへ確認する。

- [ ] **Step 1: GitHub リポジトリ作成 & push（ユーザー承認後）**

```bash
gh repo create shift-gear --private --source=. --remote=origin --push
```

- [ ] **Step 2: Vercel に接続**

Vercel ダッシュボードで GitHub リポジトリをインポート、または `npx vercel` を実行。フレームワークは自動検出（Next.js）。

- [ ] **Step 3: 公開URL確認後、metadataBase / sitemap / robots のURLを実ドメインに更新してコミット**

---

## Self-Review（計画作成者による確認）

**1. Spec coverage（設計書の各項目に対応タスクがあるか）:**
- シングルページ構成 → Task 13 ✓
- Hero/Service/Works/Profile/Contact/Footer → Task 7–12 ✓
- 固定ヘッダー＋アンカー＋スムーススクロール → Task 6, 4(scroll-behavior) ✓
- mailto 問い合わせ → Task 11 ✓
- アイボリー×ブロンズ配色・明朝/Playfair/Noto → Task 4 ✓
- shadcn/ui → Task 2 ✓
- データ集約（lib/site.ts）→ Task 5 ✓
- SEO/OGP/favicon/sitemap/robots → Task 14 ✓
- レスポンシブ/モバイルメニュー → Task 8–12(grid), Task 15 ✓
- Vercel デプロイ → Task 17 ✓
- スコープ外（ブログ/多言語/フォーム/DB）→ 計画に含めず ✓

**2. Placeholder scan:** 各コードステップに実コードを記載。プレースホルダなし ✓

**3. Type consistency:** `Work` 型は Task 5 で定義し Task 9 で使用。`site`/`services`/`works`/`socials`/`nav` の名称は全タスクで一致 ✓
