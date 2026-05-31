import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Profile from "@/components/sections/Profile";

describe("Profile", () => {
  it("基本情報・自己紹介・スキルを表示する", () => {
    render(<Profile />);
    expect(screen.getByText("Yuma Higashitani")).toBeInTheDocument();
    expect(screen.getByText(/BtoB新規事業/)).toBeInTheDocument();
    expect(screen.getByText("Golang")).toBeInTheDocument();
  });
});
