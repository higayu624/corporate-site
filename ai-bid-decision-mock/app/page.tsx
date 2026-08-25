"use client";

import {
  BarChart3,
  Building2,
  CheckCircle2,
  ClipboardCheck,
  FileUp,
  Gauge,
  HandCoins,
  Layers3,
  LineChart as LineChartIcon,
  Plus,
  Send,
  ShieldCheck,
  SlidersHorizontal,
} from "lucide-react";
import { useMemo, useState } from "react";

type View = "dashboard" | "new" | "decision" | "result";
type ScenarioId = "win" | "balance" | "profit";

const tenders = [
  {
    name: "東部幹線道路 改良工事",
    owner: "さいたま市 建設局",
    type: "道路舗装",
    due: "2026/09/04",
    status: "分析完了",
    price: "9,430万円",
    probability: 92,
    margin: 2.4,
  },
  {
    name: "中央雨水幹線 管渠更新",
    owner: "川口市 上下水道局",
    type: "管工事",
    due: "2026/09/08",
    status: "判断待ち",
    price: "1億2,600万円",
    probability: 46,
    margin: 13.1,
  },
  {
    name: "南小学校 校舎外壁改修",
    owner: "千葉市 教育委員会",
    type: "建築一式",
    due: "2026/09/12",
    status: "分析中",
    price: "7,180万円",
    probability: 64,
    margin: 9.4,
  },
  {
    name: "臨海公園 橋梁補修",
    owner: "東京都 港湾局",
    type: "鋼構造物",
    due: "2026/09/18",
    status: "分析完了",
    price: "1億6,300万円",
    probability: 39,
    margin: 14.8,
  },
];

const priceCurve = [
  { price: 9240, label: "9,240", probability: 98, margin: 0.3, profit: 32 },
  { price: 9320, label: "9,320", probability: 96, margin: 1.2, profit: 112 },
  { price: 9380, label: "9,380", probability: 94, margin: 1.8, profit: 172 },
  { price: 9430, label: "9,430", probability: 92, margin: 2.4, profit: 226 },
  { price: 9490, label: "9,490", probability: 88, margin: 3.0, profit: 282 },
  { price: 9560, label: "9,560", probability: 81, margin: 3.7, profit: 352 },
  { price: 9640, label: "9,640", probability: 69, margin: 4.5, profit: 432 },
  { price: 9720, label: "9,720", probability: 54, margin: 5.3, profit: 512 },
];

const scenarios = [
  {
    id: "win" as const,
    title: "A. 落札重視案",
    price: "9,380万円",
    probability: 94,
    margin: 1.8,
    profit: "172万円",
    description: "受注を優先する場合の提案",
  },
  {
    id: "balance" as const,
    title: "B. バランス推奨案",
    price: "9,430万円",
    probability: 92,
    margin: 2.4,
    profit: "226万円",
    description: "90%台の受注可能性を維持しながら、1案件あたり約200万円の利益を確保するAI推奨案",
    badge: "AI推奨",
  },
  {
    id: "profit" as const,
    title: "C. 利益重視案",
    price: "9,640万円",
    probability: 69,
    margin: 4.5,
    profit: "432万円",
    description: "利益を優先する場合の提案",
  },
];

const similarCases = [
  ["県道18号 歩道拡幅工事", "埼玉県", "埼玉", "道路舗装", "9,720万円", "9,690万円", "失注", "8.4%"],
  ["新都心駅前 舗装修繕", "さいたま市", "埼玉", "道路舗装", "8,880万円", "8,940万円", "落札", "10.1%"],
  ["東浦和区画 道路改良", "さいたま市", "埼玉", "道路舗装", "1億120万円", "1億80万円", "失注", "12.9%"],
  ["北部幹線 排水設備工事", "川口市", "埼玉", "道路舗装", "9,540万円", "9,610万円", "落札", "9.2%"],
];

