import * as React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Nav from "../src/components/nav";

describe("Testing ComponentA", () => {
  test("Basic tests", () => {
    const { getByText } = render(<Nav />);

    expect(getByText("First", { exact: false, selector: "code" })).toBeVisible();
  });
});
