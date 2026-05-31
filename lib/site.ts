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
  photo: "/images/profile.jpg",
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
  image?: string;
};

export const works: Work[] = [
  {
    title: "Sports JOG 代理店販売ECサイト",
    desc: "ECサイトの構築から運用まで担当。在庫管理を含む販売基盤を整備。",
    tags: ["EC構築", "在庫管理", "運用"],
    url: "https://marugo-wellness.jp/pages/sportsjog",
    category: "EC / 在庫管理",
    image: "/images/work-sportsjog.jpg",
  },
  {
    title: "抹茶のアメリカ需要調査LP",
    desc: "新規事業の需要検証を目的としたLPを構築し、トラフィックを計測。",
    tags: ["Next.js", "需要検証", "計測"],
    url: "https://tastepick-front.vercel.app/",
    category: "需要検証 / LP",
    image: "/images/work-tastepick.jpg",
  },
  {
    title: "人材系 BackOffice AI活用コンサル",
    desc: "バックオフィス業務へのAI活用を支援。業務削減の設計から伴走。",
    tags: ["AI活用", "業務改善", "コンサル"],
    category: "AI / コンサル",
    image: "/images/work-backoffice.jpg",
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