const evidence = [
  ["同地域・同工種の直近落札価格帯", "予定価格比 94.8%から97.6%に集中"],
  ["当該発注者の過去落札傾向", "最低価格より技術点を加味した中位価格の落札が多い"],
  ["類似案件の落札／失注結果", "過去12件中、価格差1.8%以内で8件が落札圏"],
  ["過去の自社入札額との差分", "自社平均より0.9%低く、利益率は平均を1.4pt上回る"],
  ["AI予測の信頼度", "高 82%：類似データ数、地域一致、発注者履歴が十分"],
];

export default function Home() {
  const [view, setView] = useState<View>("dashboard");
  const [selectedScenario, setSelectedScenario] = useState<ScenarioId>("balance");
  const [result, setResult] = useState("lost");
  const [registered, setRegistered] = useState(false);

  const selected = useMemo(
    () => scenarios.find((scenario) => scenario.id === selectedScenario) ?? scenarios[1],
    [selectedScenario],
  );

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f6f8fb] text-slate-900">
      <aside className="fixed inset-y-0 left-0 z-20 hidden w-64 border-r border-slate-200 bg-white lg:block">
        <div className="flex h-16 items-center gap-3 border-b border-slate-200 px-6">
          <div className="flex size-9 items-center justify-center rounded-lg bg-blue-700 text-white">
            <Building2 size={20} />
          </div>
          <div>
            <p className="text-sm font-bold">AI入札判断支援</p>
            <p className="text-xs text-slate-500">営業・積算部門向け</p>
          </div>
        </div>
        <nav className="space-y-1 p-4">
          <NavButton active={view === "dashboard"} icon={<BarChart3 size={18} />} label="案件一覧" onClick={() => setView("dashboard")} />
          <NavButton active={view === "new"} icon={<Plus size={18} />} label="新規分析" onClick={() => setView("new")} />
          <NavButton active={view === "decision"} icon={<LineChartIcon size={18} />} label="価格比較" onClick={() => setView("decision")} />
          <NavButton active={view === "result"} icon={<ClipboardCheck size={18} />} label="結果登録" onClick={() => setView("result")} />
        </nav>
        <div className="absolute bottom-0 border-t border-slate-200 p-5 text-xs leading-5 text-slate-600">
          AIは金額を断言せず、落札確率と利益率の比較材料を提示します。最終判断と承認は人間が行います。
        </div>
      </aside>

      <section className="lg:pl-64">
        <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/95 px-3 py-3 backdrop-blur sm:px-4 lg:px-8">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="min-w-0">
              <p className="text-xs font-semibold text-blue-700">建設会社向け B2B SaaS モック</p>
              <h1 className="break-words text-lg font-bold sm:text-xl lg:text-2xl">{titleForView(view)}</h1>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1 lg:hidden">
              <MobileTab active={view === "dashboard"} label="一覧" onClick={() => setView("dashboard")} />
              <MobileTab active={view === "new"} label="新規" onClick={() => setView("new")} />
              <MobileTab active={view === "decision"} label="比較" onClick={() => setView("decision")} />
              <MobileTab active={view === "result"} label="結果" onClick={() => setView("result")} />
            </div>
            <button
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-700 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-800 sm:w-auto"
              onClick={() => setView("new")}
            >
              <Plus size={18} />
              新規案件を分析
            </button>
          </div>
        </header>

        <div className="mx-auto max-w-7xl px-3 py-4 sm:px-4 sm:py-6 lg:px-8">
          {view === "dashboard" && <Dashboard onAnalyze={() => setView("new")} onDecision={() => setView("decision")} />}
          {view === "new" && <NewAnalysis onStart={() => setView("decision")} />}
          {view === "decision" && (
            <Decision
              selectedScenario={selectedScenario}
              onSelect={setSelectedScenario}
              selected={selected}
              onEstimate={() => setView("result")}
              onApproval={() => setView("result")}
            />
          )}
          {view === "result" && (
            <ResultRegistration
              selected={selected}
              result={result}
              setResult={setResult}
              registered={registered}
              onRegister={() => setRegistered(true)}
            />
          )}
        </div>
      </section>
    </main>
  );
}

