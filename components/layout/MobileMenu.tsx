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
