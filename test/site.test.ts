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
  it("実績が4件ある", () => {
    expect(works).toHaveLength(4);
    expect(works.find((w) => w.title.includes("抹茶"))).toBeTruthy();
  });
  it("外部リンクが3件ある", () => {
    expect(socials).toHaveLength(3);
    expect(socials.map((s) => s.label)).toEqual(["GitHub", "Facebook", "Instagram"]);
  });
});
