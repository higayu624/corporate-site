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
