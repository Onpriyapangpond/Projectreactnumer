import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import FalsePosition from "./FalsePosition";
 import "@testing-library/jest-dom";
// import userEvent from "@testing-library/user-event";

describe("FalsePosition", () => {
  test("test screen", () => {
    render(<FalsePosition />);
    // const linkElement = screen.getByText(/Bisection Methods/i);
    // expect(linkElement).toBeInTheDocument();

    // Input XL
    const xlInput = screen.getByTestId("xl");
    fireEvent.change(xlInput, { target: { value: "1.5" } });

    // Input XR
    const xrInput = screen.getByTestId("xr");
    fireEvent.change(xrInput, { target: { value: "2" } });

    // Input equation
    const equation = screen.getByTestId("Equation");
    fireEvent.change(equation, { target: { value: "x^4-13" } });

    // Click calculate button
    const myBtn = screen.getByTestId("btn");
    fireEvent.click(myBtn);

    // Check answer
    const answer = screen.getByTestId("ans");
    console.log(answer.textContent);
    expect(answer.textContent).toBe("Answer = 1.8988289");
  },10000);
});