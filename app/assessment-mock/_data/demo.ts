export type EvidenceRecord = { id: string; date: string; title: string; body: string; source: string; verified: boolean };
export type Employee = {
  id: string; name: string; role: string; initials: string;
  records: EvidenceRecord[]; selfComment: string; managerComment: string; previousReview: string;
  achievements: { title: string; detail: string; recordIds: string[] }[];
  interviewPoints: { id: string; text: string; reason: string }[];
};
export const periodLabel = '2026年4月 − 9月';
export const employees: Employee[] = [
  {
    id: 'misaki', name: '佐藤 美咲', role: 'デザイナー / 入社3年目', initials: 'MS',
    records: [
      { id: 'ms-1', date: '2026.06.18', title: 'ブランドサイトの公開', body: 'ブランドサイトのデザイン制作とレビュー調整を担当。6月18日に予定どおり公開。実装は開発チームが担当し、全体の進行管理はプロジェクトリーダーが担当した。', source: 'プロジェクト完了報告 / 上長確認済み', verified: true },
      { id: 'ms-2', date: '2026.08.07', title: 'レビュー手順の共有', body: 'デザインレビュー用のチェックリストを作成。チームミーティングで共有し、2案件で使用された。手戻り件数への影響はまだ集計されていない。', source: 'チーム議事録 / 上長確認済み', verified: true },
      { id: 'ms-3', date: '2026.09.11', title: '後輩へのサポート', body: '後輩のデザイン相談に週1回対応した。相談がしやすくなったと感じている。対応頻度と後輩の成長への影響は本人申告で、他者からの確認は未実施。', source: 'Slackの本人投稿 / 要確認', verified: false },
      { id: 'ms-4', date: '2026.09.25', title: '進行中案件の課題', body: 'レビューが集中する週は制作時間が不足した。優先順位の調整を早めに相談することを次期の課題として挙げている。', source: 'Slackの本人投稿 / 要確認', verified: false },
    ],
    selfComment: '制作だけでなく、レビューの進め方にも関われた半年でした。一方で、後輩サポートと自分の制作時間の両立に難しさを感じています。',
    managerComment: '担当したデザイン制作を自律的に進め、公開まで完了した点を確認しています。チームへの貢献については、本人の役割と周囲への影響を面談で具体的に聞きたいです。',
    previousReview: '2026年3月の評価：担当領域の自立を次期の目標とした。レビュー調整では、上長への早めの相談を期待。',
    achievements: [
      { title: 'ブランドサイトの公開', detail: 'デザイン制作とレビュー調整を担当し、予定どおり公開。全体の成果と本人の担当範囲を分けて確認できます。', recordIds: ['ms-1'] },
      { title: 'チームで使うレビュー手順を整備', detail: 'チェックリストを作成し、2案件で使用。手戻りの削減効果は未集計です。', recordIds: ['ms-2'] },
      { title: '後輩サポートと時間配分', detail: 'サポートの継続と制作時間の確保を本人が振り返っています。頻度や効果の追加確認が必要です。', recordIds: ['ms-3', 'ms-4'] },
    ],
    interviewPoints: [
      { id: 'ms-q1', text: 'プロジェクトで本人が担った範囲を確認する', reason: '制作・調整・全体進行の役割を分け、成果を正確に捉える。' },
      { id: 'ms-q2', text: '後輩サポートの具体例と周囲の変化を聞く', reason: '本人申告のため、相手や上長の観察と照らし合わせる。' },
      { id: 'ms-q3', text: '制作時間を確保するための支援を相談する', reason: '優先順位や役割分担を一緒に検討する。' },
    ],
  },
  {
    id: 'yuto', name: '田中 悠斗', role: 'エンジニア / 入社2年目', initials: 'YT',
    records: [
      { id: 'yt-1', date: '2026.07.10', title: '問い合わせ対応の改善', body: '問い合わせ内容の分類とFAQの初版を作成し、チームで運用を開始。対応時間の削減幅は未計測。', source: '運用改善報告 / 上長確認済み', verified: true },
      { id: 'yt-2', date: '2026.08.21', title: 'API改修の完了', body: '受注APIの改修とテストを担当。レビューを経て本番反映。要件定義はリーダーが担当した。', source: 'リリース記録 / 上長確認済み', verified: true },
      { id: 'yt-3', date: '2026.09.18', title: '仕様確認の振り返り', body: '仕様が曖昧なときに着手前の確認が不足した。次期は確認事項を書き出して共有したい。', source: 'Slackの本人投稿 / 要確認', verified: false },
    ],
    selfComment: '実装に加えて、問い合わせ対応の仕組みづくりに取り組みました。要件の確認をもっと早くできたと感じています。',
    managerComment: 'API改修の完了を確認しています。FAQの効果はまだ測定できていないため、件数と利用状況を次期に確認したいです。',
    previousReview: '2026年3月の評価：実装の品質を保ちつつ、着手前に仕様を確認する習慣を次期の目標とした。',
    achievements: [
      { title: '問い合わせ対応の改善', detail: 'FAQを整備して運用開始。効果は今後の測定が必要です。', recordIds: ['yt-1'] },
      { title: '受注APIの改修', detail: '実装・テスト・本番反映を担当。要件定義との担当範囲を分けて整理しています。', recordIds: ['yt-2'] },
    ],
    interviewPoints: [
      { id: 'yt-q1', text: 'FAQが役立った具体例を聞く', reason: '対応時間への影響はまだ測定されていない。' },
      { id: 'yt-q2', text: '仕様確認を早める方法を相談する', reason: '本人の振り返りと前回の目標を照合する。' },
      { id: 'yt-q3', text: '次期の担当範囲と支援を確認する', reason: '自立して進めるために必要なサポートを明らかにする。' },
    ],
  },
  {
    id: 'haruka', name: '鈴木 遥', role: 'ディレクター / 入社5年目', initials: 'HS',
    records: [
      { id: 'hs-1', date: '2026.06.30', title: '案件の進行管理', body: '2案件の進行管理を担当し、合意した納期で納品。制作と実装は各担当者が行った。', source: '納品報告 / 上長確認済み', verified: true },
      { id: 'hs-2', date: '2026.09.09', title: '顧客との調整', body: '追加要望を整理し、顧客と対応範囲を合意。チームからは情報共有を早めてほしいという声もあった。', source: '上長コメント / 確認済み', verified: true },
    ],
    selfComment: '顧客との合意形成を意識した半年でした。調整に時間をかける一方で、チームへの共有が遅れた場面がありました。',
    managerComment: '合意した納期での納品を確認しています。調整の経緯をチームに早めに共有するため、運用を一緒に検討したいです。',
    previousReview: '2026年3月の評価：複数案件の進行安定化と、チームへの情報共有の改善を次期の目標とした。',
    achievements: [
      { title: '2案件の進行管理', detail: '合意した納期で納品。制作メンバーとの役割を分けて確認できます。', recordIds: ['hs-1'] },
      { title: '顧客との対応範囲の合意', detail: '追加要望を整理。チームへの共有時期は改善の余地があります。', recordIds: ['hs-2'] },
    ],
    interviewPoints: [
      { id: 'hs-q1', text: '進行が安定した要因を振り返る', reason: '本人の工夫とチームの貢献を確認する。' },
      { id: 'hs-q2', text: '情報共有のタイミングを相談する', reason: '顧客調整中でも共有できる情報を検討する。' },
      { id: 'hs-q3', text: '複数案件の負担と支援を確認する', reason: '次期の役割・体制を対話で決める。' },
    ],
  },
];

