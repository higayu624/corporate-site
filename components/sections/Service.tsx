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
