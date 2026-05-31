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