export type SourceKind = 'slack' | 'sheet' | 'email';
export type SourceReference = { kind: SourceKind; label: string; excerpt: string };
export const sourceLabels: Record<SourceKind, string> = { slack: 'Slack', sheet: 'スプレッドシート', email: 'メール' };
export const recordSources: Record<string, SourceReference[]> = {
  'ms-1': [
    { kind: 'slack', label: '#brand-site · 公開報告', excerpt: '佐藤：デザイン制作とレビュー調整が完了しました。実装は開発チーム、全体進行はリーダーが担当です。' },
    { kind: 'email', label: '公開完了のご連絡', excerpt: '6月18日にサイトを公開しました。デザイン担当：佐藤美咲。' },
  ],
  'ms-2': [{ kind: 'sheet', label: 'デザインレビュー・チェックリスト', excerpt: '作成者：佐藤美咲。利用案件：2件。手戻り削減効果：未集計。' }],
  'ms-3': [{ kind: 'slack', label: '#design · 後輩サポート', excerpt: '佐藤：後輩のデザイン相談に週1回対応しています。相談しやすくなったと感じます。※本人の投稿。頻度・効果は未確認。' }],
  'ms-4': [{ kind: 'slack', label: '#design · 制作時間の相談', excerpt: '佐藤：レビューが集中する週は制作時間が足りません。優先順位を早めに相談したいです。' }],
  'yt-1': [
    { kind: 'slack', label: '#support · FAQ運用開始', excerpt: '田中：FAQの初版を作成し、チームで運用を開始しました。削減時間はまだ測定していません。' },
    { kind: 'sheet', label: '問い合わせ分類・FAQ管理表', excerpt: '分類・FAQ初版担当：田中悠斗。運用開始日：7月10日。対応時間：未計測。' },
  ],
  'yt-2': [{ kind: 'email', label: '受注API 本番反映報告', excerpt: '実装・テスト担当：田中悠斗。レビュー後に本番反映済み。要件定義担当：リーダー。' }],
  'yt-3': [{ kind: 'slack', label: '#development · 仕様確認の相談', excerpt: '田中：着手前の仕様確認が不足した場面がありました。確認事項を書き出して共有したいです。' }],
  'hs-1': [{ kind: 'sheet', label: '案件進行・納品管理表', excerpt: '進行担当：鈴木遥。2案件を合意した納期で納品。制作・実装：各担当者。' }],
  'hs-2': [{ kind: 'email', label: '追加要望と対応範囲の合意', excerpt: '鈴木より追加要望を整理し、顧客と対応範囲を合意。チームへの共有時期は改善事項。' }],
};
