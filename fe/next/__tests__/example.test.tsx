import * as React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

describe("Testing ComponentA", () => {
  test("Basic tests", () => {
    const { getByText } = render(
      <p>
        <code>first.tsx</code>
      </p>,
    );

    expect(getByText("First", { exact: false, selector: "code" })).toBeVisible();
  });
});
