import { site, socials } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="bg-ink py-12 text-slate-400">
      <div className="mx-auto flex max-w-[1100px] flex-wrap items-center justify-between gap-4 px-7">
        <div className="font-display text-lg font-extrabold">
          <span className="bg-gradient-to-r from-brand to-brand3 bg-clip-text text-transparent">
            {site.name}
          </span>
        </div>
        <div className="flex gap-5">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[13px] font-medium tracking-wide text-slate-400 transition-colors hover:text-white"
            >
              {s.label}
            </a>
          ))}
        </div>
        <div className="text-xs tracking-wide text-slate-500">© 2026 {site.name}</div>
      </div>
    </footer>
  );
}
