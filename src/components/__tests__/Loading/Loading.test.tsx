import React from "react";
import { render, screen } from "@testing-library/react";
import LoadingWithText from "../../Loading/LoadingWithText";

test("renders loading with text component", () => {
  render(<LoadingWithText text="Loading..." />);
  const text = screen.getByText(/Loading.../i);
  expect(text).toBeInTheDocument();
});
