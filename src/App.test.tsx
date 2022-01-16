import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders heading", () => {
  render(<App />);
  const headingElement = screen.getByRole('heading');
  expect(headingElement).toBeInTheDocument();
});
