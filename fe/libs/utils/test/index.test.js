import { isStringAndValid } from "../index.js";

describe("test utils", () => {
  test("ensure string and not undefined string", () => {
    expect(isStringAndValid("abcd")).toBeTruthy();
    expect(isStringAndValid(2)).toBeFalsy();
    expect(isStringAndValid(null)).toBeFalsy();
    expect(isStringAndValid("undefined")).toBeFalsy();
  });
});
