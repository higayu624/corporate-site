import Link from "next/link";
import { site, nav } from "@/lib/site";
import MobileMenu from "@/components/layout/MobileMenu";

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
        <MobileMenu />
      </div>
    </header>
  );
}
