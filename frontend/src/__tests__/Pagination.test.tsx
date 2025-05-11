import React from "react";
import { render, screen } from "@testing-library/react";
import Pagination from "../components/Pagination";

describe("Pagination", () => {
  it("displays current page and total pages", () => {
    render(<Pagination currentPage={2} totalPages={5} />);
    expect(screen.getByText("Page 2 of 5")).toBeInTheDocument();
  });

  it("disables 'Prev' on first page", () => {
    render(<Pagination currentPage={1} totalPages={5} />);
    const prevLink = screen.getByText("Prev");
    expect(prevLink).toHaveAttribute("href", "#");
    expect(prevLink).toHaveClass("cursor-not-allowed");
  });

  it("disables 'Next' on last page", () => {
    render(<Pagination currentPage={5} totalPages={5} />);
    const nextLink = screen.getByText("Next");
    expect(nextLink).toHaveAttribute("href", "#");
    expect(nextLink).toHaveClass("cursor-not-allowed");
  });

  it("renders correct hrefs for middle page", () => {
    render(<Pagination currentPage={3} totalPages={5} />);
    expect(screen.getByText("First")).toHaveAttribute("href", "/?page=1");
    expect(screen.getByText("Prev")).toHaveAttribute("href", "/?page=2");
    expect(screen.getByText("Next")).toHaveAttribute("href", "/?page=4");
    expect(screen.getByText("Last")).toHaveAttribute("href", "/?page=5");
  });
});
