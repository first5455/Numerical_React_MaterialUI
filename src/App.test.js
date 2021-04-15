import React from "react";
import { render, screen } from "@testing-library/react";
import Home from "./pages/Home";
import "@testing-library/jest-dom";

it("renders welcome message", () => {
  render(<Home />);
  expect(screen.getByText("Welcome to Numerical Website")).toBeInTheDocument();
});

