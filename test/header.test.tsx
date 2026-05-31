import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Header from "@/components/layout/Header";

describe("Header", () => {
  it("屋号とナビを表示する", () => {
    render(<Header />);
    expect(screen.getByText("Shift Gear")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "SERVICE" })).toHaveAttribute("href", "#service");
    expect(screen.getByRole("link", { name: "CONTACT" })).toHaveAttribute("href", "#contact");
  });
  it("モバイルメニューボタンがある", () => {
    render(<Header />);
    expect(screen.getByRole("button", { name: /メニュー/ })).toBeInTheDocument();
  });
});
