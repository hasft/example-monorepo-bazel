import MdsCookie from "../index.js";

describe("inherit", () => {
  it("inherit from Universal Cookie", () => {
    expect(new MdsCookie({ c: 3 }).get("c")).toBe(3);
  });
  it("handle own function", () => {
    expect(new MdsCookie({ "user.token": 4, other: 4 }).getUserCookie()).toStrictEqual({
      "user.token": 4,
    });
  });
});

describe("handle getUserCookie", () => {
  it("return user prop only", () => {
    expect(new MdsCookie({ "user.token": 4, other: 4 }).getUserCookie()).toStrictEqual({
      "user.token": 4,
    });
  });
  it("return null if no match", () => {
    expect(new MdsCookie({ user: 4, other: 4 }, { decode: true }).getUserCookie()).toBe(null);
  });
  it("handle parsed value", () => {
    expect(
      new MdsCookie({ "user.exp": "2020-02-28%2022:41:47" }).getUserCookie({ decode: true }),
    ).toStrictEqual({ "user.exp": "2020-02-28 22:41:47" });
  });

  it("default to handle redundancy", () => {
    expect(
      new MdsCookie({ "user.token": "abc", "user.token": "def" }).getUserCookie(),
    ).toStrictEqual({ "user.token": "def" });
  });
});

describe("handle encoded + decoded", () => {
  test("encode", () => {
    expect(new MdsCookie({}).encodeLZ({ services: { a: 2 } })).toBeTruthy();
  });
});