function Dashboard({ onAnalyze, onDecision }: { onAnalyze: () => void; onDecision: () => void }) {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Metric icon={<Layers3 size={20} />} label="今月の入札件数" value="28件" note="前年比 +14%" />
        <Metric icon={<Gauge size={20} />} label="今月の落札率" value="57.1%" note="直近3か月 +6.2pt" tone="green" />
        <Metric icon={<HandCoins size={20} />} label="平均利益率" value="11.8%" note="目標 10.0%以上" tone="green" />
        <Metric icon={<ShieldCheck size={20} />} label="判断待ち案件数" value="6件" note="期限7日以内 3件" tone="orange" />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        <Panel title="進行中の案件一覧" action={<button onClick={onAnalyze} className="w-full rounded-lg bg-blue-700 px-4 py-2 text-sm font-semibold text-white sm:w-auto">新規案件を分析</button>}>
          <div className="space-y-3 md:hidden">
            {tenders.map((tender) => (
              <button
                className="w-full rounded-lg border border-slate-200 bg-white p-4 text-left shadow-sm"
                key={tender.name}
                onClick={onDecision}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="break-words text-sm font-bold text-slate-950">{tender.name}</p>
                    <p className="mt-1 text-xs text-slate-500">{tender.owner}</p>
                  </div>
                  <StatusBadge status={tender.status} />
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
                  <MobileDatum label="工種" value={tender.type} />
                  <MobileDatum label="提出期限" value={tender.due} />
                  <MobileDatum label="推奨入札額" value={tender.price} emphasis />
                  <MobileDatum label="想定利益率" value={`${tender.margin}%`} tone="green" />
                </div>
                <div className="mt-4">
                  <p className="mb-2 text-xs font-semibold text-slate-500">落札確率</p>
                  <Percent value={tender.probability} />
                </div>
              </button>
            ))}
          </div>
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full min-w-[860px] text-left text-sm">
              <thead className="border-b border-slate-200 bg-slate-50 text-xs text-slate-500">
                <tr>
                  {["案件名", "発注者", "工種", "提出期限", "AI分析", "推奨入札額", "落札確率", "利益率"].map((head) => (
                    <th className="px-4 py-3 font-semibold" key={head}>{head}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {tenders.map((tender) => (
                  <tr className="hover:bg-blue-50/50" key={tender.name}>
                    <td className="px-4 py-4 font-semibold text-slate-900">
                      <button className="text-left hover:text-blue-700" onClick={onDecision}>{tender.name}</button>
                    </td>
                    <td className="px-4 py-4 text-slate-600">{tender.owner}</td>
                    <td className="px-4 py-4 text-slate-600">{tender.type}</td>
                    <td className="px-4 py-4 text-slate-600">{tender.due}</td>
                    <td className="px-4 py-4"><StatusBadge status={tender.status} /></td>
                    <td className="px-4 py-4 font-semibold">{tender.price}</td>
                    <td className="px-4 py-4"><Percent value={tender.probability} /></td>
                    <td className="px-4 py-4 text-emerald-700">{tender.margin}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>

        <Panel title="月次傾向">
          <SimpleAreaTrend />
        </Panel>
      </div>
    </div>
  );
}

function NewAnalysis({ onStart }: { onStart: () => void }) {
  return (
    <div className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
      <Panel title="新規案件の分析入力">
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="案件名" defaultValue="東部幹線道路 改良工事" />
          <Field label="発注者" defaultValue="さいたま市 建設局" />
          <Field label="地域" defaultValue="埼玉県さいたま市" />
          <Field label="工種" defaultValue="道路舗装" />
          <Field label="予定価格／設計金額" defaultValue="9,780万円" />
          <Field label="想定原価" defaultValue="9,208万円" />
          <Field label="工期" defaultValue="2026年10月から2027年3月" wide />
          <label className="md:col-span-2">
            <span className="mb-2 block text-sm font-semibold text-slate-700">入札公告・設計書など</span>
            <div className="flex min-h-36 items-center justify-center rounded-lg border border-dashed border-slate-300 bg-slate-50 px-4 text-center">
              <div>
                <FileUp className="mx-auto mb-3 text-blue-700" size={32} />
                <p className="text-sm font-semibold text-slate-700">PDF、Excel、設計書ファイルをアップロード</p>
                <p className="mt-1 text-xs text-slate-500">モックのためファイルは保存されません</p>
              </div>
            </div>
          </label>
        </div>
        <div className="mt-6 flex flex-col gap-3 border-t border-slate-200 pt-5 md:flex-row md:items-center md:justify-between">
          <p className="text-sm leading-6 text-slate-600">
            過去の類似案件、発注者・地域・工種別の傾向、過去の落札価格をもとに分析します。
          </p>
          <button onClick={onStart} className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-700 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-800 md:w-auto">
            <Send size={18} />
            AIで分析を開始
          </button>
        </div>
      </Panel>

      <Panel title="分析で利用する観点">
        <div className="space-y-3">
          {["発注者別の落札率と価格傾向", "同地域・同工種の過去価格帯", "自社の落札／失注時の利益率", "予定価格に対する競争強度", "公告資料から抽出した工期・工種条件"].map((item) => (
            <div className="flex gap-3 rounded-lg border border-slate-200 bg-white p-3" key={item}>
              <CheckCircle2 className="mt-0.5 shrink-0 text-emerald-600" size={18} />
              <span className="text-sm text-slate-700">{item}</span>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}

function Decision({
  selectedScenario,
  onSelect,
  selected,
  onEstimate,
  onApproval,
}: {
  selectedScenario: ScenarioId;
  onSelect: (id: ScenarioId) => void;
  selected: (typeof scenarios)[number];
  onEstimate: () => void;
  onApproval: () => void;
}) {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Summary label="案件名" value="東部幹線道路 改良工事" />
        <Summary label="発注者" value="さいたま市 建設局" />
        <Summary label="予定価格" value="9,780万円" />
        <Summary label="想定原価" value="9,208万円" />
      </div>

      <Panel title="入札額と落札確率の関係" action={<span className="rounded-lg bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">推奨価格帯 9,380から9,490万円</span>}>
        <div className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
          <BidChart />
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm font-bold">選択中の価格案</p>
            <p className="mt-4 break-words text-2xl font-bold text-blue-800 sm:text-3xl">{selected.price}</p>
            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <MiniStat label="落札確率" value={`${selected.probability}%`} tone="blue" />
              <MiniStat label="想定利益率" value={`${selected.margin}%`} tone="green" />
              <MiniStat label="想定利益額" value={selected.profit} tone="green" />
              <MiniStat label="判断区分" value={selected.id === "balance" ? "推奨" : "比較案"} tone="slate" />
            </div>
            <p className="mt-4 text-sm leading-6 text-slate-600">{selected.description}</p>
          </div>
        </div>
      </Panel>

      <div className="grid gap-4 xl:grid-cols-3">
        {scenarios.map((scenario) => (
          <button
            className={`rounded-lg border bg-white p-5 text-left shadow-sm transition hover:border-blue-300 ${
              selectedScenario === scenario.id ? "border-blue-700 ring-2 ring-blue-100" : "border-slate-200"
            }`}
            key={scenario.id}
            onClick={() => onSelect(scenario.id)}
          >
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-base font-bold">{scenario.title}</h3>
              {scenario.badge && <span className="rounded-lg bg-blue-700 px-2.5 py-1 text-xs font-semibold text-white">{scenario.badge}</span>}
            </div>
            <p className="mt-4 text-2xl font-bold text-slate-950">{scenario.price}</p>
            <div className="mt-4 grid grid-cols-1 gap-2 text-sm sm:grid-cols-3 xl:grid-cols-1 2xl:grid-cols-3">
              <MiniStat label="落札確率" value={`${scenario.probability}%`} tone="blue" />
              <MiniStat label="利益率" value={`${scenario.margin}%`} tone="green" />
              <MiniStat label="利益額" value={scenario.profit} tone="green" />
            </div>
            <p className="mt-4 text-sm leading-6 text-slate-600">{scenario.description}</p>
          </button>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <Panel title="AI分析の根拠">
          <div className="space-y-3">
            {evidence.map(([label, value]) => (
              <div className="rounded-lg border border-slate-200 p-4" key={label}>
                <p className="text-sm font-bold text-slate-800">{label}</p>
                <p className="mt-1 text-sm leading-6 text-slate-600">{value}</p>
              </div>
            ))}
          </div>
        </Panel>
        <Panel title="類似案件">
          <div className="space-y-3 md:hidden">
            {similarCases.map((row) => (
              <div className="rounded-lg border border-slate-200 bg-white p-4" key={row[0]}>
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="break-words text-sm font-bold text-slate-950">{row[0]}</p>
                    <p className="mt-1 text-xs text-slate-500">{row[1]}・{row[2]}・{row[3]}</p>
                  </div>
                  <span className={resultClass(row[6])}>{row[6]}</span>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
                  <MobileDatum label="自社入札額" value={row[4]} emphasis />
                  <MobileDatum label="落札額" value={row[5]} />
                  <MobileDatum label="利益率" value={row[7]} tone="green" />
                </div>
              </div>
            ))}
          </div>
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead className="border-b border-slate-200 bg-slate-50 text-xs text-slate-500">
                <tr>{["案件名", "発注者", "地域", "工種", "自社入札額", "落札額", "結果", "利益率"].map((head) => <th className="px-3 py-3 font-semibold" key={head}>{head}</th>)}</tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {similarCases.map((row) => (
                  <tr key={row[0]}>
                    {row.map((cell, index) => (
                      <td className={`px-3 py-3 ${index === 6 ? resultClass(cell) : "text-slate-700"}`} key={`${row[0]}-${cell}`}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-lg">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <p className="min-w-0 text-sm text-slate-600">選択中: <span className="break-words font-bold text-slate-950">{selected.title} {selected.price}</span></p>
          <div className="flex w-full flex-col gap-2 sm:flex-row md:w-auto">
            <button onClick={onEstimate} className="w-full rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold hover:bg-slate-50 sm:w-auto">この価格で見積を作成</button>
            <button className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold hover:bg-slate-50 sm:w-auto">
              <SlidersHorizontal size={17} />
              入札額を調整する
            </button>
            <button onClick={onApproval} className="w-full rounded-lg bg-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800 sm:w-auto">社内承認へ進む</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ResultRegistration({
  selected,
  result,
  setResult,
  registered,
  onRegister,
}: {
  selected: (typeof scenarios)[number];
  result: string;
  setResult: (value: string) => void;
  registered: boolean;
  onRegister: () => void;
}) {
  return (
    <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
      <Panel title="入札結果の登録">
        <div className="grid gap-4 md:grid-cols-2">
          <label>
            <span className="mb-2 block text-sm font-semibold text-slate-700">結果</span>
            <select value={result} onChange={(event) => setResult(event.target.value)} className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5">
              <option value="won">落札</option>
              <option value="lost">失注</option>
            </select>
          </label>
          <Field label="最終入札額" defaultValue={selected.price} />
          <Field label="落札額（判明している場合）" defaultValue="9,610万円" />
          <Field label="落札企業（判明している場合）" defaultValue="関東道路建設株式会社" />
          <label className="md:col-span-2">
            <span className="mb-2 block text-sm font-semibold text-slate-700">失注理由・備考</span>
            <textarea className="min-h-32 w-full rounded-lg border border-slate-300 px-3 py-2.5" defaultValue="価格差は約2.3%。技術点評価は同水準だったため、価格競争力が主因と推定。" />
          </label>
        </div>
        <button onClick={onRegister} className="mt-6 w-full rounded-lg bg-blue-700 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-800 sm:w-auto">
          結果を登録して学習データに反映
        </button>
      </Panel>

      <Panel title="登録後の振り返り">
        {registered ? (
          <div className="space-y-4">
            <Callout tone="green" title="今回の結果を次回以降の予測精度向上に活用します" />
            <Callout tone="orange" title="推奨価格より2.3%低い価格で落札されました" />
            <Callout tone="blue" title="利益率を維持しながら競争力を高められる価格帯は9,620から9,760万円でした" />
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-600">
              この画面は、失注後にも「いくら低ければ落札できた可能性があるか」を振り返り、担当者個人の経験を組織データとして蓄積するためのものです。
            </div>
          </div>
        ) : (
          <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-6 text-sm leading-6 text-slate-600">
            左のフォームを登録すると、推奨価格との差分、競争力のあった価格帯、次回予測への反映内容が表示されます。
          </div>
        )}
      </Panel>
    </div>
  );
}

function NavButton({ active, icon, label, onClick }: { active: boolean; icon: React.ReactNode; label: string; onClick: () => void }) {
  return (
    <button onClick={onClick} className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold ${active ? "bg-blue-50 text-blue-800" : "text-slate-600 hover:bg-slate-50"}`}>
      {icon}
      {label}
    </button>
  );
}

function MobileTab({ active, label, onClick }: { active: boolean; label: string; onClick: () => void }) {
  return <button onClick={onClick} className={`shrink-0 rounded-lg px-3 py-1.5 text-xs font-semibold ${active ? "bg-blue-700 text-white" : "bg-slate-100 text-slate-600"}`}>{label}</button>;
}

function Panel({ title, action, children }: { title: string; action?: React.ReactNode; children: React.ReactNode }) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white shadow-sm">
      <div className="flex flex-col gap-3 border-b border-slate-200 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
        <h2 className="min-w-0 break-words text-base font-bold">{title}</h2>
        {action && <div className="w-full sm:w-auto">{action}</div>}
      </div>
      <div className="p-4 sm:p-5">{children}</div>
    </section>
  );
}

function Metric({ icon, label, value, note, tone = "blue" }: { icon: React.ReactNode; label: string; value: string; note: string; tone?: "blue" | "green" | "orange" }) {
  const colors = {
    blue: "bg-blue-50 text-blue-700",
    green: "bg-emerald-50 text-emerald-700",
    orange: "bg-orange-50 text-orange-700",
  };
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-slate-600">{label}</p>
        <div className={`flex size-10 items-center justify-center rounded-lg ${colors[tone]}`}>{icon}</div>
      </div>
      <p className="mt-4 text-2xl font-bold sm:text-3xl">{value}</p>
      <p className="mt-2 text-xs text-slate-500">{note}</p>
    </div>
  );
}

function Field({ label, defaultValue, wide = false }: { label: string; defaultValue: string; wide?: boolean }) {
  return (
    <label className={wide ? "md:col-span-2" : ""}>
      <span className="mb-2 block text-sm font-semibold text-slate-700">{label}</span>
      <input className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-slate-900 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100" defaultValue={defaultValue} />
    </label>
  );
}

function Summary({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <p className="text-xs font-semibold text-slate-500">{label}</p>
      <p className="mt-2 font-bold text-slate-950">{value}</p>
    </div>
  );
}

function MiniStat({ label, value, tone }: { label: string; value: string; tone: "blue" | "green" | "slate" }) {
  const color = tone === "blue" ? "text-blue-700" : tone === "green" ? "text-emerald-700" : "text-slate-700";
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-3">
      <p className="text-xs text-slate-500">{label}</p>
      <p className={`mt-1 break-words text-base font-bold ${color}`}>{value}</p>
    </div>
  );
}

function MobileDatum({
  label,
  value,
  emphasis = false,
  tone = "slate",
}: {
  label: string;
  value: string;
  emphasis?: boolean;
  tone?: "slate" | "green";
}) {
  const valueColor = tone === "green" ? "text-emerald-700" : "text-slate-900";
  return (
    <div className="min-w-0 rounded-lg bg-slate-50 p-3">
      <p className="text-[11px] font-semibold text-slate-500">{label}</p>
      <p className={`mt-1 break-words ${emphasis ? "font-bold" : "font-semibold"} ${valueColor}`}>{value}</p>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const style = status === "分析完了" ? "bg-emerald-50 text-emerald-700" : status === "判断待ち" ? "bg-orange-50 text-orange-700" : "bg-blue-50 text-blue-700";
  return <span className={`rounded-lg px-2.5 py-1 text-xs font-semibold ${style}`}>{status}</span>;
}

function Percent({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-2">
      <div className="h-2 w-20 rounded-full bg-slate-100">
        <div className="h-2 rounded-full bg-blue-600" style={{ width: `${value}%` }} />
      </div>
      <span className="shrink-0 font-semibold text-blue-700">{value}%</span>
    </div>
  );
}

function Callout({ title, tone }: { title: string; tone: "green" | "orange" | "blue" }) {
  const style = tone === "green" ? "border-emerald-200 bg-emerald-50 text-emerald-800" : tone === "orange" ? "border-orange-200 bg-orange-50 text-orange-800" : "border-blue-200 bg-blue-50 text-blue-800";
  return <div className={`rounded-lg border p-4 text-sm font-semibold ${style}`}>{title}</div>;
}

function titleForView(view: View) {
  return {
    dashboard: "ダッシュボード／案件一覧",
    new: "新規案件の分析入力",
    decision: "入札価格の比較・意思決定",
    result: "結果登録・学習",
  }[view];
}

function resultClass(value: string) {
  return value === "落札" ? "font-semibold text-emerald-700" : "font-semibold text-red-700";
}

function SimpleAreaTrend() {
  const data = [
    { month: "4月", win: 42, margin: 10.2 },
    { month: "5月", win: 49, margin: 10.6 },
    { month: "6月", win: 45, margin: 11.1 },
    { month: "7月", win: 53, margin: 11.4 },
    { month: "8月", win: 57, margin: 11.8 },
  ];
  const points = data.map((item, index) => {
    const x = 36 + index * 72;
    const y = 220 - item.win * 2.6;
    return { ...item, x, y };
  });
  const line = points.map((point) => `${point.x},${point.y}`).join(" ");
  const area = `36,220 ${line} ${points.at(-1)?.x ?? 324},220`;

  return (
    <div className="h-72">
      <svg className="h-full w-full" viewBox="0 0 360 260" role="img" aria-label="月次の落札率と利益率">
        {[0, 1, 2, 3].map((lineIndex) => (
          <line key={lineIndex} x1="32" x2="340" y1={40 + lineIndex * 55} y2={40 + lineIndex * 55} stroke="#e2e8f0" strokeDasharray="4 4" />
        ))}
        <polygon points={area} fill="#bfdbfe" opacity="0.7" />
        <polyline points={line} fill="none" stroke="#2563eb" strokeWidth="4" strokeLinejoin="round" strokeLinecap="round" />
        {points.map((point) => (
          <g key={point.month}>
            <circle cx={point.x} cy={point.y} r="5" fill="#2563eb" />
            <text x={point.x} y="244" textAnchor="middle" fontSize="12" fill="#64748b">{point.month}</text>
            <text x={point.x} y={point.y - 12} textAnchor="middle" fontSize="11" fontWeight="700" fill="#1d4ed8">{point.win}%</text>
          </g>
        ))}
        <text x="42" y="26" fontSize="12" fontWeight="700" fill="#2563eb">落札率</text>
        <text x="118" y="26" fontSize="12" fill="#059669">平均利益率 11.8%</text>
      </svg>
    </div>
  );
}

function BidChart() {
  const width = 760;
  const height = 360;
  const left = 58;
  const right = 34;
  const top = 24;
  const bottom = 54;
  const plotWidth = width - left - right;
  const plotHeight = height - top - bottom;
  const minPrice = 9240;
  const maxPrice = 9720;
  const xFor = (price: number) => left + ((price - minPrice) / (maxPrice - minPrice)) * plotWidth;
  const yForProbability = (value: number) => top + (1 - value / 100) * plotHeight;
  const yForMargin = (value: number) => top + (1 - value / 20) * plotHeight;
  const probabilityLine = priceCurve.map((item) => `${xFor(item.price)},${yForProbability(item.probability)}`).join(" ");
  const marginLine = priceCurve.map((item) => `${xFor(item.price)},${yForMargin(item.margin)}`).join(" ");

  return (
    <div className="min-w-0">
      <svg className="h-auto w-full rounded-lg bg-white" viewBox={`0 0 ${width} ${height}`} role="img" aria-label="入札額と落札確率、想定利益率の比較グラフ">
        <rect x={xFor(9380)} y={top} width={xFor(9490) - xFor(9380)} height={plotHeight} fill="#dbeafe" opacity="0.7" />
        {[0, 25, 50, 75, 100].map((tick) => (
          <g key={tick}>
            <line x1={left} x2={width - right} y1={yForProbability(tick)} y2={yForProbability(tick)} stroke="#e2e8f0" strokeDasharray="4 4" />
            <text x={left - 12} y={yForProbability(tick) + 4} textAnchor="end" fontSize="12" fill="#64748b">{tick}%</text>
          </g>
        ))}
        <polyline points={probabilityLine} fill="none" stroke="#2563eb" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        <polyline points={marginLine} fill="none" stroke="#059669" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        {priceCurve.map((item) => (
          <g key={item.price}>
            <line x1={xFor(item.price)} x2={xFor(item.price)} y1={height - bottom} y2={height - bottom + 6} stroke="#94a3b8" />
            <text x={xFor(item.price)} y={height - 24} textAnchor="middle" fontSize="11" fill="#475569">{item.label}</text>
            <circle cx={xFor(item.price)} cy={yForProbability(item.probability)} r="5" fill="#2563eb" />
            <circle cx={xFor(item.price)} cy={yForMargin(item.margin)} r="5" fill="#059669" />
          </g>
        ))}
        <line x1={left} x2={width - right} y1={height - bottom} y2={height - bottom} stroke="#94a3b8" />
        <line x1={left} x2={left} y1={top} y2={height - bottom} stroke="#94a3b8" />
        <text x={width / 2} y={height - 4} textAnchor="middle" fontSize="12" fontWeight="700" fill="#475569">入札額（万円）</text>
        <text x="16" y={height / 2} transform={`rotate(-90 16 ${height / 2})`} textAnchor="middle" fontSize="12" fontWeight="700" fill="#475569">落札確率（%）</text>
        <text x={xFor(9435)} y="46" textAnchor="middle" fontSize="12" fontWeight="700" fill="#1d4ed8">推奨価格帯</text>
        <g transform="translate(540 28)">
          <rect width="180" height="58" rx="8" fill="#ffffff" stroke="#e2e8f0" />
          <circle cx="18" cy="20" r="5" fill="#2563eb" />
          <text x="31" y="24" fontSize="12" fill="#334155">落札確率</text>
          <circle cx="18" cy="42" r="5" fill="#059669" />
          <text x="31" y="46" fontSize="12" fill="#334155">想定利益率</text>
        </g>
      </svg>
    </div>
  );
}
