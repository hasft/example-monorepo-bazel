import { ensureString } from "../index.js";

describe("test utils", () => {
  test("ensure string", () => {
    expect(ensureString("hai")).toBe("hai");
    expect(ensureString(2)).toBe("2");
    expect(ensureString(null)).toBe("null");
    expect(ensureString(undefined)).toBe("undefined");
    expect(ensureString({ a: 2 })).toEqual(JSON.stringify({ a: 2 }));
    expect(ensureString(["a", "b"])).toEqual('["a","b"]');
  });
});
