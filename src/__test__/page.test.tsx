import { render, screen } from "@testing-library/react";
import Home from "@/app/page";

describe("<Home />", () => {
  test("Renders nav", () => {
    render(<Home />);
    const nav = screen.getByRole("navigation");
    expect(nav).toBeInTheDocument();
  });
  test("Renders main", () => {
    render(<Home />);
    const main = screen.getByRole("main");
    expect(main).toBeInTheDocument();
  });
});
